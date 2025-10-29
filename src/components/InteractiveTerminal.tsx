import { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: React.ReactNode;
}

interface InteractiveTerminalProps {
  welcomeMessage: React.ReactNode;
  commands: Record<string, React.ReactNode>;
}

export function InteractiveTerminal({ welcomeMessage, commands }: InteractiveTerminalProps) {
  const [history, setHistory] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    let output: React.ReactNode;

    if (trimmedInput === '') {
      return;
    }

    if (trimmedInput === 'clear') {
      setHistory([]);
      setCurrentInput('');
      return;
    }

    if (trimmedInput === 'help') {
      output = (
        <div className="text-[#cccccc]">
          <div className="mb-2">Available commands:</div>
          {Object.keys(commands).map((cmd) => (
            <div key={cmd} className="ml-4 text-[#9cdcfe]">• {cmd}</div>
          ))}
          <div className="ml-4 text-[#9cdcfe]">• help - Show this message</div>
          <div className="ml-4 text-[#9cdcfe]">• clear - Clear terminal</div>
        </div>
      );
    } else if (commands[trimmedInput]) {
      output = commands[trimmedInput];
    } else {
      output = (
        <div className="text-[#f48771]">
          Command not found: {trimmedInput}. Type 'help' for available commands.
        </div>
      );
    }

    setHistory([...history, { input, output }]);
    setCurrentInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex].input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex].input);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={terminalRef}
      className="h-[500px] overflow-y-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-4">{welcomeMessage}</div>
      
      {history.map((cmd, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#4ec9b0]">➜</span>
            <span className="text-[#569cd6]">~</span>
            <span className="text-[#cccccc]">{cmd.input}</span>
          </div>
          <div className="mt-2 ml-6">{cmd.output}</div>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <span className="text-[#4ec9b0]">➜</span>
        <span className="text-[#569cd6]">~</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-[#cccccc] caret-[#cccccc]"
          autoFocus
        />
      </div>
    </div>
  );
}
