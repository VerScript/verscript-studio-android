import React from 'react';
import VerScriptLogo from './VerScriptLogo';

export default function HeaderBar({ activeFileName, isRunning, onRun, activeTab, setActiveTab }) {
  return (
    <header className="header-bar">
      <div className="header-left">
        <div className="app-logo-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <VerScriptLogo width={22} height={22} />
          <span>VerScript Studio</span>
        </div>
        <div className="file-pill" title={activeFileName}>
          <span>📄</span>
          <span>{activeFileName}</span>
        </div>
      </div>

      <div className="header-actions">
        {activeTab !== 'terminal' && (
          <button
            className="icon-btn btn-run"
            onClick={onRun}
            disabled={isRunning}
            aria-label="Run VerScript program"
          >
            <span>{isRunning ? '⏳' : '▶'}</span>
            <span>{isRunning ? 'Running' : 'Run'}</span>
          </button>
        )}
        {activeTab === 'terminal' && (
          <button
            className="icon-btn"
            onClick={() => setActiveTab('editor')}
            aria-label="Back to code editor"
          >
            <span>📝</span>
            <span>Edit</span>
          </button>
        )}
      </div>
    </header>
  );
}
