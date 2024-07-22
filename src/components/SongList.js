import React from 'react';

const SongList = ({ songs, playSong, addToFavorites }) => {
  return (
    <div className="song-list mb-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Song List</h2>
      {songs.length > 0 ? (
        <ul className="space-y-2">
          {songs.map(song => (
            <li
              key={song.id}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded cursor-pointer flex justify-between items-center transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <span onClick={() => playSong(song)} className="flex-1">
                {song.title} - {song.artist.name}
              </span>
              <button
                onClick={() => addToFavorites(song)}
                className="ml-4 text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              >
                <i className="fas fa-heart"></i>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No songs found</p>
      )}
    </div>
  );
};

export default SongList;
