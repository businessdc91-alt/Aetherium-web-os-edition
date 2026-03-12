import React from 'react';

import WordProcessor from './word_processor/WordProcessor';
import LiteratureZone from '../literature-zone.jsx';
import WritingLibrary from '../writing-library.jsx';
import PoemsCreator from '../poems-creator.jsx';
import MusicComposer from '../music-composer.jsx';
import MapMaker from './map_maker/MapMaker';
import CircuitDesigner from './circuit_designer/CircuitDesigner';
import BlueprintDesigner from './blueprint_designer/BlueprintDesigner';

export default function MainView({ selectedModule }) {
  let content = null;
  switch (selectedModule) {
    case 'word':
      content = <WordProcessor />;
      break;
    case 'map-maker':
      content = <MapMaker />;
      break;
    case 'circuit-designer':
      content = <CircuitDesigner />;
      break;
    case 'blueprint-designer':
      content = <BlueprintDesigner />;
      break;
    case 'literature-zone':
      content = <LiteratureZone />;
      break;
    case 'writing-library':
      content = <WritingLibrary />;
      break;
    case 'poems-creator':
      content = <PoemsCreator />;
      break;
    case 'music-composer':
      content = <MusicComposer />;
      break;
    // Add more cases for other modules as implemented
    default:
      content = <div>Select a function from the menu to begin.</div>;
  }
  return (
    <main className="main-view" style={{ flex: 1, padding: 24, overflow: 'auto' }}>
      {content}
    </main>
  );
}
