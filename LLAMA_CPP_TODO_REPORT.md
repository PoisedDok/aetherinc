# 🔧 Llama.cpp Integration - Remaining Issues & Action Plan

## ✅ **COMPLETED FIXES**
- **Fixed:** `response.body.getReader is not a function` error
- **Status:** Streaming responses working perfectly
- **Result:** CLI can communicate with llama.cpp server successfully

---

## 🚨 **OUTSTANDING ISSUES**

### **Issue #1: Connection Reset During Conversation Flow**
**Severity:** Medium | **Priority:** High

#### **Error Details:**
```
⚠ Failed to talk to Gemini endpoint when seeing if conversation should continue. 
Error: Failed to generate JSON content: request to http://localhost:8080/v1/chat/completions failed, reason: read ECONNRESET
```

#### **Call Stack:**
```
checkNextSpeaker() → GeminiClient.generateJson() → HTTP request → ECONNRESET
```

#### **Root Cause Analysis:**
- **Primary Response:** ✅ Works perfectly (main conversation)
- **Secondary Process:** ❌ Fails during conversation flow management
- **Timing:** Error occurs AFTER successful main response
- **Location:** `nextSpeakerChecker.js:98` and `client.js:239`

#### **Technical Details:**
1. CLI makes multiple successive requests to llama.cpp server
2. Server drops/resets connection on rapid successive calls
3. `checkNextSpeaker` function tries to determine conversation continuation
4. llama.cpp server not handling connection keep-alive properly

---

### **Issue #2: Token Tracking Completely Broken**
**Severity:** High | **Priority:** Medium

#### **Evidence:**
```
Cumulative Stats (2 Turns)
Input Tokens                0
Output Tokens               0  
Thoughts Tokens             0
─────────────────────────────
Total Tokens                0
```

#### **Expected vs Actual:**
- **Expected:** ~300+ tokens for the physics response
- **Actual:** 0 tokens reported
- **Impact:** No usage tracking, billing, or performance metrics

#### **Root Cause Analysis:**
- llama.cpp responses not providing token count metadata
- CLI token counting logic expects Gemini API response format
- `LlamaCppContentGenerator` not mapping token usage to expected format
- Response objects missing `usageMetadata` or similar fields

---

## 🎯 **DETAILED ACTION PLAN FOR AI FIXES**

### **Phase 1: Fix Connection Management (Priority 1)**

#### **Files to Investigate:**
- `packages/core/src/utils/nextSpeakerChecker.js:98`
- `packages/core/src/core/client.js:239`
- `packages/core/src/core/llamaCppContentGenerator.ts`

#### **Specific Actions:**
1. **Add Connection Retry Logic:**
   ```typescript
   // In client.js:239 - Add retry wrapper
   async generateJson(request, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await this.originalGenerateJson(request);
       } catch (error) {
         if (error.code === 'ECONNRESET' && i < maxRetries - 1) {
           await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
           continue;
         }
         throw error;
       }
     }
   }
   ```

2. **Make checkNextSpeaker Optional:**
   ```typescript
   // In nextSpeakerChecker.js - Add graceful fallback
   try {
     const shouldContinue = await checkNextSpeaker(context);
     return shouldContinue;
   } catch (error) {
     console.warn('Next speaker check failed, defaulting to continue');
     return { shouldContinue: true }; // Graceful degradation
   }
   ```

3. **Connection Pooling:**
   - Implement HTTP agent with keep-alive
   - Add connection reuse for llama.cpp requests
   - Configure appropriate timeout values

#### **Testing Steps:**
1. Run CLI with multiple conversation turns
2. Verify no ECONNRESET errors
3. Confirm conversation flow continues smoothly

---

### **Phase 2: Fix Token Tracking (Priority 2)**

#### **Root Cause Location:**
- `packages/core/src/core/llamaCppContentGenerator.ts` - Response mapping
- CLI expects `usageMetadata` field in responses
- llama.cpp responses don't include token counts in expected format

