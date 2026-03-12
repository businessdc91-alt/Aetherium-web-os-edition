import React, { createContext, useContext, useRef } from 'react';

const AIContext = createContext();

export function AIContextProvider({ children }) {
  // Shared memory for all modules
  const memoryRef = useRef({
    documents: {},
    sessions: {},
    recall: (key) => memoryRef.current[key],
    save: (key, value) => { memoryRef.current[key] = value; },
  });

  return (
    <AIContext.Provider value={memoryRef.current}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  return useContext(AIContext);
}
