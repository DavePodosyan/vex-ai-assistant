import { useState } from "react";
import { Search, HelpCircle, Menu, Home, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface HeaderProps {
  onToggleSidebar: () => void;
  onSearch: (query: string) => void;
  showHomeButton?: boolean;
  onShowColorSettings?: () => void;
}

export function Header({ onToggleSidebar, onSearch, showHomeButton = true, onShowColorSettings }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-vex-blue rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-xl font-bold text-slate-900">VEX AI Assistant</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {showHomeButton && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation('/')}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            )}
            
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search VEX topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            </form>
            
            {onShowColorSettings && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onShowColorSettings}
                title="Customize Colors"
              >
                <Palette className="h-5 w-5" />
              </Button>
            )}
            
            <Button variant="ghost" size="sm">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
