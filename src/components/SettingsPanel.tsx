import { 
  Network, 
  Database, 
  RotateCcw, 
  Download, 
  Shield, 
  History, 
  Zap, 
  Copy, 
  FileBox,
  HardDrive,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function SettingsPanel({ addLog }: { addLog: (m: string, t?: 'info' | 'error' | 'success') => void }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateWSL = () => {
    setIsUpdating(true);
    addLog('Checking for WSL kernel updates...', 'info');
    setTimeout(() => {
      addLog('New kernel version found: 5.15.150.1', 'info');
      addLog('Updating WSL components...', 'info');
      setTimeout(() => {
        addLog('WSL updated to the latest version.', 'success');
        setIsUpdating(false);
      }, 2000);
    }, 1500);
  };

  const sections = [
    {
      title: 'Global Configuration',
      icon: Settings,
      items: [
        { label: 'Default Version', description: 'Set WSL 1 or WSL 2 as default for new installations', value: 'WSL 2', type: 'select', options: ['WSL 1', 'WSL 2'] },
        { label: 'Max Memory', description: 'Limit memory consumption across all instances', value: '50%', type: 'range' },
        { label: 'Processor Limit', description: 'Limit CPU cores available to WSL', value: '0 (No limit)', type: 'input' },
      ]
    },
    {
      title: 'Network & Proxy',
      icon: Network,
      items: [
        { label: 'DNS Settings', description: 'Configure custom DNS for all distributions', value: 'Auto', type: 'select', options: ['Auto', 'Manual (8.8.8.8)', 'System'] },
        { label: 'Proxy Mode', description: 'Inherit Windows proxy settings automatically', value: 'Enabled', type: 'toggle' },
      ]
    },
    {
      title: 'Maintenance',
      icon: RotateCcw,
      actions: [
        { label: 'Update WSL', description: 'Check for and install the latest WSL kernel and components', onClick: handleUpdateWSL, loading: isUpdating, icon: Download },
        { label: 'Export Environment', description: 'Create a full backup of your manager settings', icon: Copy },
        { label: 'Reset Manager', description: 'Restore all manager settings to default', icon: RotateCcw, danger: true },
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-[#8D8D99]">Configure global WSL behavior and maintain your environment.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, si) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="glass-panel"
          >
            <div className="p-4 border-b border-[#2A2A2E] bg-[#1A1A1E]/50">
              <h3 className="font-bold flex items-center gap-2">
                <section.icon className="w-5 h-5 text-blue-500" />
                {section.title}
              </h3>
            </div>
            
            <div className="divide-y divide-[#2A2A2E]">
              {section.items?.map((item, ii) => (
                <div key={item.label} className="p-6 flex items-center justify-between gap-8 group">
                  <div className="max-w-md">
                    <p className="font-medium group-hover:text-blue-400 transition-colors">{item.label}</p>
                    <p className="text-sm text-[#8D8D99] mt-1">{item.description}</p>
                  </div>
                  
                  <div className="shrink-0 flex items-center gap-4">
                    {item.type === 'select' && (
                      <select className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500">
                        {item.options?.map(o => <option key={o}>{o}</option>)}
                      </select>
                    )}
                    {item.type === 'range' && (
                      <div className="flex items-center gap-3">
                        <input type="range" className="accent-blue-500" />
                        <span className="text-sm font-mono">{item.value}</span>
                      </div>
                    )}
                    {item.type === 'input' && (
                      <input type="text" value={item.value} className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-blue-500" />
                    )}
                    {item.type === 'toggle' && (
                      <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {section.actions?.map((action, ai) => (
                <div key={action.label} className="p-6 flex items-center justify-between gap-8 group">
                  <div className="max-w-md">
                    <p className="font-medium">{action.label}</p>
                    <p className="text-sm text-[#8D8D99] mt-1">{action.description}</p>
                  </div>
                  <button 
                    onClick={action.onClick}
                    disabled={action.loading}
                    className={cn(
                      "btn-secondary whitespace-nowrap",
                      action.danger ? "hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50" : "hover:border-blue-500/50 hover:text-blue-400"
                    )}
                  >
                    {action.loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <action.icon className="w-4 h-4" />}
                    {action.label}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Advanced Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Copy className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h4 className="font-bold">Clone Distribution</h4>
            <p className="text-sm text-[#8D8D99] mt-1">Duplicate an existing distro with all its files and configuration intact.</p>
            <button className="mt-4 text-sm font-semibold text-purple-400 hover:text-purple-300">Start Cloning Tool ➜</button>
          </div>
        </div>
        
        <div className="glass-panel p-6 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Database className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-bold">Compact Disk</h4>
            <p className="text-sm text-[#8D8D99] mt-1">Reclaim unused disk space from sparse VHDX files of your distros.</p>
            <button className="mt-4 text-sm font-semibold text-cyan-400 hover:text-cyan-300">Run Optimizer ➜</button>
          </div>
        </div>
      </div>
    </div>
  );
}
