import React, { useState, useEffect, useRef } from 'react';
import HeaderBar from './components/HeaderBar';
import KeyboardToolbar from './components/KeyboardToolbar';
import EditorView from './components/EditorView';
import TerminalView from './components/TerminalView';
import FilesView from './components/FilesView';
import DocsView from './components/DocsView';
import VsSharpView from './components/VsSharpView';
import BottomNav from './components/BottomNav';
import { executeVerScriptAsync } from './engine/verscript_engine';

const DEFAULT_TEMPLATES = {
  circle: `! VerScript Mobile Demo: Geometry & Formatted Colors
set radius: 5
set piVal: 3.14159
set area: piVal * (radius ^ 2)

display "==== VerScript Studio Mobile ====" ?color=#38bdf8
display "Calculated Circle Area:" ?color=cyan ?inline
display " " + area ?color=#10b981
display "Running 100% offline on Android!" ?color=#c084fc`,

  math: `! VerScript Mobile: Matrix Operations
load Matrix
load Math

display "=== Matrix Determinant Demo ===" ?color=#38bdf8
set I: Matrix.identity 3
display "Identity 3x3:" ?color=cyan
display I

set det: Matrix.det I
display "Determinant of I: " + det ?color=green`,

  primes: `! VerScript Mobile: Prime Number Sieve
set count: 0
set limit: 20

display "Prime numbers up to " + limit + ":" ?color=#f59e0b

iterate n from 2 to limit:
  set isPrime: 1
  set maxD: n - 1
  iterate d from 2 to maxD:
    if (n % d == 0) then:
      set isPrime: 0
  if (isPrime == 1) then:
    display "  -> Prime found: " + n ?color=#10b981
    set count: count + 1

display "Total primes found: " + count ?color=#38bdf8`,

  watchdog: `! VerScript Mobile: Watchdogs & Safety
watchdog memory_guard:
  display "[Watchdog] Protected computational threshold" ?color=yellow

loop 3:
  display "Safe cycle execution..." ?color=#38bdf8

display "Finished with zero memory violations!" ?color=#10b981`
};

export default function App() {
  const [activeTab, setActiveTab] = useState('editor');
  const [files, setFiles] = useState(() => {
    try {
      const saved = localStorage.getItem('vs_android_files');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      'main.vrs': DEFAULT_TEMPLATES.circle,
      'matrix.vrs': DEFAULT_TEMPLATES.math,
      'primes.vrs': DEFAULT_TEMPLATES.primes
    };
  });

  const [activeFileName, setActiveFileName] = useState('main.vrs');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [promptRequested, setPromptRequested] = useState(null);

  const textareaRef = useRef(null);
  const promptResolverRef = useRef(null);

  // Sync files to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vs_android_files', JSON.stringify(files));
    } catch (e) {}
  }, [files]);

  const activeCode = files[activeFileName] || '';

  const handleCodeChange = (newCode) => {
    setFiles(prev => ({ ...prev, [activeFileName]: newCode }));
  };

  const handleInsertSnippet = (snippet) => {
    const ta = textareaRef.current;
    if (!ta) {
      handleCodeChange(activeCode + snippet);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newCode = activeCode.substring(0, start) + snippet + activeCode.substring(end);
    handleCodeChange(newCode);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + snippet.length;
    }, 10);
  };

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput('');
    setPromptRequested(null);
    setActiveTab('terminal');

    const startTime = performance.now();

    try {
      await executeVerScriptAsync(
        activeCode,
        (lineChunk) => {
          setOutput(prev => prev + lineChunk + '\n');
        },
        (promptMsg, defaultVal) => {
          return new Promise((resolve) => {
            promptResolverRef.current = resolve;
            setPromptRequested({ message: promptMsg, defaultVal });
          });
        },
        () => {
          const elapsed = Math.round(performance.now() - startTime);
          setExecutionTime(elapsed);
          setIsRunning(false);
        }
      );
    } catch (err) {
      setOutput(prev => prev + `\n\x1b[1;31mRuntime Error: ${err.message}\x1b[0m\n`);
      setIsRunning(false);
    }
  };

  const handleSendPromptInput = (val) => {
    if (promptResolverRef.current) {
      const resolver = promptResolverRef.current;
      promptResolverRef.current = null;
      setPromptRequested(null);
      resolver(val);
    }
  };

  const handleCreateFile = (name, initialContent = '# New VerScript File\n') => {
    setFiles(prev => ({ ...prev, [name]: initialContent }));
    setActiveFileName(name);
    setActiveTab('editor');
  };

  const handleDeleteFile = (name) => {
    if (Object.keys(files).length <= 1) return;
    setFiles(prev => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
    if (activeFileName === name) {
      const remaining = Object.keys(files).filter(k => k !== name);
      setActiveFileName(remaining[0] || 'main.vrs');
    }
  };

  const handleLoadTemplate = (templateId) => {
    if (DEFAULT_TEMPLATES[templateId]) {
      const name = `${templateId}_demo.vrs`;
      handleCreateFile(name, DEFAULT_TEMPLATES[templateId]);
    }
  };

  return (
    <div className="app-container">
      <HeaderBar
        activeFileName={activeFileName}
        isRunning={isRunning}
        onRun={handleRun}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="content-area">
        {activeTab === 'editor' && (
          <EditorView
            code={activeCode}
            onChange={handleCodeChange}
            textareaRef={textareaRef}
          />
        )}

        {activeTab === 'terminal' && (
          <TerminalView
            output={output}
            isRunning={isRunning}
            executionTime={executionTime}
            promptRequested={promptRequested}
            onSendInput={handleSendPromptInput}
            onClearOutput={() => setOutput('')}
          />
        )}

        {activeTab === 'files' && (
          <FilesView
            files={files}
            activeFileName={activeFileName}
            onSelectFile={(name) => {
              setActiveFileName(name);
              setActiveTab('editor');
            }}
            onCreateFile={handleCreateFile}
            onDeleteFile={handleDeleteFile}
            onLoadTemplate={handleLoadTemplate}
          />
        )}

        {activeTab === 'docs' && (
          <DocsView
            onInsertSnippet={(snippet) => {
              handleInsertSnippet(snippet);
              setActiveTab('editor');
            }}
          />
        )}

        {activeTab === 'vssharp' && (
          <VsSharpView
            onInsertCode={(code) => {
              handleInsertSnippet(code);
              setActiveTab('editor');
            }}
          />
        )}

        {/* Floating Action Run Button on Editor and Docs tab */}
        {(activeTab === 'editor' || activeTab === 'docs') && (
          <button
            className="run-fab"
            onClick={handleRun}
            disabled={isRunning}
            aria-label="Run Code"
            title="Run Code"
          >
            {isRunning ? '⏳' : '▶'}
          </button>
        )}
      </div>

      {activeTab === 'editor' && (
        <KeyboardToolbar onInsertSnippet={handleInsertSnippet} />
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
