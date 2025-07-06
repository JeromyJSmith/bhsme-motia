# LlamaCloud + Motia Integration - Quick Start Guide

## 🚀 Start TODAY - Phase 1 Implementation

### Step 0: MANDATORY Documentation Check (5 minutes)

**CRITICAL**: Before implementing, query CONTEXT7 MCP tool for latest
documentation:

```bash
# Query CONTEXT7 for current LlamaCloud patterns
# Run these queries before proceeding:
# - "LlamaCloud API latest file upload documentation"
# - "LlamaCloud TypeScript SDK current examples"
# - "Motia step configuration latest syntax"
```

See
[CONTEXT7 Documentation Rule](../.cursor/rules/05-context7-documentation.mdc)
for full requirements.

### Step 1: Get LlamaCloud API Key (5 minutes)

1. Go to [cloud.llamaindex.ai](https://cloud.llamaindex.ai)
2. Sign up or log in
3. Navigate to API Keys section
4. Generate a new API key
5. Save it securely

### Step 2: Test Your Codebase Upload (10 minutes)

```bash
# Test the upload of your existing codebase
curl -X POST https://api.cloud.llamaindex.ai/v1/files \
  -H "Authorization: Bearer YOUR_LLAMACLOUD_API_KEY" \
  -F "file=@repomix-output.md" \
  -F "filename=gsh-codebase-analysis.md"
```

### Step 3: Create Environment Variables (2 minutes)

```bash
# Add to your .env file
echo "LLAMACLOUD_API_KEY=your_api_key_here" >> .env
echo "OPENAI_API_KEY=your_openai_key_here" >> .env
```

### Step 4: Install Dependencies (5 minutes)

```bash
# Install LlamaCloud SDK
npm install @llamaindex/cloud-sdk @llamaindex/core

# Optional: Install additional dependencies
npm install axios dotenv
```

### Step 5: Create First API Step (15 minutes)

Create `steps/api-steps/analyze-existing-code.step.ts`:

```typescript
import { LlamaIndexCloudService } from "@llamaindex/cloud-sdk";

export const config = {
    type: "api",
    path: "/codebase/analyze",
    method: "POST",
    name: "AnalyzeExistingCode",
    emits: ["codebase-analysis-completed"],
};

export const handler = async (req: Request) => {
    try {
        const { analysisType = "integration", focusArea = "motia-llamacloud" } =
            req.body;

        // Initialize LlamaCloud service
        const llamaCloud = new LlamaIndexCloudService({
            apiKey: process.env.LLAMACLOUD_API_KEY,
        });

        // Query your existing codebase
        const codeContext = await llamaCloud.queryIndex(
            "gsh-codebase-index",
            `${focusArea} ${analysisType} requirements implementation`,
            10,
        );

        return {
            status: 200,
            body: {
                message: "Analysis completed",
                codeContext: codeContext.length,
                analysisType,
                focusArea,
                timestamp: new Date().toISOString(),
            },
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        };
    }
};
```

### Step 6: Test Your Implementation (5 minutes)

```bash
# Start your development server
npm run dev

# Test the API endpoint
curl -X POST http://localhost:3000/codebase/analyze \
  -H "Content-Type: application/json" \
  -d '{"analysisType": "integration", "focusArea": "motia-llamacloud"}'
```

---

## 🎯 Today's Success Criteria

By the end of today, you should have:

- [x] LlamaCloud API key obtained
- [x] Codebase uploaded to LlamaCloud
- [x] Environment variables configured
- [x] Dependencies installed
- [x] First API step created and tested

---

## 📋 Tomorrow's Plan

### Phase 1 Completion (30 minutes)

- [ ] Create codebase index
- [ ] Test basic queries
- [ ] Verify integration points

### Phase 2 Start (2 hours)

- [ ] Create codebase-aware research step
- [ ] Build LlamaCloud service wrapper
- [ ] Test integration flow

---

## 🔧 Troubleshooting

### Common Issues:

1. **API Key Not Working**: Verify it's correctly set in environment
2. **File Upload Fails**: Check file size and format
3. **Dependencies Error**: Ensure Node.js version is compatible

### Debug Commands:

```bash
# Check environment variables
echo $LLAMACLOUD_API_KEY

# Test API connectivity
curl -H "Authorization: Bearer $LLAMACLOUD_API_KEY" \
  https://api.cloud.llamaindex.ai/v1/health

# Check file exists
ls -la repomix-output.md
```

---

## 📞 Support Resources

- **LlamaCloud Docs**: https://docs.cloud.llamaindex.ai/
- **SDK Reference**: https://github.com/run-llama/llama-index-ts
- **Community**: https://discord.gg/llamaindex

---

## 🎉 Ready to Begin!

Your complete codebase (repomix-output.md - 318KB) is ready for LlamaCloud
integration.

**Start with Step 1 above and you'll have a working integration in under 1
hour!**

---

**Created**: Now\
**Goal**: Complete Phase 1 today\
**Next Review**: Tomorrow morning
