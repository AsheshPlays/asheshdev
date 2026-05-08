import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTerminalOutput(text: string) {
  return text.split('\n').map((line, i) => ({
    id: i,
    content: line,
    timestamp: new Date().toLocaleTimeString()
  }));
}
