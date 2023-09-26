import React, { useEffect, useId, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { useEditorJs } from './hooks/editorjs';

function App() {
  const editorContainer = useRef<HTMLDivElement>(null);
  const {  } = useEditorJs(editorContainer, (e) => console.log(e));
  const id = useId();
  return (
    <div 
      style={{
        margin: '1rem',
        border: '1px solid',
        padding: '1rem',
      }}
    >
      <div id={id} ref={editorContainer} />
    </div>
  );
}

export default App;
