import { useEffect, useState } from "react";

const useSongs = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [songList, setSongList] = useState([]);

  const songs = require.context("../songs", true);

  useEffect(() => {
    setSongList(songs.keys().map((song) => songs(song)));
  }, [songs]);

  const selectRandomSongs = () => {
    const randomIndex = Math.floor(Math.random() * songList.length);
    setCurrentSongIndex(randomIndex);
  };

  return {
    currentSong: songList[currentSongIndex],
    selectRandomSongs: selectRandomSongs
  }
};

export default useSongs;
