import React, { useRef, useState, useEffect } from 'react';
import Favorites from './Favorites';

const NowPlaying = ({ song, lyrics, isRepeating, toggleRepeat, isShuffling, toggleShuffle, favorites, playSong }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;

      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };
      const setAudioTime = () => setCurrentTime(audio.currentTime);

      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
      };
    }
  }, [volume]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (e.target.value / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play().catch(error => {
        console.error('Error attempting to play audio:', error);
      });
    }
  }, [isPlaying, song]);

  return (
    <div className="now-playing mb-6 animate-fade-in relative">
      <h2 className="text-2xl font-semibold mb-2">Now Playing</h2>
      <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg shadow-2xl relative">
        <img src={song.album.cover} alt={`${song.title} album cover`} className="w-24 h-24 mr-4 rounded-lg shadow-md transform hover:scale-105 transition duration-200 ease-in-out animate-album-art" />
        <div>
          <p className="text-lg font-bold animate-text-pulse">{song.title}</p>
          <p className="text-gray-400 animate-text-pulse">{song.artist.name}</p>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button onClick={toggleRepeat} className={`p-2 rounded ${isRepeating ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'} hover:bg-blue-600 active:bg-blue-700 transform transition duration-200 ease-in-out hover:scale-105 active:scale-95`}>
            <i className="fas fa-redo-alt h-6 w-6"></i>
          </button>
          <button onClick={toggleShuffle} className={`p-2 rounded ${isShuffling ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'} hover:bg-blue-600 active:bg-blue-700 transform transition duration-200 ease-in-out hover:scale-105 active:scale-95`}>
            <i className="fas fa-random h-6 w-6"></i>
          </button>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <button onClick={handlePlayPause} className="mr-4 hover:text-blue-500 active:text-blue-700 transform transition duration-200 ease-in-out hover:scale-105 active:scale-95">
          {isPlaying ? (
            <i className="fas fa-pause h-6 w-6"></i>
          ) : (
            <i className="fas fa-play h-6 w-6"></i>
          )}
        </button>
        <div className="flex-1">
          <input
            type="range"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-900 rounded-lg appearance-none"
            style={{ accentColor: 'black' }}
          />
        </div>
        <span className="ml-4">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <div className="flex items-center mt-4">
        <span className="mr-2">Volume</span>
        <input
          type="range"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-900 rounded-lg appearance-none"
          style={{ accentColor: 'black' }}
        />
      </div>
      <audio ref={audioRef} src={song.preview} loop={isRepeating} />
      <Favorites songs={favorites} playSong={playSong} />
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Lyrics</h3>
        <pre className="whitespace-pre-wrap bg-gray-700 p-4 rounded-lg shadow-lg">{lyrics}</pre>
      </div>
    </div>
  );
};

export default NowPlaying;
