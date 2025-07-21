import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Play, 
  Code, 
  Book, 
  Trophy, 
  Users, 
  Wrench,
  Bot,
  Zap,
  Target,
  Lightbulb,
  HelpCircle,
  Settings
} from "lucide-react";
import { useLocation } from "wouter";
import { ColorCustomization } from "../components/ColorCustomization";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showColorSettings, setShowColorSettings] = useState(false);
  const [, setLocation] = useLocation();

  const handleStartChat = (question?: string) => {
    if (question) {
      // Store the initial question in localStorage to use in chat
      localStorage.setItem('initialQuestion', question);
    }
    setLocation('/chat');
  };

  const handleTopicSelect = (topic: string) => {
    handleStartChat(`Tell me about ${topic}`);
  };

  const quickStartQuestions = [
    {
      category: "Getting Started",
      icon: Play,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      questions: [
        "What is VEX Robotics and how do I get started?",
        "Which VEX competition level is right for my age?",
        "What equipment do I need for VEX IQ?",
        "How do I form a VEX robotics team?",
        "What's the difference between VEX GO, IQ, V5, and VEX U?",
      ]
    },
    {
      category: "Programming",
      icon: Code,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      questions: [
        "How do I program a VEX robot for beginners?",
        "What's the difference between Blocks, Python, and C++?",
        "How do I create an autonomous program?",
        "What are the best programming practices for VEX?",
        "How do I troubleshoot my robot's code?",
      ]
    },
    {
      category: "Current Games",
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      questions: [
        "What are the rules for Push Back (VEX V5 2025-26)?",
        "How does scoring work in Mix & Match (VEX IQ 2025-26)?",
        "What's the best strategy for autonomous period?",
        "How do I build an effective game robot?",
        "What are the key field elements I need to know?",
      ]
    },
    {
      category: "Competition",
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      questions: [
        "How do I register my team for competitions?",
        "What happens at a VEX tournament?",
        "How are teams ranked and matched?",
        "What's the path to World Championship?",
        "What should I bring to my first competition?",
      ]
    },
    {
      category: "Building & Design",
      icon: Wrench,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      questions: [
        "How do I design an effective robot chassis?",
        "What are the best building practices for VEX?",
        "How do I choose the right motors and sensors?",
        "What are common mechanical problems and solutions?",
        "How do I make my robot more reliable?",
      ]
    },
    {
      category: "Team & Strategy",
      icon: Users,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      questions: [
        "How should we organize our team roles?",
        "What's the engineering notebook and why is it important?",
        "How do we work effectively as an alliance?",
        "What soft skills are important in robotics?",
        "How do we prepare for presentations and interviews?",
      ]
    }
  ];

  const featuredTopics = [
    {
      title: "2025-26 Season Games",
      description: "Learn the rules for Push Back (V5) and Mix & Match (IQ)",
      icon: Bot,
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
      onClick: () => handleStartChat("Tell me about the 2025-26 VEX games")
    },
    {
      title: "Programming Basics",
      description: "Start with VEXcode Blocks and advance to text programming",
      icon: Code,
      color: "bg-gradient-to-r from-purple-500 to-pink-600",
      onClick: () => handleStartChat("How do I start programming my VEX robot?")
    },
    {
      title: "Competition Preparation",
      description: "Get ready for tournaments and skill challenges",
      icon: Trophy,
      color: "bg-gradient-to-r from-orange-500 to-red-600",
      onClick: () => handleStartChat("How do I prepare for my first VEX competition?")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onSearch={handleStartChat}
        showHomeButton={false}
        onShowColorSettings={() => setShowColorSettings(true)}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onTopicSelect={handleTopicSelect}
      />

      <ColorCustomization 
        isOpen={showColorSettings}
        onClose={() => setShowColorSettings(false)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-vex-blue rounded-2xl flex items-center justify-center mr-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">VEX AI Assistant</h1>
              <p className="text-xl text-slate-600">Your intelligent guide to VEX Robotics competitions</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg text-slate-700 mb-6">
              Get expert help with VEX robotics programming, building, competition rules, and strategies. 
              Whether you're just starting or preparing for Worlds, I'm here to help you succeed.
            </p>
            
            <Button 
              onClick={() => handleStartChat()} 
              size="lg" 
              className="bg-vex-blue hover:bg-vex-blue-dark text-white px-8 py-3 text-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chatting
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="text-sm">VEX GO</Badge>
            <Badge variant="secondary" className="text-sm">VEX IQ</Badge>
            <Badge variant="secondary" className="text-sm">VEX V5</Badge>
            <Badge variant="secondary" className="text-sm">VEX U</Badge>
            <Badge variant="outline" className="text-sm">2025-26 Season</Badge>
          </div>
        </div>

        {/* Featured Topics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredTopics.map((topic, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 overflow-hidden"
              onClick={topic.onClick}
            >
              <div className={`h-2 ${topic.color}`}></div>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <topic.icon className="h-6 w-6 text-slate-700" />
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pre-written Questions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
              <Lightbulb className="mr-3 h-6 w-6 text-vex-orange" />
              Quick Start Questions
            </h2>
            <p className="text-slate-600 mt-1">Click any question to get started with our AI assistant</p>
          </div>

          <Tabs defaultValue="Getting Started" className="p-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full mb-6">
              {quickStartQuestions.map((category) => (
                <TabsTrigger 
                  key={category.category} 
                  value={category.category}
                  className="text-xs md:text-sm"
                >
                  <category.icon className="w-4 h-4 mr-1" />
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {quickStartQuestions.map((category) => (
              <TabsContent key={category.category} value={category.category}>
                <div className={`rounded-lg p-4 ${category.bgColor} border ${category.borderColor} mb-4`}>
                  <h3 className="font-semibold text-slate-900 flex items-center mb-2">
                    <category.icon className={`w-5 h-5 mr-2 ${category.color}`} />
                    {category.category}
                  </h3>
                </div>
                
                <div className="grid gap-3">
                  {category.questions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto p-4 hover:bg-slate-50 border-slate-200"
                      onClick={() => handleStartChat(question)}
                    >
                      <HelpCircle className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{question}</span>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}