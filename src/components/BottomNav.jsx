import React from 'react';

const TABS = [
  { id: 'editor', label: 'Editor', icon: '📝' },
  { id: 'terminal', label: 'Console', icon: '💻' },
  { id: 'files', label: 'Files', icon: '📁' },
  { id: 'docs', label: 'Docs', icon: '📖' },
  { id: 'vssharp', label: 'VS# AI', icon: '🤖' },
];

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="bottom-nav" role="tablist" aria-label="Mobile Navigation">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          type="button"
        >
          <span className="tab-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
