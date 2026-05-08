import { 
  Github, 
  Twitter, 
  Globe, 
  Mail, 
  Heart, 
  Code2, 
  Terminal as TerminalIcon,
  BookOpen,
  ArrowRight,
  User,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="max-w-4xl space-y-12 pb-12">
      {/* Hero */}
      <section className="text-center py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-8"
        >
          <TerminalIcon className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">zWSL Manager</h1>
        <p className="text-xl text-[#8D8D99] max-w-2xl mx-auto leading-relaxed">
          The ultimate control center for your Windows Subsystem for Linux environment. Built for power users and developers.
        </p>
      </section>

      {/* Guide Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Local Installation Guide
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="glass-panel p-6 border-l-4 border-blue-500">
            <h3 className="font-bold flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">1</div>
              Download & Prepare
            </h3>
            <p className="text-sm text-[#8D8D99] mt-2">
              Export this project to ZIP from the AI Studio menu. Extract it to a folder like <code className="bg-[#1A1A1E] px-1 rounded">C:\zWSL-Manager</code>.
            </p>
          </div>
          <div className="glass-panel p-6 border-l-4 border-purple-500">
            <h3 className="font-bold flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">2</div>
              Install Dependencies
            </h3>
            <p className="text-sm text-[#8D8D99] mt-2">
              Open PowerShell in that folder and run <code className="bg-[#1A1A1E] px-1 rounded text-blue-400">npm install</code>. This installs the management server and visual engine.
            </p>
          </div>
          <div className="glass-panel p-6 border-l-4 border-green-500">
            <h3 className="font-bold flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">3</div>
              Launch Dashboard
            </h3>
            <p className="text-sm text-[#8D8D99] mt-2">
              Run <code className="bg-[#1A1A1E] px-1 rounded text-green-400">npm run dev</code>. Open <code className="text-blue-400">http://localhost:3000</code> in your browser.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Globe className="w-6 h-6 text-blue-500" />
          Production Deployment
        </h2>
        
        <div className="glass-panel p-8 flex flex-col items-center text-center bg-gradient-to-br from-[#121214] to-[#1A1A1E]">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
            <Globe className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold">zWSL Manager Portal Engine</h3>
          <p className="text-[#8D8D99] mt-2 max-w-lg">
            We've generated a high-end, GitHub-ready portal system. You can host these files to give your users a premium installation experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-sm">
            <button 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={() => window.open('/portal.html', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Live Preview
            </button>
            <button 
              className="px-4 py-2 bg-[#1A1A1E] hover:bg-[#252529] text-white border border-[#2A2A2E] rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={() => {
                alert("Assets Ready:\n1. portal.html (The Hub)\n2. portal.css (Styles)\n3. portal.js (Scripts)\n4. install.ps1 (The Installer)");
              }}
            >
              <FileCode className="w-4 h-4" />
              View Assets
            </button>
          </div>
        </div>
      </section>

      {/* Feature Guide */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Feature Guide
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6">
            <h3 className="font-bold text-blue-400">1. Install a Distro</h3>
            <p className="text-sm text-[#8D8D99] mt-2 leading-relaxed">
              Navigate to the "Distros" tab and click "Install New". You can choose from official images like Ubuntu, Debian, or Kali. You can even specify a custom installation path to save space on your primary drive.
            </p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="font-bold text-green-400">2. Optimize Environment</h3>
            <p className="text-sm text-[#8D8D99] mt-2 leading-relaxed">
              Use the "Settings" tab to configure global resource limits like RAM and CPU usage. This prevents WSL from taking up too many host resources during heavy compilations.
            </p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="font-bold text-cyan-400">3. Rapid App Deployment</h3>
            <p className="text-sm text-[#8D8D99] mt-2 leading-relaxed">
              The "Apps" tab provides one-click installations for essential tools. Whether it's Firefox for GUI testing or the powerful Windsurf IDE, we handle the complex setup scripts for you.
            </p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="font-bold text-purple-400">4. Instance Management</h3>
            <p className="text-sm text-[#8D8D99] mt-2 leading-relaxed">
              Stop, Restart, or Clone your instances with simple controls. Use the Export feature to take snapshots of your environment before making risky changes.
            </p>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="glass-panel p-8 bg-gradient-to-br from-[#121214] to-[#1A1A1E]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-32 h-32 bg-[#1A1A1E] rounded-full flex items-center justify-center border border-[#2A2A2E] overflow-hidden">
               <User className="w-16 h-16 text-[#3A3A40]" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">Ashesh Development</h2>
            <p className="text-[#8D8D99] mt-2 leading-relaxed">
              Passionate developer specializing in system tools, automation, and Linux environments. zWSL Manager was created to bridge the gap between Windows and Linux workflows seamlessly.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <a href="#" className="btn-secondary py-2 px-3 text-sm">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href="#" className="btn-secondary py-2 px-3 text-sm">
                <Twitter className="w-4 h-4" />
                @AsheshDev
              </a>
              <a href="#" className="btn-secondary py-2 px-3 text-sm">
                <Globe className="w-4 h-4" />
                Portfolio
              </a>
              <a href="mailto:contact@ashesh.dev" className="btn-secondary py-2 px-3 text-sm">
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 border-t border-[#2A2A2E] text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-[#8D8D99]">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>by Ashesh Development</span>
        </div>
        <p className="text-xs text-[#3A3A40]">
          © 2024 zWSL Manager. Internal Build v2.4.0-stable.
          <br />
          WSL is a trademark of Microsoft Corporation.
        </p>
      </footer>
    </div>
  );
}
