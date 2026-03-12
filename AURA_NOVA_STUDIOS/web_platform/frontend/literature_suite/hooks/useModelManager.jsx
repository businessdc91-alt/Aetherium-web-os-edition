import React, { useState, useEffect } from 'react';

// Model management for Gemma3 1B integration
const DEFAULT_ENDPOINTS = {
  localPython: 'http://localhost:5000/api/gemma', // Your Python LLM
  googleCloud: 'https://your-gemma-vm-url/api/gemma', // Google Cloud VM
  browser: null // For future in-browser model
};

export function useModelManager(user) {
  const [endpoint, setEndpoint] = useState(DEFAULT_ENDPOINTS.googleCloud);
  const [mode, setMode] = useState('googleCloud');
  const [status, setStatus] = useState('unknown');

  useEffect(() => {
    // Default to localPython for your account
    if (user && user.isOwner) {
      setEndpoint(DEFAULT_ENDPOINTS.localPython);
      setMode('localPython');
    }
  }, [user]);

  // Health check for endpoint
  useEffect(() => {
    if (!endpoint) return;
    fetch(endpoint + '/status')
      .then(res => res.ok ? setStatus('healthy') : setStatus('unhealthy'))
      .catch(() => setStatus('unreachable'));
  }, [endpoint]);

  // Switch model endpoint
  const switchModel = (mode) => {
    setMode(mode);
    setEndpoint(DEFAULT_ENDPOINTS[mode]);
  };

  return { endpoint, mode, status, switchModel };
}
