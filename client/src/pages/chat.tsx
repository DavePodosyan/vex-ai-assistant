import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { ColorCustomization } from "@/components/ColorCustomization";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ChatSession } from "@shared/schema";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showColorSettings, setShowColorSettings] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const chatInterfaceRef = useRef<{ sendMessage: (message: string) => void }>(null);

  // Create chat session mutation
  const createSessionMutation = useMutation({
    mutationFn: async (): Promise<ChatSession> => {
      const response = await apiRequest("POST", "/api/chat/session", {
        sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
      return response.json();
    },
    onSuccess: (session) => {
      setSessionId(session.sessionId);
      
      // Check for initial question from localStorage
      const initialQuestion = localStorage.getItem('initialQuestion');
      if (initialQuestion) {
        localStorage.removeItem('initialQuestion');
        // Send initial question after a brief delay to ensure chat interface is ready
        setTimeout(() => {
          if (chatInterfaceRef.current) {
            chatInterfaceRef.current.sendMessage(initialQuestion);
          }
        }, 100);
      }
    },
  });

  // Initialize session on mount
  useEffect(() => {
    createSessionMutation.mutate();
  }, []);

  const handleSearch = (query: string) => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.sendMessage(query);
    }
  };

  const handleTopicSelect = (topic: string) => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.sendMessage(topic);
    }
    setSidebarOpen(false);
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vex-blue mx-auto mb-4"></div>
          <p className="text-slate-600">Initializing VEX AI Assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSearch={handleSearch}
        onShowColorSettings={() => setShowColorSettings(true)}
      />

      <ColorCustomization 
        isOpen={showColorSettings}
        onClose={() => setShowColorSettings(false)}
      />
      
      <div className="flex h-screen pt-16">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onTopicSelect={handleTopicSelect}
        />
        
        <ChatInterface ref={chatInterfaceRef} sessionId={sessionId} />
      </div>
    </div>
  );
}
