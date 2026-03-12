import React, { useState } from 'react';
import Toolbar from './Toolbar';
import Editor from './Editor';
import { useAIContext } from '../../context/AIContext';

export default function WordProcessor() {
  const [doc, setDoc] = useState('');
  const ai = useAIContext();

  // Example: Save doc to AI memory
  const saveDoc = () => {
    ai.save('currentWordDoc', doc);
  };

  return (
    <div className="word-processor">
      <Toolbar doc={doc} setDoc={setDoc} />
      <Editor doc={doc} setDoc={setDoc} />
      <button onClick={saveDoc}>Save to AI Memory</button>
    </div>
  );
}
