# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hybrid TypeScript/Python project integrating **Motia** (event-driven workflow framework) with **Neo4j** (graph database) and **LlamaCloud** (AI-powered document analysis). The project is designed for GSH (Good Samaritan Hospital) document analysis and workflow automation.

## Key Technologies

- **Motia**: Event-driven workflow framework for TypeScript/JavaScript
- **Neo4j**: Graph database with MCP (Model Context Protocol) integration
- **LlamaCloud**: AI document analysis and indexing
- **Docker**: Neo4j containerization
- **Python**: Graph database operations and AI integrations

## Common Development Commands

### Start Development Server
```bash
npm run dev              # Start Motia development server with workbench
npm run dev:debug        # Start with verbose logging
```

### Build and Clean
```bash
npm run build           # Build the project
npm run clean           # Remove build artifacts and dependencies
```

### Database Operations
```bash
# Start Neo4j database
docker-compose up -d neo4j

# Verify Neo4j connection
python verify_neo4j_connection.py

# Check Neo4j health
docker-compose ps
```

### Testing
```bash
# Test API endpoints
curl -X POST http://localhost:3000/api/endpoint -H "Content-Type: application/json" -d '{"data": "test"}'

# Test event emissions
npx motia emit --topic test-event --message '{"key": "value"}'
```

### Type Generation
```bash
npm run generate-types  # Generate TypeScript types for Motia steps
```

## Project Structure

### Core Directories
- `steps/`: Motia workflow steps (API, Event, Cron, NOOP)
- `mcp-neo4j/`: Neo4j MCP server implementations
- `tasks/`: Project task documentation and guides
- `ALL-GOOD-SAM-DOCS/`: GSH project documentation and PDFs

### Key Files
- `main.py`: Python entry point for AI/graph operations
- `docker-compose.yml`: Neo4j database setup
- `verify_neo4j_connection.py`: Database connection testing
- `types.d.ts`: Auto-generated TypeScript types
- `tsconfig.json`: TypeScript configuration

## Motia Framework Architecture

### Step Types
1. **API Steps**: HTTP endpoints (e.g., `/api/analyze`)
2. **Event Steps**: Process events from topics, emit to new topics
3. **Cron Steps**: Scheduled tasks
4. **NOOP Steps**: Manual triggers and workflow connectors

### Workflow Patterns
- Steps communicate via **topics** (e.g., `document.uploaded`, `analysis.completed`)
- Each step belongs to **flows** for organization
- **State management** uses `traceId` for isolation
- **Workbench** at `http://localhost:3000` for visual debugging

### Example Step Structure
```typescript
// API Step
export const config: ApiRouteConfig = {
  type: 'api',
  name: 'AnalyzeDocument',
  path: '/analyze',
  method: 'POST',
  emits: ['document.received'],
  flows: ['document-analysis'],
  bodySchema: z.object({ documentId: z.string() })
}

export const handler: Handlers['AnalyzeDocument'] = async (req, { logger, emit, state, traceId }) => {
  // Implementation
}
```

## Neo4j Integration

### Database Schema
- **Memory nodes**: Entities with names, types, and observations
- **Relationships**: Typed connections between entities
- **MCP Tools**: CRUD operations for graph management

### Connection Details
- **URL**: `bolt://localhost:7687`
- **Credentials**: `neo4j/password`
- **Ports**: 7474 (HTTP), 7687 (Bolt)

### MCP Servers
- `mcp-neo4j-memory`: Knowledge graph memory management
- `mcp-neo4j-cypher`: Direct Cypher query execution
- `mcp-neo4j-data-modeling`: Schema design and validation

## LlamaCloud Integration

### Key Features
- Document indexing and analysis
- Code-document correlation
- Integration recommendations
- Codebase upload and querying

### Implementation Status
- **Phase 1**: Foundation setup (API keys, codebase upload)
- **Phase 2**: Core integration (API endpoints, analysis)
- **Phase 3**: Document integration (GSH docs processing)
- **Phase 4**: Advanced features (automation, optimization)

## Development Guidelines

### Code Organization
- **Keep workflow logic in `steps/` directory only**
- **Use descriptive step names** (e.g., `analyze-document`, `process-feedback`)
- **Follow topic naming**: `entity.action[.status]` (e.g., `document.uploaded`, `analysis.completed`)

### State Management
- Use `traceId` for state isolation
- Store complex data structures in Neo4j
- Use Motia state for workflow-specific data

### Error Handling
- Always wrap handlers in try-catch blocks
- Use structured logging with context
- Emit error events for downstream handling

### Testing
- Test API endpoints with curl commands
- Use `npx motia emit` for event step testing
- Verify Neo4j operations with Python scripts

## Environment Setup

### Required Environment Variables
```bash
LLAMACLOUD_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key_here
NEO4J_URL=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password
```

### Dependencies
- Node.js 18+ for Motia
- Python 3.12+ for AI/graph operations
- Docker for Neo4j
- UV for Python package management

## Troubleshooting

### Common Issues
1. **Neo4j Connection Failed**: Check Docker container status
2. **Type Errors**: Run `npm run generate-types`
3. **API Endpoint 404**: Verify step configuration and restart dev server
4. **State Not Persisting**: Check traceId usage and state adapter

### Debug Commands
```bash
# Check Neo4j logs
docker-compose logs neo4j

# Verify Motia step registration
npm run dev:debug

# Test database connection
python verify_neo4j_connection.py
```

## Current Project Focus

The repository is currently focused on integrating LlamaCloud with the existing Motia codebase for intelligent GSH project analysis. Key deliverables include:

1. Document processing and analysis workflows
2. Code-document correlation systems
3. Integration gap identification
4. Automated workflow optimization

Refer to `tasks/` directory for detailed implementation guides and progress tracking.