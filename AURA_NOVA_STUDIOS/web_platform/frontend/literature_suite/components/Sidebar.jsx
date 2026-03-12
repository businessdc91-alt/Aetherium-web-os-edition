import React from 'react';

export default function Sidebar({ modules, selected, onSelect }) {
  return (
    <aside className="sidebar" style={{ width: 220, background: '#f7f7fa', padding: 16 }}>
      <h2>Literature Suite</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {modules.map(item => (
          <li
            key={item.key}
            style={{
              margin: '8px 0',
              fontWeight: selected === item.key ? 'bold' : 'normal',
              cursor: 'pointer',
              background: selected === item.key ? '#e0e7ff' : 'transparent',
              borderRadius: 6,
              padding: '8px 12px',
            }}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
