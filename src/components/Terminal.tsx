import { X, ChevronDown, Terminal as TerminalIcon, ShieldCheck, Download, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';

interface LogEntry {
  message: string;
  type: 'info' | 'error' | 'success';
}

export default function Terminal({
  isOpen,
  onClose,
  logs
}: {
  isOpen: boolean;
  onClose: () => void;
  logs: LogEntry[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="absolute bottom-0 left-0 right-0 h-80 bg-[#0D0D10] border-t border-[#2A2A2E] z-50 flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-10 bg-[#1A1A1E] border-b border-[#2A2A2E]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-green-500" />
                <span className="text-xs font-mono font-bold tracking-wider text-green-500">SYSTEM TERMINAL</span>
              </div>
              <div className="h-3 w-[1px] bg-[#2A2A2E]" />
              <div className="flex items-center gap-3 text-[10px] font-mono text-[#8D8D99]">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SECURE</span>
                <span className="flex items-center gap-1"><Download className="w-3 h-3" /> ACTIVE</span>
                <span className="flex items-center gap-1"><Server className="w-3 h-3" /> WSL-CORE</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={onClose}
                className="hover:bg-white/10 p-1 rounded transition-all"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button 
                onClick={onClose}
                className="hover:bg-red-500/20 p-1 rounded text-red-500 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar"
          >
            {logs.length === 0 ? (
              <div className="text-[#3A3A40] italic">No active operations...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="mb-1 flex gap-2">
                  <span className="text-[#3A3A40] shrink-0">[{new Date().toLocaleTimeString()}]</span>
                  <span className={cn(
                    "shrink-0",
                    log.type === 'info' && "text-blue-400",
                    log.type === 'error' && "text-red-400",
                    log.type === 'success' && "text-green-400"
                  )}>
                    {log.type === 'info' ? '➜' : log.type === 'error' ? '✖' : '✔'}
                  </span>
                  <span className={cn(
                    "break-all",
                    log.type === 'info' && "text-[#E1E1E6]",
                    log.type === 'error' && "text-red-400/80",
                    log.type === 'success' && "text-green-400/80"
                  )}>
                    {log.message}
                  </span>
                </div>
              ))
            )}
            <div className="flex gap-2">
              <span className="text-green-500">zWSL:~$</span>
              <span className="animate-pulse w-2 h-4 bg-green-500/50 mt-1" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { cn } from '../lib/utils';
