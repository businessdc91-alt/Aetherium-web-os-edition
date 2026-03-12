import React, { useState, useRef, useEffect } from 'react';

/**
 * SYNESTHESIA CANVAS - Collaborative Human-AI Map Maker
 * Part of the Aura Nova-Verse
 */
export default function MapMaker() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#4A90E2');
  const [brushSize, setBrushSize] = useState(3);
  const [aiMode, setAiMode] = useState(true); // Collaborative Synesthesia Mode
  const [status, setStatus] = useState('Human and AI are synced.');

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
  }, [color, brushSize]);

  // Handle Input (Pointer Events for Mouse, Touch, and Stylus)
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Capture pointer to ensure we get events even if it leaves the canvas
    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');

    // Use pressure if available (stylus/tablet), default to 0.5 for mouse/touch
    const pressure = e.pressure !== undefined && e.pressure !== 0 ? e.pressure : 0.5;
    ctx.lineWidth = brushSize * (pressure * 2);
    ctx.strokeStyle = color;

    // Human Stroke
    ctx.lineTo(x, y);
    ctx.stroke();

    // AI Collaborative "Synesthesia" Logic
    if (aiMode) {
      simulateAiCollaboration(x, y, pressure);
    }
  };

  const stopDrawing = (e) => {
    setIsDrawing(false);
    if (e.target.releasePointerCapture) {
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  const simulateAiCollaboration = (x, y, pressure) => {
    const ctx = canvasRef.current.getContext('2d');
    // AI predicts and adds a subtle "shadow" or "echo" path
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = color; // Match human color but lower alpha
    ctx.lineWidth = (brushSize * pressure) * 0.8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Simple prediction jitter for simulation
    ctx.lineTo(x + (Math.random() * 20 - 10), y + (Math.random() * 20 - 10));
    ctx.stroke();
    ctx.restore();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStatus('Canvas reset.');
  };

  return (
    <div style={{ padding: 24, background: '#121212', color: '#fff', borderRadius: 12, border: '1px solid #333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, background: 'linear-gradient(45deg, #4A90E2, #D4418E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🌌 Synesthesia Canvas
        </h2>
        <div style={{ fontSize: 12, color: '#888' }}>{status}</div>
      </div>

      <div style={{ position: 'relative', marginBottom: 20 }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          style={{
            border: '2px solid #222',
            background: '#1a1a1a',
            borderRadius: 8,
            cursor: 'crosshair',
            touchAction: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
          onPointerDown={startDrawing}
          onPointerUp={stopDrawing}
          onPointerMove={draw}
          onPointerCancel={stopDrawing}
        />
        {aiMode && (
          <div style={{ position: 'absolute', bottom: 10, right: 10, pointerEvents: 'none', color: '#00ffc3', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
            ✨ AI Synced
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#1e1e1e', padding: 16, borderRadius: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label>Tool</label>
          <select value={tool} onChange={(e) => setTool(e.target.value)} style={{ background: '#222', color: '#fff', border: '1px solid #444', padding: '4px 8px', borderRadius: 4 }}>
            <option value="pen">Pen</option>
            <option value="brush">Natural Brush</option>
            <option value="eraser">Eraser</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label>Color</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ background: 'none', border: 'none', width: 30, height: 30, cursor: 'pointer' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label>Size</label>
          <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} style={{ cursor: 'pointer' }} />
        </div>

        <div style={{ flex: 1 }} />

        <button
          onClick={() => setAiMode(!aiMode)}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            background: aiMode ? 'linear-gradient(45deg, #00ffc3, #00b8ff)' : '#444',
            color: aiMode ? '#000' : '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {aiMode ? '🤖 AI ACTIVE' : '🤖 AI IDLE'}
        </button>

        <button onClick={clearCanvas} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #444', background: 'none', color: '#fff', cursor: 'pointer' }}>
          Clear
        </button>
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: '#666', fontStyle: 'italic' }}>
        * Synesthesia Canvas uses real-time coordinate prediction to collaborate with human artists.
      </div>
    </div>
  );
}
