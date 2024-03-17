import React, { useEffect, useState } from "react";
import "./App.css";
import previousIcon from "./icons/previous.svg";
import nextIcon from "./icons/next.svg";
import playIcon from "./icons/play.svg";
import Sound from "react-sound";
import sound from "./songs/song2.mp3";

function App() {
  const [gifs, setGifs] = useState([]);
  const [currentGifIndex, setCurrentGifIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="App">
      <div className="gif-container">
        {currentGifIndex !== null && (
          <img className="gifs" src={gifs[currentGifIndex]} />
        )}
      </div>
      <div className="button-container">
        <button className="change-gif-btn previous-btn">
          <img className="img-btn" src={previousIcon} alt="Previous" />
        </button>
        <button
          className="change-gif-btn play-btn"
          onClick={() => setIsPlaying(true)}
        >
          <img className="img-btn" src={playIcon} alt="Play" />
        </button>
        <button
          className="change-gif-btn next-btn"
          onClick={() => selectRandomGif()}
        >
          <img className="img-btn" src={nextIcon} alt="Next" />
        </button>
      </div>
      <Sound
        url={sound}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        playFromPosition={300 /* in milliseconds */}
        // onLoading={this.handleSongLoading}
        // onPlaying={this.handleSongPlaying}
        // onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    </div>
  );
}

export default App;
