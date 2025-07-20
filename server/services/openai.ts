import OpenAI from "openai";
import { VEXKnowledgeBase } from "./vexKnowledge";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || ""
});

const vexKnowledge = new VEXKnowledgeBase();

export interface ChatResponse {
  response: string;
  sources?: string[];
  suggestedFollowUps?: string[];
}

export class VEXChatService {
  private conversationHistory: Map<string, Array<{role: string, content: string}>> = new Map();

  async generateResponse(sessionId: string, userMessage: string): Promise<ChatResponse> {
    try {
      // Get or initialize conversation history
      let history = this.conversationHistory.get(sessionId) || [];
      
      // Add user message to history
      history.push({ role: "user", content: userMessage });

      // Prepare messages for OpenAI
      const messages = [
        {
          role: "system" as const,
          content: vexKnowledge.getSystemPrompt()
        },
        ...history.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        }))
      ];

      // Generate response using OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const assistantResponse = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";

      // Add assistant response to history
      history.push({ role: "assistant", content: assistantResponse });
      
      // Keep history manageable (last 20 messages)
      if (history.length > 20) {
        history = history.slice(-20);
      }
      
      // Update conversation history
      this.conversationHistory.set(sessionId, history);

      // Generate suggested follow-ups
      const suggestedFollowUps = await this.generateSuggestedFollowUps(userMessage, assistantResponse);

      // Extract any resources mentioned
      const sources = this.extractRelevantSources(userMessage);

      return {
        response: assistantResponse,
        sources,
        suggestedFollowUps
      };

    } catch (error) {
      console.error("Error generating VEX chat response:", error);
      throw new Error("Failed to generate response. Please check your OpenAI API configuration.");
    }
  }

  private async generateSuggestedFollowUps(userMessage: string, assistantResponse: string): Promise<string[]> {
    try {
      const prompt = `Based on this VEX robotics conversation, suggest 2-3 relevant follow-up questions a student might ask:

User: ${userMessage}
Assistant: ${assistantResponse}

Respond with a JSON array of suggested questions:`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 200,
      });

      const result = JSON.parse(completion.choices[0].message.content || "{}");
      return result.suggestions || [];
    } catch (error) {
      console.error("Error generating follow-ups:", error);
      return [];
    }
  }

  private extractRelevantSources(userMessage: string): string[] {
    const sources: string[] = [];
    const lowercaseMessage = userMessage.toLowerCase();

    // Check for specific topics and add relevant resources
    if (lowercaseMessage.includes('programming') || lowercaseMessage.includes('code') || lowercaseMessage.includes('vexcode')) {
      sources.push("https://www.vexrobotics.com/vexcode");
      sources.push("https://cs.vex.com");
    }

    if (lowercaseMessage.includes('manual') || lowercaseMessage.includes('rules') || lowercaseMessage.includes('game')) {
      if (lowercaseMessage.includes('v5') || lowercaseMessage.includes('push back')) {
        sources.push("https://content.vexrobotics.com/docs/25-26/v5rc-push-back/docs/PushBack-GameManual-0.1.pdf");
      }
      if (lowercaseMessage.includes('iq') || lowercaseMessage.includes('mix') || lowercaseMessage.includes('match')) {
        sources.push("https://www.vexrobotics.com/mix-and-match-manual");
      }
    }

    if (lowercaseMessage.includes('tournament') || lowercaseMessage.includes('competition') || lowercaseMessage.includes('register')) {
      sources.push("https://www.robotevents.com");
    }

    if (lowercaseMessage.includes('forum') || lowercaseMessage.includes('community') || lowercaseMessage.includes('q&a')) {
      sources.push("https://www.vexforum.com");
    }

    return sources;
  }

  clearHistory(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
  }

  getHistory(sessionId: string): Array<{role: string, content: string}> {
    return this.conversationHistory.get(sessionId) || [];
  }
}

export const vexChatService = new VEXChatService();
