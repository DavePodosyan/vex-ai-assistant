import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, RotateCcw } from "lucide-react";

interface ColorCustomizationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ColorCustomization({ isOpen, onClose }: ColorCustomizationProps) {
  const [currentTheme, setCurrentTheme] = useState('default');

  const colorThemes = [
    {
      name: 'default',
      displayName: 'VEX Classic',
      description: 'Official VEX brand colors',
      primary: '#0066CC', // VEX Blue
      secondary: '#7B2CBF', // VEX Purple  
      accent: '#FF6B35', // VEX Orange
      preview: 'bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500'
    },
    {
      name: 'forest',
      displayName: 'Forest',
      description: 'Natural greens and earth tones',
      primary: '#16A34A', // Green-600
      secondary: '#059669', // Emerald-600
      accent: '#CA8A04', // Yellow-600
      preview: 'bg-gradient-to-r from-green-600 via-emerald-600 to-yellow-600'
    },
    {
      name: 'sunset',
      displayName: 'Sunset',
      description: 'Warm oranges and reds',
      primary: '#EA580C', // Orange-600
      secondary: '#DC2626', // Red-600
      accent: '#D97706', // Amber-600
      preview: 'bg-gradient-to-r from-orange-600 via-red-600 to-amber-600'
    },
    {
      name: 'ocean',
      displayName: 'Ocean',
      description: 'Cool blues and teals',
      primary: '#0891B2', // Cyan-600
      secondary: '#0284C7', // Sky-600
      accent: '#1D4ED8', // Blue-700
      preview: 'bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700'
    },
    {
      name: 'cosmic',
      displayName: 'Cosmic',
      description: 'Deep purples and magentas',
      primary: '#7C3AED', // Violet-600
      secondary: '#C026D3', // Fuchsia-600
      accent: '#EC4899', // Pink-500
      preview: 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500'
    },
    {
      name: 'midnight',
      displayName: 'Midnight',
      description: 'Dark theme with accent colors',
      primary: '#1E293B', // Slate-800
      secondary: '#374151', // Gray-700
      accent: '#6366F1', // Indigo-500
      preview: 'bg-gradient-to-r from-slate-800 via-gray-700 to-indigo-500'
    }
  ];

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('vex-color-theme') || 'default';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName: string) => {
    const theme = colorThemes.find(t => t.name === themeName);
    if (!theme) return;

    const root = document.documentElement;
    
    // Convert hex to HSL for CSS custom properties
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Apply theme colors to CSS custom properties
    root.style.setProperty('--vex-blue', theme.primary);
    root.style.setProperty('--vex-purple', theme.secondary);
    root.style.setProperty('--vex-orange', theme.accent);
    
    // For Tailwind CSS custom properties (if needed)
    root.style.setProperty('--color-vex-blue', hexToHsl(theme.primary));
    root.style.setProperty('--color-vex-purple', hexToHsl(theme.secondary));
    root.style.setProperty('--color-vex-orange', hexToHsl(theme.accent));
  };

  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
    localStorage.setItem('vex-color-theme', themeName);
  };

  const resetToDefault = () => {
    handleThemeChange('default');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            Customize Colors
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-sm text-slate-600">
            Choose a color theme to personalize your VEX AI Assistant experience. 
            Your selection will be saved automatically.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorThemes.map((theme) => (
              <Card 
                key={theme.name}
                className={`cursor-pointer transition-all duration-200 ${
                  currentTheme === theme.name 
                    ? 'ring-2 ring-blue-500 shadow-md' 
                    : 'hover:shadow-sm'
                }`}
                onClick={() => handleThemeChange(theme.name)}
              >
                <CardHeader className="pb-3">
                  <div className={`h-12 w-full rounded-lg ${theme.preview} mb-3`}></div>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {theme.displayName}
                    {currentTheme === theme.name && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-3">{theme.description}</p>
                  <div className="flex space-x-2">
                    <div 
                      className="w-6 h-6 rounded-full border border-slate-300"
                      style={{ backgroundColor: theme.primary }}
                      title="Primary Color"
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border border-slate-300"
                      style={{ backgroundColor: theme.secondary }}
                      title="Secondary Color"
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border border-slate-300"
                      style={{ backgroundColor: theme.accent }}
                      title="Accent Color"
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <Button 
              variant="outline" 
              onClick={resetToDefault}
              className="flex items-center"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
            
            <Button onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}