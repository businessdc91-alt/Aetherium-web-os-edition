import React, { useState, useRef } from 'react';
import { useAIContext } from '../../context/AIContext';

export default function ChatBubble({ projectId }) {
  const ai = useAIContext();
  const [messages, setMessages] = useState(() => {
    // Load chat history from AI context memory
    return ai.recall(`chat_${projectId}`) || [];
  });
  const [input, setInput] = useState('');
  const inputRef = useRef();

  // Send message and get AI response
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input, timestamp: new Date() };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    ai.save(`chat_${projectId}`, updatedMessages);
    setInput('');
    inputRef.current?.focus();

    // Get AI response (Gemma-powered)
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are a creative writing partner. Respond to this conversation with helpful, project-focused advice and ideas.\n\n${updatedMessages.map(m => m.role + ': ' + m.content).join('\n')}`,
          modelUsed: 'gemma-3-1b',
          temperature: 0.7
        })
      });
      const result = await response.json();
      if (result.success) {
        const aiMsg = { role: 'assistant', content: result.content, timestamp: new Date() };
        const allMessages = [...updatedMessages, aiMsg];
        setMessages(allMessages);
        ai.save(`chat_${projectId}`, allMessages);
      }
    } catch (error) {
      // Fallback: show error message
      const errMsg = { role: 'assistant', content: 'AI response failed.', timestamp: new Date() };
      setMessages(msgs => [...msgs, errMsg]);
    }
  };

  // Convert chat to project
  const convertToProject = () => {
    ai.save(`project_from_chat_${projectId}`, messages);
    // Optionally trigger project creation logic here
  };

  return (
    <div style={{ background: '#f7f7fa', borderRadius: 8, padding: 16, margin: '16px 0', maxWidth: 480 }}>
      <h4>Project Chat</h4>
      <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#4f46e5' : '#333' }}>
              {msg.role === 'user' ? 'You' : 'AI'}:
            </span>
            <span style={{ marginLeft: 6 }}>{msg.content}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '8px', borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 16px', borderRadius: 6, background: '#4f46e5', color: '#fff' }}>
          Send
        </button>
      </div>
      <button onClick={convertToProject} style={{ marginTop: 12, padding: '6px 12px', borderRadius: 6, background: '#e0e7ff', color: '#333' }}>
        Convert Chat to Project
      </button>
    </div>
  );
}
