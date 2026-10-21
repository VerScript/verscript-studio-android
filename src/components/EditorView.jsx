import React, { useState, useEffect, useRef } from 'react';

export default function EditorView({ code, onChange, textareaRef }) {
  const [fontSize, setFontSize] = useState(14);
  const [lineCount, setLineCount] = useState(1);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    const lines = (code || '').split('\n').length;
    setLineCount(Math.max(1, lines));
  }, [code]);

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        <div className="editor-stats">
          <span>{lineCount} lines</span>
          <span>{(code || '').length} chars</span>
        </div>
        <div className="editor-tools">
          <button
            className="editor-tool-btn"
            onClick={() => setFontSize(s => Math.max(11, s - 1))}
            title="Decrease font size"
          >
            A-
          </button>
          <span style={{ fontSize: '0.75rem', alignSelf: 'center', color: '#94a3b8' }}>{fontSize}px</span>
          <button
            className="editor-tool-btn"
            onClick={() => setFontSize(s => Math.min(22, s + 1))}
            title="Increase font size"
          >
            A+
          </button>
        </div>
      </div>

      <div className="editor-container">
        <div
          ref={lineNumbersRef}
          className="line-numbers"
          style={{ fontSize: `${fontSize}px` }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          className="code-textarea"
          style={{ fontSize: `${fontSize}px` }}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="Write VerScript code here..."
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
