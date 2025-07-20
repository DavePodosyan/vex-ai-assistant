import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { vexChatService } from "./services/openai";
import { VEXKnowledgeBase } from "./services/vexKnowledge";
import { insertChatSessionSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

const vexKnowledge = new VEXKnowledgeBase();

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoints
  app.post("/api/chat/session", async (req, res) => {
    try {
      const sessionData = insertChatSessionSchema.parse(req.body);
      const session = await storage.createChatSession(sessionData);
      res.json(session);
    } catch (error) {
      console.error("Error creating chat session:", error);
      res.status(400).json({ message: "Invalid session data" });
    }
  });

  app.get("/api/chat/session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getChatSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      console.error("Error fetching chat session:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/chat/message", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      
      // Store user message
      const userMessage = await storage.addChatMessage(messageData);
      
      // Generate AI response
      const chatResponse = await vexChatService.generateResponse(
        messageData.sessionId,
        messageData.content
      );

      // Store AI response
      const assistantMessage = await storage.addChatMessage({
        sessionId: messageData.sessionId,
        content: chatResponse.response,
        role: "assistant",
        metadata: {
          sources: chatResponse.sources,
          suggestedFollowUps: chatResponse.suggestedFollowUps,
        },
      });

      res.json({
        userMessage,
        assistantMessage,
        sources: chatResponse.sources,
        suggestedFollowUps: chatResponse.suggestedFollowUps,
      });
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to process message" 
      });
    }
  });

  app.get("/api/chat/messages/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/chat/messages/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      await storage.deleteChatMessages(sessionId);
      vexChatService.clearHistory(sessionId);
      res.json({ message: "Messages cleared" });
    } catch (error) {
      console.error("Error clearing chat messages:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // VEX Knowledge Base endpoints
  app.get("/api/vex/competitions", async (req, res) => {
    try {
      const levels = vexKnowledge.getCompetitionLevels();
      res.json(levels);
    } catch (error) {
      console.error("Error fetching competition levels:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/vex/resources", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let resources = vexKnowledge.getResources();
      
      if (category && typeof category === 'string') {
        resources = vexKnowledge.getResourcesByCategory(category);
      }
      
      if (search && typeof search === 'string') {
        resources = vexKnowledge.searchResources(search);
      }
      
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/vex/info/:topic", async (req, res) => {
    try {
      const { topic } = req.params;
      const { type } = req.query;
      
      let info = null;
      
      if (type === 'programming') {
        info = vexKnowledge.getProgrammingInfo(topic);
      } else if (type === 'competition') {
        info = vexKnowledge.getCompetitionInfo(topic);
      } else if (type === 'gamemanual') {
        info = vexKnowledge.getGameManualInfo(topic);
      }
      
      if (!info) {
        return res.status(404).json({ message: "Information not found" });
      }
      
      res.json(info);
    } catch (error) {
      console.error("Error fetching VEX info:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/vex/gamemanuals", async (req, res) => {
    try {
      const manuals = {
        v5PushBack: vexKnowledge.getGameManualInfo('v5PushBack'),
        iqMixMatch: vexKnowledge.getGameManualInfo('iqMixMatch')
      };
      res.json(manuals);
    } catch (error) {
      console.error("Error fetching game manuals:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
