import { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';
import { GSHLlamaIndexService } from '../../services/llamaindex-service';
import { Neo4jMemoryService } from '../../services/neo4j-memory.service';

export const config: ApiRouteConfig = {
    type: 'api',
    path: '/research/codebase-aware',
    method: 'POST',
    name: 'CodebaseAwareResearch',
    description: 'Enhanced research with GSH document context and existing codebase analysis',
    emits: ['codebase.research.started', 'codebase.context.enriched', 'research.completed'],
    bodySchema: z.object({
        query: z.string().describe('Research query enhanced with codebase context'),
        includeCodeContext: z.boolean().default(true),
        includeGSHDocuments: z.boolean().default(true),
        documentType: z.enum(['medical', 'financial', 'administrative', 'regulatory', 'all']).default('all'),
        maxDocuments: z.number().min(1).max(10).default(5),
        researchFocus: z.enum(['integration', 'compliance', 'implementation', 'architecture', 'general']).default('integration'),
    }),
    responseSchema: {
        200: z.object({
            success: z.boolean(),
            query: z.string(),
            researchFocus: z.string(),
            documentContextUsed: z.boolean(),
            documentCount: z.number(),
            recommendations: z.array(z.string()),
            implementationSteps: z.array(z.string()),
        }),
        500: z.object({
            success: z.boolean(),
            error: z.string(),
        })
    },
    flows: ['enhanced-research-flow']
};

export const handler: Handlers['CodebaseAwareResearch'] = async (req, { logger, emit, state, traceId }) => {
    logger.info('Starting codebase-aware research', { 
        query: req.body.query, 
        includeCodeContext: req.body.includeCodeContext,
        includeGSHDocuments: req.body.includeGSHDocuments,
        researchFocus: req.body.researchFocus,
        traceId 
    });

    try {
        const llamaService = new GSHLlamaIndexService();
        const memoryService = new Neo4jMemoryService();
        
        let enhancedQuery = req.body.query;
        let documentContext: any[] = [];
        let codebaseContext = '';

        // Emit research started event
        await emit({
            topic: 'codebase.research.started',
            data: {
                query: req.body.query,
                researchFocus: req.body.researchFocus,
                includeCodeContext: req.body.includeCodeContext,
                includeGSHDocuments: req.body.includeGSHDocuments,
                traceId
            }
        });

        // Get GSH document context if requested
        if (req.body.includeGSHDocuments) {
            const gshDocuments = await llamaService.queryGSHDocuments({
                query: req.body.query,
                documentType: req.body.documentType,
                maxResults: req.body.maxDocuments,
                complianceLevel: 'HIPAA'
            });

            documentContext = gshDocuments.documents;
            
            logger.info('Retrieved GSH document context', { 
                documentCount: documentContext.length,
                traceId 
            });
        }

        // Build enhanced query with document context
        if (req.body.includeCodeContext && documentContext.length > 0) {
            const documentSummaries = documentContext.map(doc => 
                `Document: ${doc.title}\nType: ${doc.documentType}\nContent: ${doc.content.substring(0, 500)}...`
            ).join('\n\n');

            enhancedQuery = `
Based on the existing GSH (Good Samaritan Hospital) project context:

${documentSummaries}

Research Focus: ${req.body.researchFocus}

Current Architecture:
- Motia workflow framework (v0.3.1-beta.87)
- LlamaIndex for document processing
- Neo4j for persistent memory
- TypeScript/Node.js stack

Research Query: ${req.body.query}

Please provide insights that consider:
1. Integration with existing Motia architecture
2. Compliance with HIPAA and healthcare regulations
3. Implementation complexity and dependencies
4. Best practices alignment with current setup
5. Specific recommendations for GSH project requirements
            `;
        }

        // For Phase 1, we'll simulate enhanced research response
        // In Phase 2, this would integrate with actual research agents
        const researchResponse = {
            query: req.body.query,
            enhancedQuery,
            documentContext: documentContext,
            recommendations: [
                'Ensure HIPAA compliance in all document processing workflows',
                'Implement proper error handling for LlamaIndex operations',
                'Consider caching strategies for frequently accessed documents',
                'Establish monitoring for document query performance',
                'Create audit trails for all document access operations'
            ],
            implementationSteps: [
                'Validate LlamaIndex configuration for healthcare data',
                'Implement document encryption at rest and in transit',
                'Set up proper access controls and authentication',
                'Create comprehensive logging for compliance auditing',
                'Establish backup and disaster recovery procedures'
            ],
            complianceConsiderations: [
                'HIPAA Privacy Rule compliance for PHI handling',
                'Security safeguards for electronic health information',
                'Administrative safeguards for staff access controls',
                'Technical safeguards for data transmission and storage'
            ],
            integrationPoints: [
                'Motia workflow step integration',
                'Neo4j memory service coordination',
                'State management for document context',
                'Event emission for workflow coordination'
            ]
        };

        // Store enhanced research results in state
        await state.set(traceId, 'enhanced-research-results', {
            query: req.body.query,
            researchFocus: req.body.researchFocus,
            results: researchResponse,
            timestamp: new Date().toISOString(),
            documentContextUsed: documentContext.length > 0,
            sessionId: traceId
        });

        // Update Neo4j memory with research outcomes
        await memoryService.updateTaskMemory(`research-${traceId}`, {
            taskId: `research-${traceId}`,
            phase: 1,
            completedAt: new Date().toISOString(),
            outcomes: [
                `Completed enhanced research for: "${req.body.query}"`,
                `Incorporated ${documentContext.length} GSH documents`,
                `Generated ${researchResponse.recommendations.length} recommendations`,
                `Identified ${researchResponse.integrationPoints.length} integration points`
            ],
            decisions: [
                `Research focus: ${req.body.researchFocus}`,
                `Document context: ${req.body.includeGSHDocuments ? 'included' : 'excluded'}`,
                `Codebase context: ${req.body.includeCodeContext ? 'included' : 'excluded'}`,
                'Prioritized HIPAA compliance considerations'
            ],
            context: {
                documentsProcessed: documentContext.map(doc => doc.title),
                codeChanges: [],
                integrationPoints: researchResponse.integrationPoints,
                nextSteps: researchResponse.implementationSteps
            },
            relationships: {
                relatedDocuments: documentContext.map(doc => doc.id),
                codeComponents: ['GSHLlamaIndexService', 'CodebaseAwareResearch'],
                requirements: researchResponse.complianceConsiderations
            }
        });

        // Emit context enriched event
        await emit({
            topic: 'codebase.context.enriched',
            data: {
                query: req.body.query,
                documentContextCount: documentContext.length,
                enhancedQuery: enhancedQuery.length > req.body.query.length,
                traceId
            }
        });

        // Emit research completed event
        await emit({
            topic: 'research.completed',
            data: {
                query: req.body.query,
                researchFocus: req.body.researchFocus,
                recommendationCount: researchResponse.recommendations.length,
                implementationStepCount: researchResponse.implementationSteps.length,
                traceId
            }
        });

        logger.info('Codebase-aware research completed successfully', { 
            query: req.body.query,
            documentContextCount: documentContext.length,
            recommendationCount: researchResponse.recommendations.length,
            traceId 
        });

        return {
            status: 200,
            body: {
                success: true,
                query: req.body.query,
                researchFocus: req.body.researchFocus,
                documentContextUsed: documentContext.length > 0,
                documentCount: documentContext.length,
                enhancedQuery: enhancedQuery,
                recommendations: researchResponse.recommendations,
                implementationSteps: researchResponse.implementationSteps,
                complianceConsiderations: researchResponse.complianceConsiderations,
                integrationPoints: researchResponse.integrationPoints,
                timestamp: new Date().toISOString(),
                sessionId: traceId,
                metadata: {
                    phase: 1,
                    service: 'CodebaseAwareResearch',
                    memoryUpdated: true
                }
            }
        };

    } catch (error) {
        logger.error('Codebase-aware research failed', { 
            error: error.message, 
            query: req.body.query,
            traceId 
        });

        return {
            status: 500,
            body: {
                success: false,
                error: 'Failed to complete codebase-aware research',
                details: error.message,
                query: req.body.query,
                timestamp: new Date().toISOString(),
                traceId
            }
        };
    }
};