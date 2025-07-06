# CLAUDE.md - Project Analysis & Documentation

## Project Overview

**Project Name:** bhsme-motia  
**Type:** Healthcare Intelligence Platform  
**Primary Purpose:** Good Samaritan Hospital (GSH) AI-powered document analysis and workflow automation system using LlamaIndex, Neo4j, and Motia framework.

## Architecture Summary

This is a sophisticated healthcare intelligence platform that combines:
- **Motia Framework** - Event-driven workflow orchestration
- **LlamaIndex/LlamaCloud** - Document processing and RAG (Retrieval-Augmented Generation)
- **Neo4j** - Graph database for memory and knowledge management
- **MCP (Model Context Protocol)** - Standardized AI-database communication
- **Python/TypeScript** - Multi-language implementation

## Key Technologies & Dependencies

### Core Frameworks
- **Motia** (v0.3.1-beta.87) - Primary workflow orchestration platform
- **TypeScript** (v5.8.3) - Type-safe JavaScript development
- **React** (v18.3.23) - Frontend UI components
- **Zod** (v3.25.74) - Schema validation

### AI/ML Stack
- **LlamaIndex** (v0.12.46) - Document indexing and retrieval
- **LlamaCloud Services** (v0.6.41) - Cloud-based document processing
- **OpenAI** (v1.93.0) - Language model integration
- **Neo4j GraphRAG** (v1.8.0) - Graph-based RAG implementation

### Database & Storage
- **Neo4j** (v5.16) - Graph database with APOC plugin
- **PostgreSQL** - Relational data storage
- **Supabase** - Backend-as-a-service platform

### Additional Capabilities
- **Jupyter Notebooks** - Data analysis and experimentation
- **Docker** - Containerization for Neo4j services
- **MCP Servers** - Multiple specialized AI-database connectors

## Project Structure

```
bhsme-motia/
├── main.py                    # Python entry point
├── package.json              # Node.js dependencies
├── pyproject.toml            # Python project configuration
├── requirements.txt          # Python dependencies
├── tsconfig.json             # TypeScript configuration
├── docker-compose.yml        # Neo4j database setup
├── rules.md                  # Development guidelines
├── steps/                    # Motia workflow steps
│   ├── api-steps/           # API endpoint handlers
│   ├── 00-noop.step.ts      # Workflow connectors
│   ├── 01-api.step.ts       # API triggers
│   ├── 02-test-state.step.ts # State management
│   └── 03-check-state-change.step.ts
├── tasks/                    # Project management
│   ├── README.md            # Task overview
│   ├── TASK_TRACKER.md      # Progress tracking
│   ├── QUICK_START_GUIDE.md # Implementation guide
│   └── llamacloud-motia-integration.md
├── mcp-neo4j/               # Model Context Protocol servers
│   ├── servers/
│   │   ├── mcp-neo4j-cypher/        # Cypher query generation
│   │   ├── mcp-neo4j-memory/        # Knowledge graph memory
│   │   ├── mcp-neo4j-data-modeling/ # Data model management
│   │   └── mcp-neo4j-cloud-aura-api/ # Aura cloud management
├── genai-workshop/          # AI/ML workshops and examples
│   ├── customers-and-products/      # Retail GraphRAG example
│   └── talent/                      # HR GraphRAG example
├── types.d.ts               # Auto-generated type definitions
└── verify_neo4j_connection.py # Database connectivity test
```

## Core Components

### 1. Workflow Engine (Motia)
- **Event-driven architecture** with configurable steps
- **API endpoints** for external integration
- **State management** across workflow execution
- **Flow orchestration** for complex business processes

### 2. Document Processing Pipeline
- **LlamaCloud integration** for multi-format document parsing
- **GraphRAG** for context-aware document retrieval
- **Embeddings management** for semantic search
- **Healthcare-specific** parsing instructions

### 3. Knowledge Graph (Neo4j)
- **MCP-based** AI-database communication
- **Memory persistence** across AI sessions
- **Relationship mapping** between entities
- **Cypher query generation** from natural language

### 4. AI Integration
- **OpenAI GPT-4** for analysis and generation
- **Context-aware research** combining documents and web sources
- **Structured output** generation for reports
- **Multi-modal processing** capabilities

## Development Workflow

