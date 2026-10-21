import React, { useState } from 'react';

export default function VsSharpView({ onInsertCode }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Hi! I'm **VS#**, your intelligent VerScript assistant. Ask me anything about syntax, matrix math, watchdogs, or code generation!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const newMsgs = [...messages, { sender: 'user', text: userMsg }];
    setMessages(newMsgs);
    setInputText('');

    // Offline / Local knowledge base response
    setTimeout(() => {
      let reply = "Here is an example VerScript solution for your request:";
      let codeSnippet = "";

      const lower = userMsg.toLowerCase();
      if (lower.includes('matrix') || lower.includes('det')) {
        reply = "You can create matrices using the `Matrix` standard library:";
        codeSnippet = "load Matrix\nset m: Matrix.identity 3\ndisplay 'Matrix created:' ?color=cyan\ndisplay m";
      } else if (lower.includes('watchdog') || lower.includes('error')) {
        reply = "VerScript provides reactive watchdogs for boundary protection:";
        codeSnippet = "watchdog guard:\n  display 'Computation threshold observed' ?color=yellow\n\nset val: 10 * 20\ndisplay 'Safe: ' + val ?color=green";
      } else if (lower.includes('loop') || lower.includes('iterate')) {
        reply = "Here is how loops and iterations work:";
        codeSnippet = "loop 3:\n  display 'Repeating 3 times'\n\niterate i from 1 to 5:\n  display 'Current index: ' + i";
      } else {
        reply = `Here is a clean VerScript script based on "${userMsg}":`;
        codeSnippet = `set status: "Active"\ndisplay "Running VerScript mobile process..." ?color=#38bdf8\nloop 3:\n  display "Step completed" ?color=green`;
      }

      setMessages(m => [
        ...m,
        {
          sender: 'bot',
          text: reply,
          code: codeSnippet
        }
      ]);
    }, 400);
  };

  return (
    <div className="vssharp-wrapper">
      <div style={{
        padding: '8px 14px',
        background: isOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isOnline ? '#10b981' : '#f59e0b'
          }} />
          <span style={{ fontWeight: 700, color: isOnline ? '#34d399' : '#fbbf24' }}>
            {isOnline ? 'VS# AI Connected' : 'Offline Mode (Local Knowledge Base)'}
          </span>
        </div>
        <span style={{ color: '#94a3b8' }}>v2.0</span>
      </div>

      <div className="ai-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`ai-bubble ${msg.sender}`}>
            <div>{msg.text}</div>
            {msg.code && (
              <div style={{ marginTop: '8px' }}>
                <pre style={{
                  background: '#07090e',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  fontFamily: 'Fira Code, monospace',
                  fontSize: '0.8rem',
                  overflowX: 'auto',
                  margin: '4px 0 8px 0',
                  color: '#38bdf8'
                }}>
                  {msg.code}
                </pre>
                <button
                  className="icon-btn"
                  style={{ fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}
                  onClick={() => onInsertCode(msg.code + '\n')}
                >
                  + Insert Code into Editor
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="prompt-bar" onSubmit={handleSend}>
        <input
          type="text"
          className="prompt-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask VS# a question..."
        />
        <button type="submit" className="icon-btn" style={{ background: '#0284c7', color: '#fff' }}>
          Ask
        </button>
      </form>
    </div>
  );
}
