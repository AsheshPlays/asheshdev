/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  LayoutDashboard, 
  Grid2X2, 
  Package, 
  Settings, 
  Info, 
  Search, 
  Bell, 
  Cpu, 
  HardDrive, 
  Activity,
  Menu,
  X,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewState, Distro, AppInstallation } from './types';
import { INITIAL_DISTROS, APPS } from './constants';
import { cn } from './lib/utils';

// View Components
import Dashboard from './components/Dashboard';
import DistroList from './components/DistroList';
import AppPanel from './components/AppPanel';
import SettingsPanel from './components/SettingsPanel';
import About from './components/About';
import Terminal from './components/Terminal';

export default function App() {
  const [activeView, setActiveView] = useState<ViewState>('Dashboard');
  const [distros, setDistros] = useState<Distro[]>(INITIAL_DISTROS);
  const [apps, setApps] = useState<AppInstallation[]>(APPS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<{message: string, type: 'info' | 'error' | 'success'}[]>([]);

  // Real-time status update simulation or actual fetch if local
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/wsl/list');
        if (res.ok) {
           // If we're local, we could parse the actual output here
           // For now, we continue using the UI state but log the connection
        }
      } catch (e) {
        // Silently fail if not running on local server (e.g. in AI Studio Preview)
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setTerminalLogs(prev => [...prev, { message, type }]);
    if (!showTerminal) setShowTerminal(true);
  };

  const navItems = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'Distros', icon: Grid2X2, label: 'Distros' },
    { id: 'Apps', icon: Package, label: 'Apps' },
    { id: 'Settings', icon: Settings, label: 'Settings' },
    { id: 'About', icon: Info, label: 'About' },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0B] text-[#E1E1E6] font-sans selection:bg-blue-500/30">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        className="border-r border-[#2A2A2E] bg-[#121214] flex flex-col z-20"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <TerminalIcon className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg tracking-tight"
            >
              zWSL Manager
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewState)}
                className={cn(
                  "sidebar-link w-full",
                  isActive && "sidebar-link-active"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-blue-400" : "text-[#8D8D99]")} />
                {isSidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2A2A2E]">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#8D8D99] hover:text-[#E1E1E6] transition-all"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            {isSidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 border-bottom border-[#2A2A2E] bg-[#121214]/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-xl font-semibold">{activeView}</h2>
            <div className="h-4 w-[1px] bg-[#2A2A2E]" />
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D8D99]" />
              <input 
                type="text" 
                placeholder="Search distros, apps..." 
                className="w-full bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-ghost relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#121214]" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#2A2A2E]">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Ashesh Development</p>
                <p className="text-xs text-[#8D8D99]">System Administrator</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* View Port */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              {activeView === 'Dashboard' && <Dashboard distros={distros} apps={apps} />}
              {activeView === 'Distros' && <DistroList distros={distros} setDistros={setDistros} addLog={addLog} />}
              {activeView === 'Apps' && <AppPanel apps={apps} setApps={setApps} addLog={addLog} />}
              {activeView === 'Settings' && <SettingsPanel addLog={addLog} />}
              {activeView === 'About' && <About />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Terminal Overlay */}
        <Terminal 
          isOpen={showTerminal} 
          onClose={() => setShowTerminal(false)} 
          logs={terminalLogs} 
        />
      </main>
    </div>
  );
}
