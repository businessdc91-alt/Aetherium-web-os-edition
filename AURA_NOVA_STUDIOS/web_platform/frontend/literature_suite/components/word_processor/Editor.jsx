import React, { useRef } from 'react';

export default function Editor({ doc, setDoc }) {
  const ref = useRef();

  return (
    <div
      ref={ref}
      className="editor"
      contentEditable
      suppressContentEditableWarning
      onInput={e => setDoc(e.currentTarget.textContent)}
      style={{ minHeight: 400, border: '1px solid #ccc', padding: 16 }}
    >
      {doc}
    </div>
  );
}
