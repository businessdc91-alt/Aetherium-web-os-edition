import React from 'react';

export default function PersonaSelector({ personas, activePersona, onPersonaChange }) {
  return (
    <div style={{ margin: '12px 0', display: 'flex', gap: 12, alignItems: 'center' }}>
      <span style={{ fontWeight: 'bold' }}>Persona:</span>
      <select
        value={activePersona}
        onChange={e => onPersonaChange(e.target.value)}
        style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #ccc' }}
      >
        {Object.entries(personas).map(([key, persona]) => (
          <option key={key} value={key}>
            {persona.name}
          </option>
        ))}
      </select>
      <span style={{ color: '#888', fontSize: 12 }}>
        {personas[activePersona]?.description}
      </span>
    </div>
  );
}
