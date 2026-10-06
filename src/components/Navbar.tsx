import React from 'react';
import {
  Sparkles,
  Zap,
  Film,
  Calendar,
  Share2,
  BarChart3,
  CheckCircle2,
  Play,
  Flame,
  Radio,
} from 'lucide-react';
import { ConnectedChannel } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  autopilotEnabled: boolean;
  setAutopilotEnabled: (val: boolean) => void;
  connectedChannels: ConnectedChannel[];
  onQuickRunAutopilot: () => void;
  isGenerating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  autopilotEnabled,
  setAutopilotEnabled,
  connectedChannels,
  onQuickRunAutopilot,
  isGenerating,
}) => {
  const tabs = [
    { id: 'studio', label: 'AI Video Studio', icon: Film, badge: '9:16' },
    { id: 'trends', label: 'Viral Idea Hunter', icon: Flame, badge: 'AI' },
    { id: 'autopilot', label: 'Autopilot Engine', icon: Calendar, badge: autopilotEnabled ? '2x/Day' : 'Off' },
    { id: 'channels', label: 'Social Connectors', icon: Share2, badge: `${connectedChannels.length} Live` },
    { id: 'analytics', label: 'Analytics & SEO', icon: BarChart3, badge: '+94%' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner / Ticker */}
      <div className="bg-gradient-to-r from-red-950/80 via-purple-950/70 to-cyan-950/80 px-4 py-1.5 text-xs flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">
            Automated Multi-Platform Short Video Engine:
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Direct Publishing to YouTube Shorts & TikTok Active
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Next Scheduled Run:</span>
            <span className="text-purple-300 font-mono font-semibold">18:45 UTC (Evening Prime)</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5 text-yellow-400 font-medium">
            <Sparkles className="w-3 h-3" /> 100% Free Gemini AI Script & Audio
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
                ShortsPilot<span className="text-red-500">.ai</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                Auto-Pilot
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Viral Shorts & TikTok Auto-Creator & Publisher
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-md shadow-red-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="hidden lg:inline">{tab.label}</span>
                <span
                  className={`text-[9px] px-1 rounded font-mono ${
                    isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Autopilot Status & Quick Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Autopilot status toggle badge */}
          <button
            onClick={() => setAutopilotEnabled(!autopilotEnabled)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
              autopilotEnabled
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
            }`}
            title="Click to toggle automatic daily video posting"
          >
            <Radio className={`w-3.5 h-3.5 ${autopilotEnabled ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">
              {autopilotEnabled ? 'Autopilot: ON' : 'Autopilot: Paused'}
            </span>
          </button>

          {/* Quick Autopilot Run Button */}
          <button
            onClick={onQuickRunAutopilot}
            disabled={isGenerating}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 hover:from-red-500 via-purple-600 hover:via-purple-500 to-cyan-500 text-white flex items-center gap-1.5 shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>AI Cooking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Run Autopilot Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
