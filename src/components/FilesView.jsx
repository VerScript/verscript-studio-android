import React, { useState } from 'react';

export default function FilesView({
  files,
  activeFileName,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onLoadTemplate
}) {
  const [newFileName, setNewFileName] = useState('');
  const [showNewInput, setShowNewInput] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    let name = newFileName.trim();
    if (!name.endsWith('.vrs')) name += '.vrs';
    onCreateFile(name);
    setNewFileName('');
    setShowNewInput(false);
  };

  const handleExport = (fileName, content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      onCreateFile(file.name, content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="files-wrapper">
      <div className="section-box">
        <div className="section-title">
          <span>Project Files</span>
          <button className="icon-btn" onClick={() => setShowNewInput(v => !v)}>
            <span>+</span>
            <span>New File</span>
          </button>
        </div>

        {showNewInput && (
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              className="prompt-input"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="e.g. algorithm.vrs"
              autoFocus
            />
            <button type="submit" className="icon-btn" style={{ background: '#0284c7', color: '#fff' }}>
              Create
            </button>
          </form>
        )}

        <div className="files-list">
          {Object.keys(files).map((name) => (
            <div
              key={name}
              className={`file-item ${name === activeFileName ? 'active' : ''}`}
              onClick={() => onSelectFile(name)}
            >
              <div className="file-item-left">
                <span>📄</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{name}</span>
              </div>
              <div className="file-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="action-chip"
                  onClick={() => handleExport(name, files[name])}
                  title="Export .vrs file"
                >
                  Export
                </button>
                {Object.keys(files).length > 1 && (
                  <button
                    className="action-chip"
                    onClick={() => onDeleteFile(name)}
                    style={{ color: '#f43f5e' }}
                    title="Delete file"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '12px' }}>
          <label className="icon-btn" style={{ width: '100%', cursor: 'pointer' }}>
            <span>📥 Import .vrs File</span>
            <input
              type="file"
              accept=".vrs,.txt"
              style={{ display: 'none' }}
              onChange={handleImport}
            />
          </label>
        </div>
      </div>

      <div className="section-box">
        <div className="section-title">
          <span>Preloaded Templates</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'math', label: '🧮 Matrix Math & Determinant' },
            { id: 'primes', label: '⚡ Prime Number Sieve' },
            { id: 'circle', label: '📐 Geometry & Formatting' },
            { id: 'watchdog', label: '🛡️ Watchdog Exception Shield' },
          ].map(t => (
            <button
              key={t.id}
              className="file-item"
              style={{ width: '100%', textAlign: 'left', border: '1px solid rgba(255,255,255,0.08)' }}
              onClick={() => onLoadTemplate(t.id)}
            >
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{t.label}</span>
              <span style={{ color: '#38bdf8', fontSize: '0.8rem' }}>Load &rarr;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
