import React from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import JournalEntries from './components/JournalEntries';
import EntryForm from './components/EntryForm';
import { CurrentDateProvider } from './providers/CurrentDateProvider';
import { EntriesProvider } from './providers/EntriesProvider';

function App() {

  return (
    <div id='App'>
      <EntriesProvider>
        <CurrentDateProvider>
          <JournalEntries />
          <EntryForm />
        </CurrentDateProvider>
      </EntriesProvider>
    </div>
  );
}

export default App;
