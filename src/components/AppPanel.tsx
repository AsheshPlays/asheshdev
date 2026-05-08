import { AppInstallation } from '../types';
import { 
  Globe, 
  Waves, 
  Download, 
  CheckCircle2, 
  Clock, 
  Terminal as TerminalIcon, 
  ExternalLink,
  ShieldCheck,
  FileCode,
  Box
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface AppPanelProps {
  apps: AppInstallation[];
  setApps: React.Dispatch<React.SetStateAction<AppInstallation[]>>;
  addLog: (message: string, type?: 'info' | 'error' | 'success') => void;
}

export default function AppPanel({ apps, setApps, addLog }: AppPanelProps) {
  const [installingId, setInstallingId] = useState<string | null>(null);

  const installWindsurf = async () => {
    setInstallingId('windsurf');
    addLog('Starting Windsurf installation...', 'info');
    
    const steps = [
      { msg: 'Installing prerequisites: wget, gpg...', cmd: 'sudo apt-get install wget gpg -y' },
      { msg: 'Downloading GPG key...', cmd: 'wget -qO- "https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/windsurf.gpg" | gpg --dearmor > windsurf-stable.gpg' },
      { msg: 'Installing keyrings...', cmd: 'sudo install -D -o root -g root -m 644 windsurf-stable.gpg /etc/apt/keyrings/windsurf-stable.gpg' },
      { msg: 'Adding repository to sources.list.d...', cmd: 'echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/windsurf-stable.gpg] https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt stable main" | sudo tee /etc/apt/sources.list.d/windsurf.list > /dev/null' },
      { msg: 'Cleaning up temporary files...', cmd: 'rm -f windsurf-stable.gpg' },
      { msg: 'Updating package lists...', cmd: 'sudo apt install apt-transport-https -y && sudo apt update' },
      { msg: 'Installing Windsurf IDE...', cmd: 'sudo apt install windsurf -y' }
    ];

    for (const step of steps) {
      addLog(`[EXEC] ${step.cmd}`, 'info');
      addLog(step.msg, 'info');
      await new Promise(r => setTimeout(r, 1000));
    }

    setApps(prev => prev.map(a => a.id === 'windsurf' ? { ...a, status: 'Installed' } : a));
    setInstallingId(null);
    addLog('Windsurf installed successfully!', 'success');
  };

  const installFirefox = async () => {
    setInstallingId('firefox-esr');
    addLog('Starting Firefox ESR installation...', 'info');
    
    const steps = [
      { msg: 'Adding Firefox PPA...', cmd: 'sudo add-apt-repository ppa:mozillateam/ppa -y' },
      { msg: 'Setting package priority...', cmd: 'echo "Package: *\nPin: release o=LP-PPA-mozillateam\nPin-Priority: 1001" | sudo tee /etc/apt/preferences.d/mozilla-firefox' },
      { msg: 'Updating package lists...', cmd: 'sudo apt update' },
      { msg: 'Installing Firefox ESR...', cmd: 'sudo apt install firefox-esr -y' }
    ];

    for (const step of steps) {
      addLog(`[EXEC] ${step.cmd}`, 'info');
      addLog(step.msg, 'info');
      await new Promise(r => setTimeout(r, 1200));
    }

    setApps(prev => prev.map(a => a.id === 'firefox-esr' ? { ...a, status: 'Installed' } : a));
    setInstallingId(null);
    addLog('Firefox ESR installed successfully!', 'success');
  };

  const handleInstall = (id: string) => {
    if (id === 'windsurf') installWindsurf();
    if (id === 'firefox-esr') installFirefox();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Application Center</h1>
        <p className="text-[#8D8D99]">Install and manage optimized Linux applications for your WSL environment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app, i) => {
          const Icon = app.id === 'windsurf' ? Waves : Globe;
          const isInstalling = installingId === app.id;
          
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel group p-6 flex flex-col h-full"
            >
              <div className="flex items-start justify-between">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center border",
                  app.id === 'windsurf' ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-orange-500/10 border-orange-500/20 text-orange-400"
                )}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
                    app.status === 'Installed' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-[#1A1A1E] text-[#8D8D99] border-[#2A2A2E]"
                  )}>
                    {app.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex-1">
                <h3 className="text-xl font-bold">{app.name}</h3>
                <p className="text-sm text-[#8D8D99] mt-2 leading-relaxed">
                  {app.description}
                </p>
                
                {app.id === 'windsurf' && (
                  <div className="mt-4 p-3 rounded-lg bg-[#1A1A1E] border border-[#2A2A2E] flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-xs font-semibold">Agentic IDE</p>
                      <p className="text-[10px] text-[#8D8D99]">Powered by Codeium Intelligence</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center gap-3">
                {app.status === 'Installed' ? (
                  <>
                    <button className="btn-primary flex-1">
                      <ExternalLink className="w-4 h-4" />
                      Launch
                    </button>
                    <button className="btn-secondary">
                      <FileCode className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleInstall(app.id)}
                    disabled={isInstalling}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isInstalling ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        Installing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Install App
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Suggest App */}
        <div className="glass-panel p-6 border-dashed border-[#2A2A2E] flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:bg-white/5 transition-all">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1E] flex items-center justify-center">
            <Box className="w-6 h-6 text-[#3A3A40]" />
          </div>
          <div>
            <h4 className="font-bold">Missing something?</h4>
            <p className="text-xs text-[#8D8D99] mt-1">Suggest an app or add a custom script</p>
          </div>
          <button className="text-sm font-semibold text-blue-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Request Application
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
