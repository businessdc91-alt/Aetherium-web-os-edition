import React from 'react';
import Sidebar from './components/Sidebar';
import { AIContextProvider } from './context/AIContext';
import MainView from './components/MainView';
import { useState } from 'react';

const MODULES = [
  { key: 'word', label: 'Word Processor' },
  { key: 'notepad', label: 'Notepad' },
  { key: 'spreadsheet', label: 'Spreadsheets/Charts' },
  { key: 'presentation', label: 'Presentation' },
  { key: 'poetry', label: 'Poetry Generator' },
  { key: 'lyrics', label: 'Lyrics & Sheet Music' },
  { key: 'language', label: 'Language Learning' },
  { key: 'map-maker', label: 'Map Maker' },
  { key: 'circuit-designer', label: 'Circuit Designer' },
  { key: 'blueprint-designer', label: 'Blueprint Designer' },
  { key: 'literature-zone', label: 'Literature Zone' },
  { key: 'writing-library', label: 'Writing Library' },
  { key: 'poems-creator', label: 'Poems Creator' },
  { key: 'music-composer', label: 'Music Composer' },
];

export default function LiteratureSuiteApp() {
  const [selectedModule, setSelectedModule] = useState('word');
  return (
    <AIContextProvider>
      <div className="literature-suite-app" style={{ display: 'flex', height: '100vh' }}>
        <Sidebar modules={MODULES} selected={selectedModule} onSelect={setSelectedModule} />
        <MainView selectedModule={selectedModule} />
      </div>
    </AIContextProvider>
  );
}
