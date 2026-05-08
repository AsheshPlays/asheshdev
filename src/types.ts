export type DistroStatus = 'Running' | 'Stopped' | 'Installing' | 'Updating';

export interface Distro {
  id: string;
  name: string;
  version: 1 | 2;
  status: DistroStatus;
  installPath: string;
  vram: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: string;
  uptime?: string;
}

export interface AppInstallation {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'Not Installed' | 'Installing' | 'Installed' | 'Error';
  type: 'system' | 'user';
}

export type ViewState = 'Dashboard' | 'Distros' | 'Apps' | 'Settings' | 'About';