### Phase-Based Implementation
The project follows a structured 4-phase approach:

1. **Phase 1: Foundation** - LlamaIndex integration setup
2. **Phase 2: Core Integration** - Document processing pipeline
3. **Phase 3: Document Integration** - GSH-specific analysis
4. **Phase 4: Advanced Features** - Automation and optimization

### Key Development Rules
- **LlamaIndex First Priority** - Core document processing capability
- **Neo4j Memory System** - Persistent context across sessions
- **Agent Coordination** - Structured roles and responsibilities
- **Healthcare Compliance** - HIPAA-compliant data handling

## Use Cases

### Primary Healthcare Applications
- **Document Analysis** - Process GSH compliance documents
- **Regulatory Compliance** - DHCS, OSHPD, BHCIP requirements
- **Financial Analysis** - Budget projections and ROI calculations
- **Risk Assessment** - Automated risk identification and mitigation
- **Report Generation** - Executive summaries and recommendations

### AI-Powered Workflows
- **Context-Aware Research** - Combine internal docs with external sources
- **Automated Documentation** - Generate compliance reports
- **Knowledge Graph Queries** - Natural language database interaction
- **Multi-Modal Processing** - Handle various document formats

## Configuration & Environment

### Required Environment Variables
```bash
# LlamaCloud Configuration
LLAMACLOUD_API_KEY=your-api-key
LLAMACLOUD_PROJECT_NAME=gsh-analysis
OPENAI_API_KEY=your-openai-key

# Neo4j Configuration
NEO4J_URL=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost/gsh_db
```

### Docker Services
- **Neo4j** - Graph database with APOC plugin
- **MCP Memory Service** - AI memory management

## Testing & Quality Assurance

### Test Structure
- **Integration Tests** - MCP server connectivity
- **Unit Tests** - Individual component validation
- **End-to-End Tests** - Complete workflow validation

### Quality Metrics
- **Memory System Validation** - Cross-tool synchronization
- **LlamaIndex Integration** - Document processing accuracy
- **Performance Monitoring** - Response times and throughput

## Deployment & Operations

### Local Development
```bash
# Start Neo4j database
docker-compose up -d

# Install dependencies
npm install
pip install -r requirements.txt

# Run development server
npm run dev
```

### Production Considerations
- **Healthcare Compliance** - HIPAA data handling requirements
- **Security** - API key management and data encryption
- **Scalability** - Load balancing and performance optimization
- **Monitoring** - Error tracking and performance metrics

## Integration Points

### External APIs
- **LlamaCloud** - Document parsing and indexing
- **OpenAI** - Language model processing
- **Neo4j Aura** - Cloud graph database management

### Data Sources
- **GSH Documents** - Healthcare compliance and planning documents
- **Web Research** - External regulatory and industry information
- **Knowledge Graphs** - Structured relationship data

## Success Criteria

### Technical Milestones
- **LlamaIndex Integration** - Full document processing capability
- **Memory System** - Persistent AI context across sessions
- **Document Processing** - GSH-specific analysis workflows
- **Workflow Automation** - End-to-end process automation

### Business Outcomes
- **Compliance Efficiency** - Faster regulatory document processing
- **Risk Reduction** - Automated risk identification
- **Decision Support** - AI-powered insights and recommendations
- **Cost Optimization** - Improved resource allocation

## Future Roadmap

### Planned Enhancements
- **Advanced Analytics** - Predictive modeling capabilities
- **Multi-Language Support** - International compliance requirements
- **Real-Time Processing** - Live document analysis
- **Enhanced Security** - Advanced data protection measures

---

## Quick Start Commands

```bash
# Project setup
git clone <repository>
cd bhsme-motia

# Environment setup
cp .env.example .env
# Edit .env with your API keys

# Start services
docker-compose up -d
npm install
pip install -r requirements.txt

# Development mode
npm run dev

# Verify connections
python verify_neo4j_connection.py
```

## Support & Documentation

- **Tasks Directory** - Implementation guides and progress tracking
- **Workshop Materials** - GraphRAG examples and tutorials
- **MCP Documentation** - AI-database integration guides
- **Rules.md** - Development guidelines and standards

---

*This documentation is maintained as part of the GSH Healthcare Intelligence Platform project. For updates and modifications, please refer to the project repository and task management system.*