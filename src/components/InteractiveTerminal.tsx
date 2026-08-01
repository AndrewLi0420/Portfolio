import { useState, useRef, useEffect } from 'react';

export interface DirNode {
  parent: string | null;
  children: string[];
}

interface HistoryEntry {
  id: number;
  user: string;
  directory: string;
  command: string;
  result: string;
}

interface InteractiveTerminalProps {
  tree: Record<string, DirNode>;
  files: Record<string, string>;
  promptUser?: string;
  onToggle?: () => void;
}

const CLAUDE_HELP = `Hey, I'm Claude. Andrew asked me to stick around and help anyone who wanders in here.

This is a fake shell, but it works like a real one. You're standing in a directory (see the blue bit in your prompt) and there are files and folders around you.

Three commands get you everywhere:
  ls    lists what's in the current directory. \`ls\` on its own, or \`ls about\` to peek inside a folder without moving.
  cd    changes directory. \`cd about\` to go in, \`cd ..\` to go back up, \`cd\` on its own to jump home to ~.
  cat   prints a file. \`cat about/intro.txt\`, or \`cd about\` first and then just \`cat intro.txt\`.

Anything ending in .txt is a file you can cat. Anything else is a folder you can cd into.

A few extras: \`pwd\` tells you where you are, \`clear\` wipes the screen, \`tree\` prints the whole layout at once if you'd rather skip the exploring, and \`toggle\` bails out to the normal website.

Try \`ls\` and follow your curiosity. Andrew's contact info is in contact.txt if you want to reach the human.`;

const URL_PATTERN = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;

function linkify(text: string) {
  return text.split(URL_PATTERN).map((part, i) => {
    if (part.match(URL_PATTERN)) {
      const href = part.startsWith('http') ? part : `mailto:${part}`;
      return (
        <a key={i} className="tp-link" href={href} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
}

export function InteractiveTerminal({
  tree,
  files,
  promptUser = 'guest@andrewli',
  onToggle,
}: InteractiveTerminalProps) {
  const [input, setInput] = useState('');
  const [dir, setDir] = useState('~');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Walk a slash-separated path from `from`, returning where we landed.
  const resolvePath = (from: string, parts: string[], cmd: string) => {
    let current = from;
    for (const part of parts) {
      if (part === '.' || part === '') continue;
      if (part === '..') {
        const parent = tree[current].parent;
        if (!parent) break;
        current = parent;
      } else if (part === '~') {
        current = '~';
      } else if (part.includes('.')) {
        return { dir: current, warning: `${cmd}: not a directory: ${part}`, ok: false };
      } else if (tree[current].children.includes(part)) {
        current = part;
      } else {
        return { dir: current, warning: `${cmd}: no such file or directory: ${part}`, ok: false };
      }
    }
    return { dir: current, warning: '', ok: true };
  };

  const listDir = (name: string) => tree[name].children.join('\n');

  const printTree = (name: string, prefix = ''): string => {
    const children = tree[name].children;
    return children
      .map((child, i) => {
        const last = i === children.length - 1;
        const branch = `${prefix}${last ? '└── ' : '├── '}${child}`;
        if (tree[child]) {
          return `${branch}\n${printTree(child, `${prefix}${last ? '    ' : '│   '}`)}`;
        }
        return branch;
      })
      .join('\n');
  };

  const run = (raw: string): string => {
    const [cmd, ...args] = raw.trim().split(/\s+/);

    switch (cmd) {
      case 'ls': {
        if (args.length === 0) return listDir(dir);
        return args
          .map((arg) => {
            const { dir: target, warning, ok } = resolvePath(dir, arg.split('/'), 'ls');
            if (!ok) return warning;
            return args.length > 1 ? `${target}:\n${listDir(target)}` : listDir(target);
          })
          .join('\n\n');
      }

      case 'cd': {
        if (args.length === 0) {
          setDir('~');
          return '';
        }
        if (args.length > 1) return 'cd: too many arguments';
        const { dir: target, warning, ok } = resolvePath(dir, args[0].split('/'), 'cd');
        if (ok) setDir(target);
        return warning;
      }

      case 'cat': {
        if (args.length === 0) return 'cat: missing file operand';
        return args
          .map((arg) => {
            const parts = arg.split('/');
            const name = parts.pop() as string;
            const { dir: target, warning, ok } = resolvePath(dir, parts, 'cat');
            if (!ok) return warning;
            if (!tree[target].children.includes(name)) {
              // The file may well exist one directory over -- say where.
              const home = Object.keys(tree).find((d) => tree[d].children.includes(name));
              const hint = home && home !== target ? ` (try \`cat ${home}/${name}\`)` : '';
              return `cat: ${name}: No such file or directory${hint}`;
            }
            if (!name.includes('.')) return `cat: ${name}: Is a directory`;
            return files[name] ?? `cat: ${name}: No such file or directory`;
          })
          .join('\n\n');
      }

      case 'tree':
        return `~\n${printTree('~')}`;

      case 'pwd':
        return dir === '~' ? '~' : `~/${dir}`;

      case 'claude':
      case 'help':
        return CLAUDE_HELP;

      case 'toggle':
        onToggle?.();
        return '';

      default:
        return `zsh: command not found: ${cmd}\nStuck? Type \`claude\``;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim() === '') return;
      if (input.trim() === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
      const result = run(input);
      setHistory((prev) => [
        ...prev,
        { id: prev.length, user: 'guest', directory: dir, command: input, result },
      ]);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const next = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(next);
        setInput(history[history.length - 1 - next].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(history[history.length - 1 - next].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [history]);

  return (
    <div ref={terminalRef} className="tp-cli-body" onClick={() => inputRef.current?.focus()}>
      {history.map((entry) => (
        <div key={entry.id} className="tp-cli-entry">
          <div className="flex items-center gap-2">
            <span className="tp-prompt-user">{promptUser}</span>
            <span className="tp-prompt-tilde">{entry.directory}</span>
            <span className="tp-prompt-symbol">%</span>
            <span>{entry.command}</span>
          </div>
          {entry.result && (
            <div className="tp-cli-output">{linkify(entry.result)}</div>
          )}
        </div>
      ))}

      <div className="flex items-center gap-2">
        <span className="tp-prompt-user">{promptUser}</span>
        <span className="tp-prompt-tilde">{dir}</span>
        <span className="tp-prompt-symbol">%</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="tp-cli-input"
          spellCheck={false}
          autoFocus
        />
      </div>
    </div>
  );
}
