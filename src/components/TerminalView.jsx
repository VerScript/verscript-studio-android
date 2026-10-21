import React, { useRef, useEffect, useState } from 'react';
import { parseAnsiToReact, stripAnsi } from './AnsiView';

export default function TerminalView({
  output,
  isRunning,
  executionTime,
  promptRequested,
  onSendInput,
  onClearOutput
}) {
  const [inputText, setInputText] = useState('');
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output, promptRequested]);

  const handleSubmitInput = (e) => {
    e.preventDefault();
    if (onSendInput) {
      onSendInput(inputText);
      setInputText('');
    }
  };

  const handleCopy = () => {
    const plain = stripAnsi(output || '');
    navigator.clipboard?.writeText(plain);
  };

  return (
    <div className="terminal-wrapper">
      <div className="terminal-header">
        <div className="terminal-status-badge">
          <span className={`status-dot ${isRunning ? 'running' : output ? 'success' : ''}`}></span>
          <span>{isRunning ? 'Running VM...' : output ? `Ready (${executionTime}ms)` : 'Console Idle'}</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="icon-btn" onClick={handleCopy} title="Copy Output">
            <span>📋</span>
          </button>
          <button className="icon-btn" onClick={onClearOutput} title="Clear Terminal">
            <span>🗑️</span>
          </button>
        </div>
      </div>

      <div className="terminal-logs">
        {output ? parseAnsiToReact(output) : (
          <span style={{ color: '#475569', fontStyle: 'italic' }}>
            Tap 'Run' to execute code in the offline VerScript engine.
          </span>
        )}
        <div ref={logsEndRef} />
      </div>

      {promptRequested && (
        <form className="prompt-bar" onSubmit={handleSubmitInput}>
          <span style={{ color: '#38bdf8', fontSize: '0.82rem', fontWeight: 'bold' }}>
            {promptRequested.message || 'Input:'}
          </span>
          <input
            type="text"
            className="prompt-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={promptRequested.defaultVal ? `Default: ${promptRequested.defaultVal}` : 'Type response...'}
            autoFocus
          />
          <button type="submit" className="icon-btn" style={{ background: '#0284c7', color: '#fff' }}>
            Send
          </button>
        </form>
      )}
    </div>
  );
}
