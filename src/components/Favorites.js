import React from 'react';

const Favorites = ({ songs, playSong }) => {
  return (
    <div className="favorites mb-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
      {songs.length > 0 ? (
        <ul className="space-y-2">
          {songs.map(song => (
            <li
              key={song.id}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded cursor-pointer transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              onClick={() => playSong(song)}
            >
              {song.title} - {song.artist.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No favorite songs</p>
      )}
    </div>
  );
};

export default Favorites;
