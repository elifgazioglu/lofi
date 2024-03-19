import React, { useEffect, useState } from "react";
import "./App.css";
import previousIcon from "./icons/previous.svg";
import nextIcon from "./icons/next.svg";
import playIcon from "./icons/play.svg";
import pauseIcon from "./icons/pause.svg";
import transition from "./gifs/static1.gif";

import Sound, { soundManager } from "react-sound";
import sound from "./songs/song2.mp3";

function App() {
  const [gifs, setGifs] = useState([]);
  const [currentGifIndex, setCurrentGifIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [songList, setSongList] = useState([]);
  const [showTransition, setShowTransition] = useState(false);

  const songs = require.context("./songs", true);

  //sorun oluyor mu bak eğer olacaksa fonksiyon yaz ve birleştir

  useEffect(() => {
    //songList state'e taşınacak. 2.si ne zaman songs değişirse songList update olmalı
    setSongList(songs.keys().map((song) => songs(song)));
  }, [songs]);

  useEffect(() => {
    if (window.soundManager) {
      window.soundManager.setup({ debugMode: false }); //
    }
  }, [window.soundManager]); //window'un SpoundManager'ı ne zaman değişirse bu useEffect çalışacak

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/gifs.json");
        if (!response.ok) {
          throw new Error("error: " + response.status);
        }
        const data = await response.json();
        setGifs(data.gifs);
        selectRandomGif(data.gifs.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const selectRandomGif = (length) => {
    const randomIndex = Math.floor(Math.random() * (length || gifs.length));
    setCurrentGifIndex(randomIndex);
  };

  const selectRandomSongs = () => {
    const randomIndex = Math.floor(Math.random() * songList.length);
    setCurrentSongIndex(randomIndex);
  };

  return (
    <div className="App">
      <div className="gif-container">
        {currentGifIndex !== null && (
          <img className="gifs" src={gifs[currentGifIndex]} />
        )}
      </div>
      <div className="crt-lines"></div>
      <div className="vignette"></div>
      <div className="dark"></div>
      <div className="button-container">
        <button className="change-gif-btn previous-btn">
          <img className="img-btn" src={previousIcon} alt="Previous" />
        </button>

        {isPlaying ? (
          <>
            <button
              className="change-gif-btn pause-btn"
              onClick={() => {
                setIsPlaying(false);
              }}
            >
              <img className="img-btn" src={pauseIcon} alt="Play" />
            </button>
          </>
        ) : (
          <>
            <button
              className="change-gif-btn play-btn"
              onClick={() => {
                setIsPlaying(true);
                selectRandomSongs();
              }}
            >
              <img className="img-btn" src={playIcon} alt="Play" />
            </button>
          </>
        )}
        <button
          className="change-gif-btn next-btn"
          onClick={() => {
            selectRandomGif();
            selectRandomSongs();
          }}
        >
          <img className="img-btn" src={nextIcon} alt="Next" />
        </button>
      </div>
      <Sound
        url={songList[currentSongIndex]}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        playFromPosition={300 /* in milliseconds */}
        // onLoading={this.handleSongLoading}
        // onPlaying={this.handleSongPlaying}
        onFinishedPlaying={selectRandomSongs}
      />
    </div>
  );
}

export default App;
