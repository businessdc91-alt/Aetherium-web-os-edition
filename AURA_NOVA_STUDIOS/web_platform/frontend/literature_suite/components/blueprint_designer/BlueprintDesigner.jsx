import React from 'react';

export default function BlueprintDesigner() {
  const canvasRef = React.useRef();
  const [tool, setTool] = React.useState('rectangle');
  const [color, setColor] = React.useState('#2d3748');

  // Basic shape drawing logic placeholder
  // TODO: Implement real shape drawing and annotation

  const handleExport = () => {
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'blueprint.png';
    link.href = url;
    link.click();
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Blueprint Designer</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Tool: </label>
        <select value={tool} onChange={e => setTool(e.target.value)}>
          <option value="rectangle">Rectangle</option>
          <option value="ellipse">Ellipse</option>
          <option value="line">Line</option>
        </select>
        <label style={{ marginLeft: 12 }}>Color: </label>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <button style={{ marginLeft: 12 }} onClick={handleExport}>Export PNG</button>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: '1px solid #ccc', background: '#fff' }}
      />
      <div style={{ marginTop: 12 }}>
        <p>Draw shapes and annotate your blueprint. (Feature coming soon)</p>
      </div>
      {/* TODO: Add shape drawing, annotation, AI critique, import */}
    </div>
  );
}
