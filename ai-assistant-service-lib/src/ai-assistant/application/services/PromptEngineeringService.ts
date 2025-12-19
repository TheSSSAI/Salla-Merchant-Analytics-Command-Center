import { ContextChunk } from '../../domain/ContextChunk';

export class PromptEngineeringService {
  // Approximate char count per token (conservative estimate)
  private static readonly CHARS_PER_TOKEN = 4;
  // Reserve tokens for the response and system prompt (e.g., 4000 limit - 1000 reserve = 3000 for context/query)
  private static readonly MAX_CONTEXT_CHARS = 12000; 

  private static readonly SYSTEM_PROMPT_TEMPLATE = `
You are an expert Data Analyst Assistant for a merchant using the Salla e-commerce platform.
Your role is to answer business questions accurately based ONLY on the provided context.

GUIDELINES:
1. Use the Context Information provided below to answer the user's question.
2. If the answer is not in the context, politely state that you do not have enough data to answer.
3. Do not make up numbers or hallucinate facts.
4. Format numbers as currency (e.g., SAR 1,200.00) or percentages (e.g., 15%) where appropriate.
5. If the user asks about sensitive customer data (names, emails) that is redacted (e.g., [EMAIL_REDACTED]), explain that PII is protected.
6. Provide concise, actionable insights.
7. Keep your tone professional, helpful, and encouraging.

CONTEXT INFORMATION:
{{CONTEXT}}

END OF CONTEXT
`;

  /**
   * Constructs the final prompt to be sent to the LLM.
   * Combines the system instructions, retrieved context chunks (RAG), and the user's sanitized query.
   * @param userQuery The sanitized user query.
   * @param contextChunks Array of relevant context retrieved from the Vector DB.
   */
  public constructPrompt(userQuery: string, contextChunks: ContextChunk[]): string {
    const formattedContext = this.formatContext(contextChunks);
    
    // Inject context into system template
    const systemInstruction = PromptEngineeringService.SYSTEM_PROMPT_TEMPLATE.replace(
      '{{CONTEXT}}', 
      formattedContext
    );

    // Final prompt structure designed to prevent instruction injection
    return `
${systemInstruction}

USER QUESTION:
${userQuery}

ANSWER:
`;
  }

  /**
   * Formats and limits context chunks to fit within the context window.
   */
  private formatContext(chunks: ContextChunk[]): string {
    if (!chunks || chunks.length === 0) {
      return "No specific data context found for this query.";
    }

    let combinedContext = "";
    
    // Sort by relevance score descending
    const sortedChunks = [...chunks].sort((a, b) => b.score - a.score);

    for (const chunk of sortedChunks) {
      // Format: [Source: TableName] Content...
      const entry = `[Source: ${chunk.metadata?.source || 'Unknown'}] ${chunk.text}\n---\n`;
      
      if ((combinedContext.length + entry.length) > PromptEngineeringService.MAX_CONTEXT_CHARS) {
        break; // Stop adding chunks if we exceed the safety limit
      }
      
      combinedContext += entry;
    }

    return combinedContext.trim();
  }

  /**
   * Estimates token usage for cost control and limit checking.
   * This is a heuristic method, not an exact tokenizer.
   */
  public estimateTokenCount(text: string): number {
    if (!text) return 0;
    return Math.ceil(text.length / PromptEngineeringService.CHARS_PER_TOKEN);
  }
}