# GSH LlamaIndex Integration Rules

## Core Project Rules

### 1. **LlamaIndex First Priority**

- **IMMEDIATE PRIORITY**: Implement LlamaIndex integration before any other work
- Access the massive index of GSH documents, spreadsheets, and plans
- Use LlamaIndex context for all development decisions
- Query LlamaIndex for project requirements and specifications

### 2. **Neo4j Memory System**

- **After Every Task**: Update Neo4j with task outcomes and context
- **Cross-Tool Sync**: Ensure all agents can access previous decisions
- **Entity Mapping**: Track relationships between GSH documents, code
  components, and requirements
- **Context Preservation**: Maintain persistent memory between coding sessions

### 3. **Agent Coordination**

**Core Agent Roles**:

- **PlanningArchitect**: System planning, architecture, and roadmap
- **MemoryManager**: Neo4j memory system and cross-tool synchronization
- **DocumentProcessor**: LlamaIndex integration and GSH document analysis
- **TaskTracker**: Task progress, ticketing, and status updates
- **RuleKeeper**: Enforces rules, code quality, and compliance

**Agent Communication Protocol**:

- Query Neo4j for previous context before starting tasks
- Include memory context in all task handoffs
- Update persistent memory after task completion
- Maintain cross-tool synchronization

### 4. **Development Standards**

- **Context7 Documentation**: Always query CONTEXT7 MCP tool for latest
  documentation
- **Healthcare Compliance**: Ensure HIPAA-compliant data handling
- **Security**: Implement proper security measures for healthcare data
- **Quality**: Maintain code quality and testing standards

### 5. **Task Management**

Follow the 4-phase implementation plan:

- **Phase 1**: LlamaIndex Integration (IMMEDIATE PRIORITY)
- **Phase 2**: Memory System Setup (Neo4j persistent memory)
- **Phase 3**: Document Processing (GSH docs analysis)
- **Phase 4**: Advanced Features (automation & optimization)

### 6. **Memory System Protocol**

```typescript
interface TaskMemoryUpdate {
  taskId: string;
  phase: 1 | 2 | 3 | 4;
  completedAt: string;
  outcomes: string[];
  decisions: string[];
  context: {
    documentsProcessed: string[];
    codeChanges: string[];
    integrationPoints: string[];
    nextSteps: string[];
  };
  relationships: {
    relatedDocuments: string[];
    codeComponents: string[];
    requirements: string[];
  };
}
```

### 7. **Cross-Tool Synchronization**

**MANDATORY**: Ensure all agents have access to previous decisions:

- **Before Task**: Query Neo4j for previous context
- **During Task**: Update memory with intermediate decisions
- **After Task**: Store complete task outcomes and relationships
- **Cross Session**: Maintain context between coding sessions

## Quality Assurance

### Memory System Validation

- Cross-tool synchronization active
- Context preservation working
- Entity mapping complete
- Relationship tracking active
- Task memory updates functioning
- Knowledge graph integrity maintained

### LlamaIndex Integration Validation

- Document access operational
- Spreadsheet processing working
- Plan analysis functional
- Context quality high
- Query performance acceptable
- Compliance validation complete

## Success Criteria

The project is successful when:

- **LlamaIndex Integration**: Full access to GSH document index with
  high-quality context
- **Memory System**: Persistent context across all coding tools with active
  cross-tool sync
- **Document Processing**: Complete analysis of GSH healthcare documents
- **Code Integration**: Correlation between codebase and requirements
- **Workflow Generation**: Automated analysis and reporting workflows
  operational
