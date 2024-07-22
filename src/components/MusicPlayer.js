// src/components/MusicPlayer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongList from './SongList';
import NowPlaying from './NowPlaying';
import Favorites from './Favorites';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [lyrics, setLyrics] = useState('');
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get('https://deezerdevs-deezer.p.rapidapi.com/search', {
            params: { q: searchTerm },
            headers: {
              'X-RapidAPI-Key': '0e7e51baf0mshf5d6be9fb1b90efp126786jsne17b6f2e222e',
              'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
          });
          setSongs(response.data.data || []);
        } catch (error) {
          console.error('Error fetching songs:', error);
          setSongs([]);
        }
      } else {
        setSongs([]);
      }
    };

    fetchSongs();
  }, [searchTerm]);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (currentSong) {
        try {
          const response = await axios.get(`https://api.lyrics.ovh/v1/${currentSong.artist.name}/${currentSong.title}`);
          setLyrics(response.data.lyrics || 'Lyrics not found');
        } catch (error) {
          console.error('Error fetching lyrics:', error);
          setLyrics('Lyrics not found');
        }
      }
    };

    fetchLyrics();
  }, [currentSong]);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToFavorites = (song) => {
    if (!favorites.includes(song)) {
      setFavorites([...favorites, song]);
    }
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
    if (isShuffling) {
      setSongs([...songs].sort(() => Math.random() - 0.5));
    }
  };

  return (
    <div className="bg-gray-800 shadow-2xl rounded-lg p-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search for songs"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-600 rounded-l-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white shadow-md"
        />
        <button className="bg-blue-500 text-white rounded-r-md flex items-center justify-center p-2 hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 2a8 8 0 105.66 13.66l4.88 4.88a1 1 0 001.41-1.41l-4.88-4.88A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
          </svg>
        </button>
      </div>
      <SongList songs={songs} playSong={playSong} addToFavorites={addToFavorites} />
      {currentSong && <NowPlaying song={currentSong} lyrics={lyrics} isRepeating={isRepeating} toggleRepeat={toggleRepeat} isShuffling={isShuffling} toggleShuffle={toggleShuffle} favorites={favorites} playSong={playSong} />}
    </div>
  );
};

export default MusicPlayer;
