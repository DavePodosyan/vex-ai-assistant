import { ExternalLink, Play, Code, Book, Trophy, Users, Wrench, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onTopicSelect: (topic: string) => void;
}

export function Sidebar({ isOpen, onClose, onTopicSelect }: SidebarProps) {
  const competitionLevels = [
    {
      name: "VEX GO",
      ageRange: "Ages 8-11 / Grades 4-6",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-100",
      textColor: "text-blue-900",
      subtextColor: "text-blue-700",
      iconColor: "text-blue-600",
    },
    {
      name: "VEX IQ",
      ageRange: "Elementary & Middle School",
      game: "2025-26: Mix & Match",
      color: "purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200", 
      hoverColor: "hover:bg-purple-100",
      textColor: "text-purple-900",
      subtextColor: "text-purple-700",
      gameColor: "text-purple-600",
      iconColor: "text-purple-600",
    },
    {
      name: "VEX V5",
      ageRange: "Middle & High School",
      game: "2025-26: Push Back",
      color: "indigo",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      hoverColor: "hover:bg-indigo-100", 
      textColor: "text-indigo-900",
      subtextColor: "text-indigo-700",
      gameColor: "text-indigo-600",
      iconColor: "text-indigo-600",
    },
    {
      name: "VEX U",
      ageRange: "College/University",
      color: "emerald",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      hoverColor: "hover:bg-emerald-100",
      textColor: "text-emerald-900", 
      subtextColor: "text-emerald-700",
      iconColor: "text-emerald-600",
    },
  ];

  const quickTopics = [
    { icon: Play, label: "Getting Started", color: "text-vex-blue" },
    { icon: Code, label: "Programming Help", color: "text-vex-purple" },
    { icon: Book, label: "Game Rules", color: "text-vex-orange" },
    { icon: Trophy, label: "Competition Info", color: "text-emerald-600" },
    { icon: Users, label: "Team Formation", color: "text-rose-600" },
    { icon: Wrench, label: "Troubleshooting", color: "text-amber-600" },
  ];

  const resources = [
    {
      title: "VEXcode",
      description: "Programming environment",
      url: "https://www.vexrobotics.com/vexcode",
      icon: Code,
    },
    {
      title: "VEX Library",
      description: "Documentation & tutorials", 
      url: "https://kb.vex.com",
      icon: Book,
    },
    {
      title: "RobotEvents",
      description: "Register for tournaments",
      url: "https://www.robotevents.com",
      icon: Trophy,
    },
    {
      title: "VEX Forum",
      description: "Community Q&A",
      url: "https://www.vexforum.com",
      icon: Users,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-600 bg-opacity-50" onClick={onClose}></div>
        </div>
      )}
      
      {/* Sidebar */}
      <aside className={`
        w-80 bg-white border-r border-slate-200 flex flex-col overflow-hidden
        ${isOpen ? 'fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0' : 'hidden lg:flex'}
      `}>
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Competition Levels</h2>
          
          <div className="space-y-3">
            {competitionLevels.map((level) => (
              <Card 
                key={level.name}
                className={`p-3 ${level.bgColor} border ${level.borderColor} cursor-pointer ${level.hoverColor} transition-colors`}
                onClick={() => onTopicSelect(`Tell me about ${level.name}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${level.textColor}`}>{level.name}</h3>
                    <p className={`text-sm ${level.subtextColor}`}>{level.ageRange}</p>
                    {level.game && (
                      <p className={`text-xs ${level.gameColor} font-medium`}>{level.game}</p>
                    )}
                  </div>
                  <ChevronRight className={`${level.iconColor} h-4 w-4`} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="p-6 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Quick Topics</h3>
          <div className="space-y-2">
            {quickTopics.map((topic) => (
              <Button
                key={topic.label}
                variant="ghost"
                className="w-full justify-start text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => onTopicSelect(`Help me with ${topic.label.toLowerCase()}`)}
              >
                <topic.icon className={`mr-2 h-4 w-4 ${topic.color}`} />
                {topic.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="font-semibold text-slate-900 mb-3">Helpful Resources</h3>
          <div className="space-y-3">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-slate-200 rounded-lg hover:border-vex-blue hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-start space-x-2">
                  <resource.icon className="text-vex-blue mt-0.5 h-4 w-4 group-hover:text-vex-blue" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-900 flex items-center">
                      {resource.title}
                      <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                    </h4>
                    <p className="text-xs text-slate-600">{resource.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
