import React from 'react';

const SHORTCUT_KEYS = [
  { label: 'set', insert: 'set ', isKeyword: true },
  { label: 'display', insert: 'display ', isKeyword: true },
  { label: 'step', insert: ' step 2: ', isKeyword: true },
  { label: 'extern', insert: 'extern "kernel32.dll" ', isKeyword: true },
  { label: 'draw', insert: 'draw rect(10, 10, 50, 50) ?fill=#00FFCC\n', isKeyword: true },
  { label: 'render', insert: 'render(scn, cam)\n', isKeyword: true },
  { label: 'terminal', insert: 'terminal.clear()\n', isKeyword: true },
  { label: 'complex', insert: 'complex(0, 1)', isKeyword: true },
  { label: 'unpack', insert: 'unpack [a, b] : ', isKeyword: true },
  { label: '|>', insert: ' |> ' },
  { label: '?color=', insert: '?color=#38bdf8', isKeyword: true },
  { label: 'loop', insert: 'loop 5:\n  ', isKeyword: true },
  { label: 'if', insert: 'if ', isKeyword: true },
  { label: 'load', insert: 'load Matrix\n', isKeyword: true },
  { label: 'def', insert: 'def func myFunc(x):\n  return x * 2\n', isKeyword: true },
  { label: '->', insert: ' -> ' },
  { label: ':', insert: ':' },
  { label: '"', insert: '""' },
  { label: '(', insert: '()' },
  { label: ')', insert: ')' },
  { label: '[', insert: '[]' },
  { label: ']', insert: ']' },
  { label: '{', insert: '{}' },
  { label: '}', insert: '}' },
  { label: '!', insert: '!' },
  { label: '==', insert: ' == ' },
  { label: '+', insert: ' + ' },
  { label: '-', insert: ' - ' },
  { label: '*', insert: ' * ' },
  { label: '/', insert: ' / ' },
  { label: 'Tab', insert: '  ' },
];

export default function KeyboardToolbar({ onInsertSnippet }) {
  return (
    <div className="keyboard-toolbar" role="toolbar" aria-label="VerScript Quick Code Keys">
      {SHORTCUT_KEYS.map((k, i) => (
        <button
          key={i}
          className={`key-chip ${k.isKeyword ? 'keyword' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onInsertSnippet(k.insert);
          }}
          type="button"
        >
          {k.label}
        </button>
      ))}
    </div>
  );
}
