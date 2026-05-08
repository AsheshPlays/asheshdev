import { Distro, DistroStatus } from '../types';
import { 
  Play, 
  Square, 
  RotateCcw, 
  MoreVertical, 
  ExternalLink, 
  Trash2, 
  Copy, 
  Download,
  Plus,
  Cpu,
  Monitor,
  FolderOpen,
  X,
  ChevronRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { AVAILABLE_DISTROS } from '../constants';

interface DistroListProps {
  distros: Distro[];
  setDistros: React.Dispatch<React.SetStateAction<Distro[]>>;
  addLog: (message: string, type?: 'info' | 'error' | 'success') => void;
}

export default function DistroList({ distros, setDistros, addLog }: DistroListProps) {
  const [showWizard, setShowWizard] = useState(false);
  const [newDistro, setNewDistro] = useState({ id: '', path: 'C:\\WSL\\Instances\\' });

  const handleAction = (id: string, action: 'start' | 'stop' | 'restart') => {
    const distro = distros.find(d => d.id === id);
    if (!distro) return;

    addLog(`Initiating ${action} for ${distro.name}...`, 'info');
    
    setTimeout(() => {
      setDistros(prev => prev.map(d => {
        if (d.id === id) {
          let newStatus: DistroStatus = d.status;
          if (action === 'start') newStatus = 'Running';
          if (action === 'stop') newStatus = 'Stopped';
          return { ...d, status: newStatus, uptime: action === 'start' ? '0d 0h 0m' : undefined };
        }
        return d;
      }));
      addLog(`${distro.name} ${action}ed successfully.`, 'success');
    }, 1500);
  };

  const handleInstall = () => {
    const template = AVAILABLE_DISTROS.find(d => d.id === newDistro.id);
    if (!template) return;

    addLog(`Preparing installation for ${template.name}...`, 'info');
    addLog(`Allocation path: ${newDistro.path}${template.id}`, 'info');
    
    setShowWizard(false);
    
    setTimeout(() => {
      const installedDistro: Distro = {
        id: template.id + '-' + Date.now(),
        name: template.name,
        version: 2,
        status: 'Stopped',
        installPath: `${newDistro.path}${template.id}`,
        vram: '2GB',
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: '0GB / 128GB'
      };
      
      setDistros(prev => [...prev, installedDistro]);
      addLog(`${template.name} installed successfully.`, 'success');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Installed Distributions</h1>
          <p className="text-[#8D8D99]">Manage your active WSL instances.</p>
        </div>
        <button 
          onClick={() => setShowWizard(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Install New
        </button>
      </div>

      {/* Wizard Modal */}
      <AnimatePresence>
        {showWizard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWizard(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative glass-panel w-full max-w-xl shadow-2xl"
            >
              <div className="p-6 border-b border-[#2A2A2E] flex items-center justify-between">
                <h3 className="text-xl font-bold">New Distribution Wizard</h3>
                <button onClick={() => setShowWizard(false)} className="btn-ghost">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <label className="text-sm font-semibold text-[#8D8D99] block mb-2">Select Distribution</label>
                  <div className="grid grid-cols-2 gap-3">
                    {AVAILABLE_DISTROS.map(d => (
                      <button
                        key={d.id}
                        onClick={() => setNewDistro(prev => ({ ...prev, id: d.id }))}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                          newDistro.id === d.id 
                            ? "border-blue-500 bg-blue-500/10 text-blue-400" 
                            : "border-[#2A2A2E] bg-[#1A1A1E] text-[#8D8D99] hover:border-[#3B82F6]"
                        )}
                      >
                        <Server className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium">{d.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#8D8D99] block mb-2">Installation Directory</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newDistro.path}
                      onChange={(e) => setNewDistro(prev => ({ ...prev, path: e.target.value }))}
                      className="flex-1 bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button className="btn-secondary px-3">
                      <FolderOpen className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-[#3A3A40] mt-2">Recommended: Choose a non-system drive for large distributions.</p>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#8D8D99] leading-relaxed">
                    By installing, you agree to the distribution's license. The initial installation may take several minutes depending on your internet connection and system speed.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#1A1A1E]/50 border-t border-[#2A2A2E] flex justify-end gap-3">
                <button onClick={() => setShowWizard(false)} className="btn-secondary">Cancel</button>
                <button 
                  onClick={handleInstall}
                  disabled={!newDistro.id}
                  className="btn-primary"
                >
                  <Download className="w-4 h-4" />
                  Install Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {distros.map((distro, i) => (
          <motion.div
            key={distro.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel group relative flex flex-col md:flex-row md:items-center gap-6 p-6 hover:border-[#3B82F6]/50 transition-all"
          >
            {/* Thumbnail/Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1E] border border-[#2A2A2E] flex items-center justify-center shrink-0">
              <Monitor className={cn(
                "w-8 h-8",
                distro.status === 'Running' ? "text-blue-500" : "text-[#8D8D99]"
              )} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold truncate">{distro.name}</h3>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                  distro.version === 2 ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" : "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                )}>
                  WSL {distro.version}
                </span>
                <span className={cn(
                  "flex items-center gap-1.5 text-xs font-medium",
                  distro.status === 'Running' ? "text-green-500" : "text-[#8D8D99]"
                )}>
                  <span className={cn("w-2 h-2 rounded-full", distro.status === 'Running' ? "bg-green-500 animate-pulse" : "bg-[#3A3A40]")} />
                  {distro.status}
                </span>
              </div>
              
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#8D8D99]">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px]">{distro.installPath}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{distro.cpuUsage}% CPU / {distro.memoryUsage}% RAM ({distro.vram} allocated)</span>
                </div>
                {distro.uptime && (
                  <div className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5" />
                    <span>Up for {distro.uptime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pr-2">
              <div className="flex items-center bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg p-1">
                {distro.status === 'Stopped' ? (
                  <button 
                    onClick={() => handleAction(distro.id, 'start')}
                    className="p-2 hover:bg-blue-500/10 text-[#8D8D99] hover:text-blue-500 rounded transition-all" 
                    title="Start"
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                ) : (
                  <button 
                    onClick={() => handleAction(distro.id, 'stop')}
                    className="p-2 hover:bg-red-500/10 text-[#8D8D99] hover:text-red-500 rounded transition-all" 
                    title="Stop"
                  >
                    <Square className="w-5 h-5 fill-current" />
                  </button>
                )}
                <button 
                  onClick={() => handleAction(distro.id, 'restart')}
                  className="p-2 hover:bg-orange-500/10 text-[#8D8D99] hover:text-orange-500 rounded transition-all" 
                  title="Restart"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
              
              <div className="h-8 w-[1px] bg-[#2A2A2E] mx-1" />
              
              <button className="btn-ghost" title="Export">
                <Download className="w-5 h-5" />
              </button>
              <button className="btn-ghost" title="Clone">
                <Copy className="w-5 h-5" />
              </button>
              <button className="btn-ghost text-red-500/70 hover:text-red-500" title="Delete">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {distros.length === 0 && (
        <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#1A1A1E] rounded-full flex items-center justify-center mb-4">
            <Monitor className="w-8 h-8 text-[#3A3A40]" />
          </div>
          <h3 className="text-xl font-bold">No Distributions Found</h3>
          <p className="text-[#8D8D99] mt-2 max-w-sm">You haven't installed any WSL distributions yet. Get started by clicking the button above.</p>
        </div>
      )}
    </div>
  );
}
