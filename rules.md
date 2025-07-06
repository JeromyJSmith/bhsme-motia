# LlamaParse Configuration Rules for GSH Document Processing

This file contains LlamaParse prompt configurations specifically tailored for the GSH (Good Samaritan Hospital) document analysis system.

## Overview

LlamaParse supports 3 types of prompts that can be used in combination:
- `user_prompt`: Transform/change content
- `system_prompt_append`: Modify output formatting while keeping markdown
- `system_prompt`: Override system prompts entirely (use with caution)

## 1. Healthcare Document Processing

### For GSH Medical/Administrative Documents
```python
# For processing GSH healthcare documents
parser = LlamaParse(
    user_prompt="""
    Extract and structure this healthcare document with focus on:
    - Patient care information and protocols
    - Administrative procedures and timelines
    - Budget and financial data
    - Facility specifications and requirements
    - Regulatory compliance details
    
    Preserve all numerical data, dates, and regulatory references exactly as written.
    """,
    
    system_prompt_append="""
    For healthcare documents:
    - Use ## for main sections (Patient Care, Administration, Finance, etc.)
    - Use ### for subsections
    - Format all dates as YYYY-MM-DD when possible
    - Preserve exact dollar amounts and percentages
    - Mark regulatory references with [REG: reference_number]
    - Create clear table structures for financial data
    """
)
```

## 2. Integration with Motia Workflow

### For Motia Step Processing
```python
# For documents that will be processed by Motia steps
parser = LlamaParse(
    user_prompt="""
    Structure this document for workflow processing:
    - Identify actionable items and tasks
    - Extract key stakeholders and responsibilities
    - Highlight deadlines and milestones
    - Note dependencies between different sections
    
    Focus on information that can trigger automated workflow steps.
    """,
    
    system_prompt_append="""
    Structure output for workflow automation:
    - Use [ACTION: description] for actionable items
    - Use [STAKEHOLDER: name, role] for responsible parties
    - Use [DEADLINE: YYYY-MM-DD] for time-sensitive items
    - Use [DEPENDENCY: prerequisite] for workflow dependencies
    - Create separate sections for immediate vs. future actions
    """
)
```

## 3. Neo4j Graph Database Integration

### For Knowledge Graph Creation
```python
# For creating knowledge graph relationships
parser = LlamaParse(
    user_prompt="""
    Extract entities and relationships for graph database storage:
    - Identify all people, organizations, locations, and concepts
    - Map relationships between entities
    - Extract hierarchical structures and reporting lines
    - Note temporal relationships and sequences
    
    Focus on creating a connected knowledge graph.
    """,
    
    system_prompt_append="""
    Format for graph database ingestion:
    - Use [ENTITY: type, name] for nodes (e.g., [ENTITY: Person, John Smith])
    - Use [RELATIONSHIP: source -> type -> target] for edges
    - Use [PROPERTY: entity, key, value] for node properties
    - Group related entities under clear section headers
    - Preserve entity references throughout the document
    """
)
```

## 4. Financial Document Processing

### For GSH Budget and Financial Documents
```python
# For financial and budget documents
parser = LlamaParse(
    user_prompt="""
    Extract financial data with precision:
    - All budget items and cost breakdowns
    - Revenue projections and funding sources
    - Timeline-based financial commitments
    - Cost per square foot, per bed, per service calculations
    
    Maintain exact financial figures and preserve calculation contexts.
    """,
    
    system_prompt_append="""
    Financial document formatting:
    - Use tables for all numerical data
    - Format currency as $XXX,XXX.XX
    - Use [BUDGET_ITEM: category, amount, timeframe] format
    - Create summary tables at section ends
    - Preserve original calculation formulas when present
    - Use ### for different budget categories
    """
)
```

## 5. Complete Motia Step Implementation

Here's how to integrate these into your existing Motia workflow:

