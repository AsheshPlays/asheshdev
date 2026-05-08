import { Distro, AppInstallation } from '../types';
import { 
  Plus, 
  Activity, 
  Cpu, 
  Database, 
  ChevronRight, 
  ArrowUpRight,
  Monitor,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';

const MOCK_USAGE_DATA = [
  { time: '00:00', cpu: 12, mem: 45 },
  { time: '04:00', cpu: 18, mem: 48 },
  { time: '08:00', cpu: 45, mem: 62 },
  { time: '12:00', cpu: 32, mem: 58 },
  { time: '16:00', cpu: 65, mem: 72 },
  { time: '20:00', cpu: 22, mem: 55 },
  { time: '23:59', cpu: 15, mem: 42 },
];

export default function Dashboard({ distros, apps }: { distros: Distro[], apps: AppInstallation[] }) {
  const activeDistros = distros.filter(d => d.status === 'Running').length;
  const installedApps = apps.filter(a => a.status === 'Installed').length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-[#8D8D99] mt-1">Real-time status of your WSL distributions and environment.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Activity className="w-4 h-4" />
            Check Updates
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            New Distro
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Distros', value: activeDistros, total: distros.length, icon: Monitor, color: 'text-blue-500' },
          { label: 'Installed Apps', value: installedApps, total: apps.length, icon: CheckCircle2, color: 'text-green-500' },
          { label: 'Avg CPU Load', value: '24%', total: '100%', icon: Cpu, color: 'text-purple-500' },
          { label: 'Disk Usage', value: '48.2GB', total: '256GB', icon: Database, color: 'text-orange-500' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-start justify-between">
              <div className={cn("p-2 rounded-lg bg-opacity-10", stat.color.replace('text', 'bg'))}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <span className="text-xs text-[#8D8D99] flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-green-500" />
                +2.4%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-[#8D8D99]">{stat.label}</span>
                <span className="text-xs text-[#8D8D99]">of {stat.total}</span>
              </div>
            </div>
            <div className="mt-4 w-full bg-[#1A1A1E] h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: typeof stat.value === 'number' ? `${(stat.value / stat.total) * 100}%` : stat.value }}
                className={cn("h-full", stat.color.replace('text', 'bg'))}
              />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Stats Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Chart */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold">Resource Utilization</h3>
              <p className="text-sm text-[#8D8D99]">Combined performance analytics</p>
            </div>
            <select className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-md px-3 py-1.5 text-xs focus:outline-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_USAGE_DATA}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" vertical={false} />
                <XAxis dataKey="time" stroke="#8D8D99" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8D8D99" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1E', border: '1px solid #2A2A2E', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="mem" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorMem)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick List */}
        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Running Distros</h3>
          <div className="flex-1 space-y-4">
            {distros.filter(d => d.status === 'Running').map((distro) => (
              <div key={distro.id} className="flex items-center gap-4 p-3 rounded-lg bg-[#1A1A1E] border border-[#2A2A2E] hover:border-[#3B82F6] transition-all group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Monitor className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{distro.name}</p>
                  <p className="text-xs text-[#8D8D99] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Up {distro.uptime}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8D8D99] group-hover:text-blue-500 transition-all" />
              </div>
            ))}
          </div>
          <button className="mt-6 text-sm text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1 justify-center">
            View all distributions
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

import { cn } from '../lib/utils';
