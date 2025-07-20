import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Send, Paperclip, Rocket, Gamepad2, Code, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage } from "@shared/schema";

interface ChatInterfaceProps {
  sessionId: string;
}

interface ChatInterfaceHandle {
  sendMessage: (message: string) => void;
}

interface ChatResponse {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  sources?: string[];
  suggestedFollowUps?: string[];
}

export const ChatInterface = forwardRef<ChatInterfaceHandle, ChatInterfaceProps>(({ sessionId }, ref) => {
  const [message, setMessage] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "How do I register for VEX competitions?",
    "What's the difference between VEX IQ and V5?",
    "Help with VEXcode programming",
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Fetch chat messages
  const { data: messages = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/messages", sessionId],
    enabled: !!sessionId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat/message", {
        sessionId,
        content,
        role: "user",
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages", sessionId] });
      if (data.suggestedFollowUps) {
        setSuggestedQuestions(data.suggestedFollowUps);
      }
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageMutation.mutate(message.trim());
      setMessage("");
    }
  };

  // Expose sendMessage method through ref
  useImperativeHandle(ref, () => ({
    sendMessage: (msg: string) => {
      setMessage(msg);
      sendMessageMutation.mutate(msg);
    }
  }));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickStartCards = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "New to VEX? Start here!",
      color: "blue",
      question: "I'm new to VEX robotics. How do I get started?",
    },
    {
      icon: Gamepad2,
      title: "2025-26 Games", 
      description: "Push Back & Mix & Match",
      color: "purple",
      question: "Tell me about the 2025-26 VEX games Push Back and Mix & Match",
    },
    {
      icon: Code,
      title: "Programming",
      description: "VEXcode tutorials & help",
      color: "orange",
      question: "How do I get started with VEX programming and VEXcode?",
    },
    {
      icon: Award,
      title: "Competitions",
      description: "Rules & tournament info",
      color: "emerald",
      question: "How do VEX competitions work and how do I register?",
    },
  ];

  const getCardColors = (color: string) => {
    const colorMap = {
      blue: "hover:border-vex-blue hover:shadow-md",
      purple: "hover:border-vex-purple hover:shadow-md", 
      orange: "hover:border-vex-orange hover:shadow-md",
      emerald: "hover:border-emerald-600 hover:shadow-md",
    };
    return colorMap[color as keyof typeof colorMap] || "hover:border-slate-300";
  };

  const getIconColors = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-vex-blue",
      purple: "bg-purple-100 text-vex-purple",
      orange: "bg-orange-100 text-vex-orange", 
      emerald: "bg-emerald-100 text-emerald-600",
    };
    return colorMap[color as keyof typeof colorMap] || "bg-slate-100 text-slate-600";
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vex-blue mx-auto mb-4"></div>
          <p className="text-slate-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Welcome Section */}
      {messages.length === 0 && (
        <>
          <div className="p-6 bg-gradient-to-r from-vex-blue to-vex-purple text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome to VEX Robotics AI Assistant!</h2>
            <p className="text-blue-100">I'm here to help you with VEX competitions, programming, rules, and getting started. Ask me anything about VEX GO, IQ, V5, or U!</p>
          </div>

          {/* Quick Start Cards */}
          <div className="p-6 bg-white border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Get Started Quickly</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStartCards.map((card) => (
                <Card
                  key={card.title}
                  className={`cursor-pointer transition-all border border-slate-200 ${getCardColors(card.color)}`}
                  onClick={() => {
                    setMessage(card.question);
                    sendMessageMutation.mutate(card.question);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${getIconColors(card.color)}`}>
                        <card.icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-medium text-slate-900 mb-1">{card.title}</h4>
                      <p className="text-sm text-slate-600">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-xs lg:max-w-2xl">
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-vex-blue text-white rounded-br-md"
                      : "bg-white border border-slate-200 rounded-bl-md shadow-sm"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-vex-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                      </div>
                      <div className="flex-1">
                        <div 
                          className="text-slate-900 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: msg.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          }}
                        />
                        {(() => {
                          if (msg.metadata && typeof msg.metadata === 'object' && msg.metadata !== null && 'sources' in msg.metadata) {
                            const sources = (msg.metadata as any).sources;
                            if (Array.isArray(sources) && sources.length > 0) {
                              return (
                                <div className="mt-3 space-y-1">
                                  <p className="text-xs font-medium text-slate-700">Sources:</p>
                                  {sources.map((source, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs mr-1">
                                      <a href={source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        Link {i + 1}
                                      </a>
                                    </Badge>
                                  ))}
                                </div>
                              );
                            }
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  )}
                  {msg.role === "user" && (
                    <p className="text-white">{msg.content}</p>
                  )}
                </div>
                <div className={`text-xs text-slate-500 mt-1 ${msg.role === "user" ? "text-right" : ""}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          
          {sendMessageMutation.isPending && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-2xl">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-vex-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="border-t border-slate-200 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Textarea
                placeholder="Ask me anything about VEX robotics competitions, programming, rules, or getting started..."
                value={message}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                className="resize-none pr-12 min-h-[44px]"
                rows={1}
              />
              <Button variant="ghost" size="sm" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || sendMessageMutation.isPending}
              className="px-6 py-3 bg-vex-blue hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>

          {/* Suggested Questions */}
          {suggestedQuestions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  className="text-sm"
                  onClick={() => {
                    setMessage(question);
                    sendMessageMutation.mutate(question);
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
});
