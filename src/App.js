// src/App.js
import React from 'react';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <header className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 text-center shadow-lg rounded-md">
        <h1 className="text-4xl font-bold animate-fade-in">React Music Player</h1>
      </header>
      <div className="w-full max-w-3xl mt-6">
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
