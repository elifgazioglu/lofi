import React, { useEffect, useState } from "react";
import "./App.css";
import previousIcon from "./icons/previous.svg";
import nextIcon from "./icons/next.svg";
import playIcon from "./icons/play.svg";
import pauseIcon from "./icons/pause.svg";
import transition from "./transitionGifs/static1.gif";

import Sound, { soundManager } from "react-sound";
import sound from "./songs/song2.mp3";

function App() {
  const [gifs, setGifs] = useState([]);
  const [currentGifIndex, setCurrentGifIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [songList, setSongList] = useState([]);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionGifsList, setTransitionGifsList] = useState([]);
  const [currentTransitionGifIndex, setCurrentTransitionGifIndex] = useState(null);


  const songs = require.context("./songs", true);
  const transitionGifs = require.context("./transitionGifs", true);

  //sorun oluyor mu bak eğer olacaksa fonksiyon yaz ve birleştir

  useEffect(() => {
    //songList state'e taşınacak. 2.si ne zaman songs değişirse songList update olmalı
    setSongList(songs.keys().map((song) => songs(song)));
  }, [songs]);

  useEffect(() => {
    setTransitionGifsList(
      transitionGifs
        .keys()
        .map((transitionGif) => transitionGifs(transitionGif))
    );
  }, [transitionGifs]);

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

  const selectRandomTransitionGifs = () => {
    const randomIndex = Math.floor(Math.random() * transitionGifsList.length);
    setCurrentTransitionGifIndex(randomIndex);
  };

  const handleGifTransition = () => {
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
    }, 250);
  };

  return (
    <div className="App">
      <div className="gif-container">
        <img
          className={`transition-gif ${showTransition ? "show" : ""}`}
          src={transitionGifsList[currentTransitionGifIndex]}
        ></img>
        {currentGifIndex !== null && (
          <img className="gifs" src={gifs[currentGifIndex]} />
        )}
      </div>
      <div className="crt-lines"></div>
      <div className="vignette"></div>
      <div className="dark"></div>
      <div className="button-container">
        <button
          className="change-gif-btn previous-btn"
          onClick={() => {
            handleGifTransition();
            selectRandomGif();
            selectRandomSongs();
            selectRandomTransitionGifs()
          }}
        >
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
            handleGifTransition();
            selectRandomGif();
            selectRandomSongs();
            selectRandomTransitionGifs()
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
