import React from 'react';

const DOC_TOPICS = [
  {
    title: 'Output & Truecolor ANSI',
    desc: 'Print text with colors, hex codes, and inline control.',
    code: `display "Success!" ?color=#10b981
display "Cyan Text" ?color=cyan ?inline
display " [Next to Cyan]" ?color=yellow`
  },
  {
    title: 'Variables & Data Types',
    desc: 'Dynamic assignments, strings, integers, arrays, and entities.',
    code: `set radius: 10
set name: "Mobile Explorer"
set items: [1, 2, 3, 4, 5]
display "Radius: " + radius ?color=#38bdf8`
  },
  {
    title: 'Loops & Iteration',
    desc: 'Fixed count loops and ranged iterations.',
    code: `loop 4:
  display "Pulsing cycle" ?color=#f59e0b

iterate i from 1 to 5:
  display "Iteration step: " + i`
  },
  {
    title: 'Procedures & Functions',
    desc: 'Define custom functions with parameters and return values.',
    code: `def func calculateArea(r):
  set piVal: 3.14159
  return piVal * (r ^ 2)

set result: calculateArea 7
display "Area: " + result ?color=#c084fc`
  },
  {
    title: 'Standard Libraries: Matrix & Math',
    desc: 'Load native matrix manipulation and advanced math libraries.',
    code: `load Matrix
load Math

set A: Matrix.identity 3
display "Identity matrix created cleanly." ?color=#10b981`
  },
  {
    title: 'Watchdogs & Error Guards',
    desc: 'Reactive memory and computation threshold protection.',
    code: `watchdog computation_shield:
  display "Watchdog active" ?color=yellow

set x: 50 * 2
display "Computed safely: " + x ?color=green`
  }
];

export default function DocsView({ onInsertSnippet }) {
  return (
    <div className="docs-wrapper">
      <div style={{ marginBottom: '8px' }}>
        <h2 style={{ fontSize: '1.2rem', margin: '0 0 4px 0', fontWeight: 800, color: '#f8fafc' }}>
          📖 VerScript Mobile Cheatsheet
        </h2>
        <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}>
          Tap "Insert to Code" to paste any pattern directly into your current file.
        </p>
      </div>

      {DOC_TOPICS.map((topic, i) => (
        <div key={i} className="snippet-card">
          <div className="snippet-header">
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>{topic.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{topic.desc}</div>
            </div>
            <button
              className="icon-btn"
              style={{ background: 'rgba(56, 189, 248, 0.15)', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
              onClick={() => onInsertSnippet(topic.code + '\n')}
            >
              + Insert
            </button>
          </div>
          <pre className="snippet-body">{topic.code}</pre>
        </div>
      ))}
    </div>
  );
}
