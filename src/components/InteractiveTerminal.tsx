import { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: React.ReactNode;
}

interface InteractiveTerminalProps {
  welcomeMessage?: React.ReactNode;
  commands: Record<string, React.ReactNode>;
  promptUser?: string;
}

export function InteractiveTerminal({ welcomeMessage, commands, promptUser = 'guest@andrewli' }: InteractiveTerminalProps) {
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
        <div className="tp-cli-accent">
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
      className="tp-cli-body"
      onClick={() => inputRef.current?.focus()}
    >
      {welcomeMessage && <div className="mb-4">{welcomeMessage}</div>}

      {history.map((cmd, index) => (
        <div key={index}>
          <div className="flex items-center gap-2">
            <span className="tp-prompt-user">{promptUser}</span>
            <span className="tp-prompt-tilde">~</span>
            <span className="tp-prompt-symbol">%</span>
            <span>{cmd.input}</span>
          </div>
          <div>{cmd.output}</div>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <span className="tp-prompt-user">{promptUser}</span>
        <span className="tp-prompt-tilde">~</span>
        <span className="tp-prompt-symbol">%</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="tp-cli-input"
          autoFocus
        />
      </div>
    </div>
  );
}