#### **Investigation Steps:**
1. **Examine Current Response Format:**
   ```typescript
   // Current response from llama.cpp
   {
     candidates: [{ content: { parts: [{ text: "..." }] } }],
     promptFeedback: { blockReason: null }
     // Missing: usageMetadata
   }
   ```

2. **Expected Format:**
   ```typescript
   // CLI expects this format
   {
     candidates: [...],
     usageMetadata: {
       promptTokenCount: number,
       candidatesTokenCount: number,
       totalTokenCount: number
     }
   }
   ```

#### **Specific Fixes Needed:**

1. **Add Token Counting to Responses:**
   ```typescript
   // In llamaCppContentGenerator.ts - both streaming and non-streaming
   const result = {
     candidates: [...],
     promptFeedback: {...},
     usageMetadata: {
       promptTokenCount: this.estimateTokenCount(promptText),
       candidatesTokenCount: this.estimateTokenCount(responseText),
       totalTokenCount: promptTokens + responseTokens
     }
   };
   ```

2. **Implement Token Estimation:**
   ```typescript
   private estimateTokenCount(text: string): number {
     // Simple estimation: ~4 chars per token average
     return Math.ceil(text.length / 4);
   }
   ```

3. **Extract Token Info from llama.cpp:**
   - Check if llama.cpp server provides token counts in response headers
   - Look for timing information that might include token metrics
   - Add logging to capture actual vs estimated tokens

#### **Files to Modify:**
- `packages/core/src/core/llamaCppContentGenerator.ts` (lines ~140, ~290, ~420)
- Both `generateContentStandard()` and `generateContentOpenAI()` methods
- Both streaming functions: `generateContentStreamStandard()` and `generateContentStreamOpenAI()`

---

### **Phase 3: Validation & Testing**

#### **Test Scenarios:**
1. **Single Turn Conversation:**
   - Send one message
   - Verify token counts are non-zero
   - Check connection stability

2. **Multi-Turn Conversation:**
   - Send 3-5 messages in sequence
   - Verify no ECONNRESET errors
   - Confirm cumulative token tracking

3. **Edge Cases:**
   - Very long responses (1000+ tokens)
   - Very short responses (1-2 tokens)
   - Connection interruption scenarios

#### **Success Criteria:**
- ✅ No ECONNRESET errors in debug console
- ✅ Token counts showing realistic numbers (>0)
- ✅ Conversation flow continues smoothly
- ✅ Cumulative stats display properly

---

## 🔍 **CONTEXT FOR AI IMPLEMENTER**

### **Current State:**
- llama.cpp server running on localhost:8080 ✅
- Primary streaming functionality working ✅
- Main responses generating correctly ✅
- CLI UI working properly ✅

### **Architecture:**
- **Server:** llama.cpp providing OpenAI-compatible API
- **Client:** Gemini CLI with custom `LlamaCppContentGenerator`
- **Protocol:** HTTP/1.1 to localhost:8080/v1/chat/completions

### **Key Files:**
```
packages/core/src/core/
├── llamaCppContentGenerator.ts (main integration)
├── client.js (connection management)
└── utils/nextSpeakerChecker.js (conversation flow)
```

### **Environment:**
- Windows 10, Node.js v20.17.0
- PowerShell terminal
- Working directory: D:\aetherinc\gemini-cli

### **Testing Command:**
```bash
node packages/cli/dist/index.js
# Then ask questions to test both issues
```

---

## 📋 **IMPLEMENTATION CHECKLIST**

- [ ] Phase 1: Add retry logic to connection management
- [ ] Phase 1: Make checkNextSpeaker gracefully degrade on failure  
- [ ] Phase 1: Test multi-turn conversations without ECONNRESET
- [ ] Phase 2: Add usageMetadata to all response objects
- [ ] Phase 2: Implement token counting/estimation
- [ ] Phase 2: Verify token tracking displays correctly
- [ ] Phase 3: Full integration testing
- [ ] Phase 3: Edge case validation

**Estimated Time:** 2-3 hours for complete fix implementation 