```typescript
// document-parser.step.ts
import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'GSHDocumentParser',
  description: 'Parse GSH documents with LlamaParse',
  subscribes: ['document.uploaded'],
  emits: ['document.parsed', 'entities.extracted'],
  input: z.object({
    documentPath: z.string(),
    documentType: z.enum(['medical', 'financial', 'administrative', 'regulatory'])
  }),
  flows: ['gsh-document-processing']
}

export const handler: Handlers['GSHDocumentParser'] = async (input, { logger, emit, state, traceId }) => {
  logger.info('Processing GSH document', { documentPath: input.documentPath, type: input.documentType })
  
  try {
    const { LlamaParse } = await import('llamaparse')
    
    // Configure parser based on document type
    const getParserConfig = (docType: string) => {
      switch (docType) {
        case 'financial':
          return {
            user_prompt: `Extract financial data with precision: budget items, revenue projections, cost breakdowns. Maintain exact figures.`,
            system_prompt_append: `Use tables for numerical data. Format currency as $XXX,XXX.XX. Use [BUDGET_ITEM: category, amount, timeframe] format.`
          }
        case 'medical':
          return {
            user_prompt: `Extract healthcare information: patient care protocols, facility specifications, regulatory compliance details.`,
            system_prompt_append: `Use ## for main sections. Mark regulatory references with [REG: reference]. Preserve all dates and compliance details.`
          }
        case 'administrative':
          return {
            user_prompt: `Structure for workflow processing: actionable items, stakeholders, deadlines, dependencies.`,
            system_prompt_append: `Use [ACTION: description] for tasks. Use [STAKEHOLDER: name, role] for responsible parties. Use [DEADLINE: YYYY-MM-DD] for dates.`
          }
        default:
          return {
            user_prompt: `Extract and structure this GSH document preserving all important details and relationships.`,
            system_prompt_append: `Use clear section headers. Preserve exact numerical data and dates. Create structured output for further processing.`
          }
      }
    }
    
    const parserConfig = getParserConfig(input.documentType)
    const parser = new LlamaParse(parserConfig)
    
    const parsedContent = await parser.parse(input.documentPath)
    
    // Store parsed content in state
    await state.set(traceId, 'parsedDocument', {
      content: parsedContent,
      type: input.documentType,
      timestamp: new Date().toISOString()
    })
    
    // Emit parsed document
    await emit({
      topic: 'document.parsed',
      data: {
        content: parsedContent,
        documentType: input.documentType,
        traceId
      }
    })
    
    // Extract entities for Neo4j if applicable
    if (input.documentType === 'administrative' || input.documentType === 'medical') {
      await emit({
        topic: 'entities.extracted',
        data: {
          entities: extractEntitiesFromContent(parsedContent),
          documentType: input.documentType,
          traceId
        }
      })
    }
    
    logger.info('Document parsed successfully', { type: input.documentType, traceId })
    
  } catch (error) {
    logger.error('Document parsing failed', { error: error.message, documentPath: input.documentPath })
    throw error
  }
}

// Helper function to extract entities from parsed content
function extractEntitiesFromContent(content: string) {
  const entities = []
  const relationships = []
  
  // Extract [ENTITY: type, name] patterns
  const entityMatches = content.match(/\[ENTITY:\s*([^,]+),\s*([^\]]+)\]/g)
  if (entityMatches) {
    entityMatches.forEach(match => {
      const [, type, name] = match.match(/\[ENTITY:\s*([^,]+),\s*([^\]]+)\]/)
      entities.push({ type: type.trim(), name: name.trim() })
    })
  }
  
  // Extract [RELATIONSHIP: source -> type -> target] patterns
  const relationshipMatches = content.match(/\[RELATIONSHIP:\s*([^-]+)\s*->\s*([^-]+)\s*->\s*([^\]]+)\]/g)
  if (relationshipMatches) {
    relationshipMatches.forEach(match => {
      const [, source, type, target] = match.match(/\[RELATIONSHIP:\s*([^-]+)\s*->\s*([^-]+)\s*->\s*([^\]]+)\]/)
      relationships.push({
        source: source.trim(),
        type: type.trim(),
        target: target.trim()
      })
    })
  }
  
  return { entities, relationships }
}
```

## 6. Usage Examples

```bash
# Test document parsing
curl -X POST http://localhost:3000/api/parse-document \
  -H "Content-Type: application/json" \
  -d '{
    "documentPath": "./ALL-GOOD-SAM-DOCS/GSH_Exec_Dashboard_-_06.30.25_-_DRAFT01.pdf",
    "documentType": "financial"
  }'

# Test with event emission
npx motia emit --topic document.uploaded --message '{
  "documentPath": "./ALL-GOOD-SAM-DOCS/BH_NEXUS_MSA_GoodSamaritan_July32025.pdf",
  "documentType": "administrative"
}'
```

## Document Type Mapping

Based on your `ALL-GOOD-SAM-DOCS/` directory, here's the recommended document type mapping:

| Document Pattern | Type | Use Case |
|------------------|------|----------|
| `*Dashboard*` | `financial` | Budget dashboards and financial reports |
| `*Contract*`, `*Agreement*` | `administrative` | Legal documents and contracts |
| `*Schedule*` | `administrative` | Project timelines and schedules |
| `*Design*`, `*Building*` | `medical` | Facility specifications and requirements |
| `*Award*`, `*Notice*` | `administrative` | Official notifications and awards |
| `*Scope*` | `administrative` | Project scope and requirements |

## Best Practices

1. **Always specify document type** to get optimal parsing results
2. **Test with sample documents** before processing entire batches
3. **Monitor parsing quality** and adjust prompts based on results
4. **Use structured output formats** for downstream processing
5. **Preserve exact financial figures** and regulatory references
6. **Create consistent entity naming** for Neo4j integration

## Integration Points

- **Motia Workflows**: Use parsed content to trigger workflow steps
- **Neo4j Graph**: Store extracted entities and relationships
- **LlamaCloud**: Index processed documents for intelligent querying
- **State Management**: Track document processing status and results