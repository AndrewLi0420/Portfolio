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
  result: React.ReactNode;
}

interface InteractiveTerminalProps {
  tree: Record<string, DirNode>;
  files: Record<string, string>;
  promptUser?: string;
  onToggle?: () => void;
}

// Pixel grid rather than block glyphs -- block characters leave seams between rows.
const MASCOT = [
  '..########..',
  '.##########.',
  '.##.####.##.',
  '.##########.',
  '.##########.',
  '.#.#....#.#.',
];

function Mascot() {
  return (
    <div className="tp-claude-mascot">
      {MASCOT.map((row, y) =>
        row.split('').map((cell, x) => (
          <span key={`${y}-${x}`} className={cell === '#' ? 'tp-px tp-px--on' : 'tp-px'} />
        )),
      )}
    </div>
  );
}

function ClaudeBanner() {
  return (
    <div className="tp-claude">
      <div className="tp-claude-title">
        Claude Code <span className="tp-muted">v0.1.0</span>
      </div>

      <div className="tp-claude-left">
        <div className="tp-claude-welcome">Welcome to Andrew's terminal!</div>
        <Mascot />
        <div className="tp-claude-meta">
          Opus 5 · guest session
          <br />
          <span className="tp-claude-cwd">~/andrew-li</span>
        </div>
      </div>

      <div className="tp-claude-right">
        <div className="tp-claude-heading">Getting around</div>
        <div className="tp-claude-row">
          <span className="tp-claude-cmd">ls</span> lists what's here — <span className="tp-claude-cmd">ls about</span> peeks
          into a folder without moving
        </div>
        <div className="tp-claude-row">
          <span className="tp-claude-cmd">cd about</span> goes in, <span className="tp-claude-cmd">cd ..</span> goes back
          up, <span className="tp-claude-cmd">cd</span> alone returns home to ~
        </div>
        <div className="tp-claude-row">
          <span className="tp-claude-cmd">cat intro.txt</span> prints a file — paths work too, like{' '}
          <span className="tp-claude-cmd">cat about/intro.txt</span>
        </div>

        <div className="tp-claude-sep" />

        <div className="tp-claude-heading">Good to know</div>
        <div className="tp-claude-row">
          Anything ending in .txt is a file you can cat; everything else is a folder you can cd into
        </div>
        <div className="tp-claude-row">
          <span className="tp-claude-cmd">pwd</span> · <span className="tp-claude-cmd">tree</span> ·{' '}
          <span className="tp-claude-cmd">clear</span> · <span className="tp-claude-cmd">toggle</span> for the normal
          website
        </div>
        <div className="tp-claude-note">
          start with <span className="tp-claude-cmd">ls</span>, and cat contact.txt to reach the human
        </div>
      </div>
    </div>
  );
}

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

  const run = (raw: string): React.ReactNode => {
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
        return <ClaudeBanner />;

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
          {entry.result &&
            (typeof entry.result === 'string' ? (
              <div className="tp-cli-output">{linkify(entry.result)}</div>
            ) : (
              entry.result
            ))}
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
