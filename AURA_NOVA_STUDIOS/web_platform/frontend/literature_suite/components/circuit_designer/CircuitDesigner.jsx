import React from 'react';

export default function CircuitDesigner() {
  const canvasRef = React.useRef();
  const COMPONENTS = [
    { name: 'Resistor', symbol: 'R' },
    { name: 'Capacitor', symbol: 'C' },
    { name: 'LED', symbol: 'LED' },
    { name: 'Wire', symbol: 'Wire' }
  ];
  const [selected, setSelected] = React.useState(COMPONENTS[0].name);

  // Drag-and-drop logic placeholder
  // TODO: Implement real drag-and-drop and wire connections

  const handleExport = () => {
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'circuit.png';
    link.href = url;
    link.click();
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Circuit Designer</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Component: </label>
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          {COMPONENTS.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
        <button style={{ marginLeft: 12 }} onClick={handleExport}>Export PNG</button>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: '1px solid #ccc', background: '#fff' }}
      />
      <div style={{ marginTop: 12 }}>
        <p>Drag components onto the canvas. (Feature coming soon)</p>
      </div>
      {/* TODO: Add drag-and-drop, wire connections, AI advice, import */}
    </div>
  );
}
