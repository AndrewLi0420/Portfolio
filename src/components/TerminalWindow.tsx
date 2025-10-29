import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Minimize2, Maximize2, X } from 'lucide-react';

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
}

export function TerminalWindow({ title, children }: TerminalWindowProps) {
  return (
    <div className="border border-[#3c3c3c] bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl">
      {/* Title bar */}
      <div className="bg-[#323233] px-4 py-2 flex items-center justify-between border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-[#9cdcfe]" />
          <span className="text-[#cccccc] text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[#cccccc] hover:bg-[#3c3c3c] p-1 rounded">
            <Minimize2 className="w-3 h-3" />
          </button>
          <button className="text-[#cccccc] hover:bg-[#3c3c3c] p-1 rounded">
            <Maximize2 className="w-3 h-3" />
          </button>
          <button className="text-[#cccccc] hover:bg-[#e81123] hover:text-white p-1 rounded">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
