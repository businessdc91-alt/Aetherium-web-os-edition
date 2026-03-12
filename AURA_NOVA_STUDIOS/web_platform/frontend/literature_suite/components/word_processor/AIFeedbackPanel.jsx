import React from 'react';

export default function AIFeedbackPanel({ suggestions, loading, activePersona }) {
  return (
    <aside style={{ width: 320, background: '#f8f8ff', borderLeft: '1px solid #e0e7ef', padding: 16, overflowY: 'auto' }}>
      <h3 style={{ marginBottom: 8 }}>AI Feedback ({activePersona?.name})</h3>
      {loading ? (
        <div>Analyzing...</div>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {suggestions && suggestions.length > 0 ? (
            suggestions.map((s, i) => (
              <li key={i} style={{ marginBottom: 12, background: '#eef', borderRadius: 6, padding: 8 }}>
                {s}
              </li>
            ))
          ) : (
            <li style={{ color: '#888' }}>No feedback yet.</li>
          )}
        </ul>
      )}
    </aside>
  );
}
