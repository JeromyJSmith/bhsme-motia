import { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';
import { GSHLlamaIndexService } from '../../services/llamaindex-service';
import { Neo4jMemoryService } from '../../services/neo4j-memory.service';

export const config: ApiRouteConfig = {
    type: 'api',
    path: '/gsh/documents/query',
    method: 'POST',
    name: 'GSHDocumentQuery',
    description: 'Query GSH document index via LlamaIndex for healthcare compliance documents',
    emits: ['gsh.document.queried', 'gsh.context.obtained', 'gsh.memory.updated'],
    bodySchema: z.object({
        query: z.string().describe('Search query for GSH documents'),
        documentType: z.enum(['medical', 'financial', 'administrative', 'regulatory', 'all']).default('all'),
        maxResults: z.number().min(1).max(20).default(10),
        includeCodeContext: z.boolean().default(true),
        complianceLevel: z.enum(['HIPAA', 'Healthcare']).default('HIPAA'),
    }),
    responseSchema: {
        200: z.object({
            success: z.boolean(),
            query: z.string(),
            documentType: z.string(),
            resultCount: z.number(),
            totalResults: z.number(),
            documents: z.array(z.any()),
            complianceValidated: z.boolean(),
            complianceLevel: z.string(),
            timestamp: z.string(),
            sessionId: z.string(),
        }),
        500: z.object({
            success: z.boolean(),
            error: z.string(),
            details: z.string(),
        })
    },
    flows: ['gsh-document-analysis']
};

export const handler: Handlers['GSHDocumentQuery'] = async (req, { logger, emit, state, traceId }) => {
    logger.info('Starting GSH document query', { 
        query: req.body.query, 
        type: req.body.documentType,
        maxResults: req.body.maxResults,
        complianceLevel: req.body.complianceLevel,
        traceId 
    });

    try {
        const llamaService = new GSHLlamaIndexService();
        const memoryService = new Neo4jMemoryService();
        
        // Initialize and validate document access
        const accessValidated = await llamaService.validateDocumentAccess();
        if (!accessValidated) {
            logger.warn('GSH document access validation failed', { traceId });
            throw new Error('Unable to access GSH document index');
        }

        // Query GSH document index
        const documentContext = await llamaService.queryGSHDocuments({
            query: req.body.query,
            documentType: req.body.documentType,
            maxResults: req.body.maxResults,
            complianceLevel: req.body.complianceLevel
        });

        // Store context in Motia state
        const stateKey = `gsh-document-context-${traceId}`;
        await state.set(traceId, stateKey, {
            query: req.body.query,
            documentType: req.body.documentType,
            results: documentContext.documents,
            timestamp: documentContext.timestamp,
            complianceValidated: documentContext.complianceValidated,
            totalResults: documentContext.totalResults,
            sessionId: traceId
        });

        // Update Neo4j memory with query results
        await memoryService.updateTaskMemory(`gsh-query-${traceId}`, {
            taskId: `gsh-query-${traceId}`,
            phase: 1,
            completedAt: new Date().toISOString(),
            outcomes: [
                `Successfully queried ${documentContext.totalResults} GSH documents`,
                `Query: "${req.body.query}"`,
                `Document type: ${req.body.documentType}`,
                `Compliance level: ${req.body.complianceLevel}`
            ],
            decisions: [
                `Selected ${documentContext.documents.length} most relevant documents`,
                `Applied ${req.body.complianceLevel} compliance filtering`,
                `Stored results in session state for further processing`
            ],
            context: {
                documentsProcessed: documentContext.documents.map(doc => doc.title),
                codeChanges: [],
                integrationPoints: ['LlamaIndex', 'Motia State Management', 'Neo4j Memory'],
                nextSteps: [
                    'Process document results for specific use case',
                    'Generate insights from document content',
                    'Update project knowledge base'
                ]
            },
            relationships: {
                relatedDocuments: documentContext.documents.map(doc => doc.id),
                codeComponents: ['GSHLlamaIndexService', 'Neo4jMemoryService'],
                requirements: ['HIPAA Compliance', 'Document Accessibility', 'Query Performance']
            }
        });

        // Emit success events
        await emit({
            topic: 'gsh.document.queried',
            data: {
                query: req.body.query,
                documentType: req.body.documentType,
                resultCount: documentContext.documents.length,
                totalResults: documentContext.totalResults,
                complianceLevel: req.body.complianceLevel,
                traceId
            }
        });

        await emit({
            topic: 'gsh.context.obtained',
            data: {
                context: documentContext.documents,
                complianceLevel: req.body.complianceLevel,
                complianceValidated: documentContext.complianceValidated,
                timestamp: documentContext.timestamp,
                traceId
            }
        });

        await emit({
            topic: 'gsh.memory.updated',
            data: {
                memoryUpdate: true,
                taskId: `gsh-query-${traceId}`,
                phase: 1,
                timestamp: new Date().toISOString(),
                traceId
            }
        });

        logger.info('GSH document query completed successfully', { 
            resultCount: documentContext.documents.length,
            totalResults: documentContext.totalResults,
            complianceValidated: documentContext.complianceValidated,
            traceId 
        });

        return {
            status: 200,
            body: {
                success: true,
                query: req.body.query,
                documentType: req.body.documentType,
                resultCount: documentContext.documents.length,
                totalResults: documentContext.totalResults,
                documents: documentContext.documents,
                complianceValidated: documentContext.complianceValidated,
                complianceLevel: req.body.complianceLevel,
                timestamp: documentContext.timestamp,
                sessionId: traceId,
                metadata: {
                    phase: 1,
                    service: 'GSHLlamaIndexService',
                    memoryUpdated: true
                }
            }
        };

    } catch (error) {
        logger.error('GSH document query failed', { 
            error: error.message, 
            query: req.body.query,
            documentType: req.body.documentType,
            traceId 
        });

        // Emit error event
        await emit({
            topic: 'gsh.document.query.failed',
            data: {
                error: error.message,
                query: req.body.query,
                documentType: req.body.documentType,
                traceId
            }
        });

        return {
            status: 500,
            body: {
                success: false,
                error: 'Failed to query GSH document index',
                details: error.message,
                query: req.body.query,
                documentType: req.body.documentType,
                timestamp: new Date().toISOString(),
                traceId
            }
        };
    }
};