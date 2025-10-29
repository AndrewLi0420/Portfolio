import { useState, useEffect } from 'react';

interface TerminalCommandProps {
  command: string;
  delay?: number;
}

export function TerminalCommand({ command, delay = 0 }: TerminalCommandProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= command.length) {
          setDisplayText(command.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [command, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[#4ec9b0]">➜</span>
      <span className="text-[#569cd6]">~</span>
      <span className="text-[#cccccc]">{displayText}</span>
      {displayText.length === command.length && (
        <span className={`inline-block w-2 h-4 bg-[#cccccc] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </div>
  );
}
