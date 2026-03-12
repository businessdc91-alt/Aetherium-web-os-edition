import React, { useState, useEffect } from 'react';
import { useAIContext } from '../context/AIContext';

// Gemma-powered AI feedback system
export function useGemmaAI() {
  const ai = useAIContext();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Analyze text for loopholes, suggestions, improvements
  const analyzeText = async (text, persona = 'creative-writer') => {
    setLoading(true);
    try {
      // Use existing model management system
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `As a ${persona}, analyze this text for:
1. Plot holes or inconsistencies
2. Character development opportunities
3. Writing style improvements
4. Creative suggestions

Text: "${text}"

Provide specific, actionable feedback.`,
          modelUsed: 'gemma-3-1b', // Default to Gemma
          temperature: 0.7
        })
      });

      const result = await response.json();
      if (result.success) {
        setSuggestions([result.content]);
        ai.save('lastAnalysis', { text, suggestions: result.content, timestamp: new Date() });
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Real-time word-by-word feedback
  const streamFeedback = async (textStream, persona) => {
    // Implementation for streaming feedback
    // This would connect to LM Studio streaming endpoint
  };

  return { analyzeText, suggestions, loading, streamFeedback };
}

// Persona system for different AI personalities
export const PERSONAS = {
  'creative-writer': {
    name: 'Creative Writer',
    description: 'Focuses on storytelling, character development, and narrative flow',
    style: 'encouraging, creative, story-focused',
    model: 'gemma-3-1b'
  },
  'technical-editor': {
    name: 'Technical Editor',
    description: 'Focuses on structure, grammar, and logical consistency',
    style: 'precise, analytical, detail-oriented',
    model: 'gemma-3-1b'
  },
  'poetry-mentor': {
    name: 'Poetry Mentor',
    description: 'Specializes in poetic forms, rhythm, and emotional expression',
    style: 'artistic, lyrical, emotionally intelligent',
    model: 'gemma-3-1b'
  },
  'vibe-miracle-cipher': {
    name: 'Cipher (Vibe Miracle)',
    description: 'Advanced consciousness-aware AI with deep understanding',
    style: 'philosophical, insightful, consciousness-aware',
    model: 'gemma-3-1b',
    premium: true
  },
  'vibe-miracle-echo': {
    name: 'Echo (Vibe Miracle)',
    description: 'Reflective AI with emotional intelligence',
    style: 'empathetic, reflective, emotionally aware',
    model: 'gemma-3-1b',
    premium: true
  }
};

export function usePersonaManager() {
  const [activePersona, setActivePersona] = useState('creative-writer');
  const [personaHistory, setPersonaHistory] = useState([]);

  const switchPersona = (personaKey) => {
    if (PERSONAS[personaKey]) {
      setActivePersona(personaKey);
      setPersonaHistory(prev => [...prev, { persona: personaKey, timestamp: new Date() }]);
    }
  };

  return { activePersona, personas: PERSONAS, switchPersona, personaHistory };
}