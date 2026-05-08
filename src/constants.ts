import { Distro, AppInstallation } from './types';

export const INITIAL_DISTROS: Distro[] = [
  {
    id: 'ubuntu-22.04',
    name: 'Ubuntu 22.04 LTS',
    version: 2,
    status: 'Running',
    installPath: 'C:\\WSL\\Instances\\Ubuntu-22.04',
    vram: '2GB',
    cpuUsage: 12,
    memoryUsage: 45,
    diskUsage: '15.4GB / 256GB',
    uptime: '2d 4h 12m'
  },
  {
    id: 'debian',
    name: 'Debian GNU/Linux',
    version: 2,
    status: 'Stopped',
    installPath: 'C:\\WSL\\Instances\\Debian',
    vram: '1GB',
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: '2.1GB / 64GB'
  },
  {
    id: 'kali',
    name: 'Kali Linux',
    version: 2,
    status: 'Running',
    installPath: 'C:\\WSL\\Instances\\Kali',
    vram: '4GB',
    cpuUsage: 8,
    memoryUsage: 62,
    diskUsage: '32.8GB / 128GB',
    uptime: '0d 1h 45m'
  }
];

export const AVAILABLE_DISTROS = [
  { id: 'ubuntu-24.04', name: 'Ubuntu 24.04 LTS', official: true },
  { id: 'ubuntu-22.04', name: 'Ubuntu 22.04 LTS', official: true },
  { id: 'debian-12', name: 'Debian 12 "Bookworm"', official: true },
  { id: 'kali-linux', name: 'Kali Linux', official: true },
  { id: 'fedora-40', name: 'Fedora Remix 40', official: false },
  { id: 'alpine', name: 'Alpine Linux', official: true },
  { id: 'arch', name: 'Arch Linux', official: false },
];

export const APPS: AppInstallation[] = [
  {
    id: 'firefox-esr',
    name: 'Firefox ESR',
    icon: 'Globe',
    description: 'Enterprise Stable Release of the Firefox web browser.',
    status: 'Installed',
    type: 'user'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    icon: 'Waves',
    description: 'The first agentic IDE, by Codeium.',
    status: 'Not Installed',
    type: 'user'
  }
];
