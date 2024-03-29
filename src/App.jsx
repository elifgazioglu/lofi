import React, {useState } from "react";
import "./App.css";
import previousIcon from "./icons/previous.svg";
import nextIcon from "./icons/next.svg";
import playIcon from "./icons/play.svg";
import pauseIcon from "./icons/pause.svg";
import useQuotes from "./hooks/useQuotes";
import useSongs from "./hooks/useSongs";
import useVolume from "./hooks/useVolume";
import useGifs from "./hooks/useGifs";
import useTransitionGifs from "./hooks/useTransitionGifs";
import Music from "./Music";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentQuote } = useQuotes();
  const { currentSong, selectRandomSongs } = useSongs();
  const { currentGif, currentGifIndex, selectRandomGif } = useGifs();
  const { volume, renderVolumeControl } = useVolume();
  const {
    currentTransitionGif,
    handleGifTransition,
    selectRandomTransitionGifs,
    showTransition,
  } = useTransitionGifs();

  return (
    <div className="App">
      <div className="gif-container">
        <img
          className={`transition-gif ${showTransition ? "show" : ""}`}
          src={currentTransitionGif}
        />
        {currentGifIndex !== null && <img className="gifs" src={currentGif} />}
      </div>
      <div className="crt-lines"></div>
      <div className="vignette"></div>
      <div className="dark"></div>
      <div className="button-container">
        <div className="text">
          <span>{currentQuote}</span>
        </div>
        <div className="button">
          <button
            className="change-gif-btn previous-btn"
            onClick={() => {
              handleGifTransition();
              selectRandomGif();
              selectRandomSongs();
              selectRandomTransitionGifs();
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
              selectRandomTransitionGifs();
            }}
          >
            <img className="img-btn" src={nextIcon} alt="Next" />
          </button>
          {renderVolumeControl()}
        </div>
      </div>
      <Music
        isPlaying={isPlaying}
        volume={volume}
        currentSong={currentSong}
        selectRandomSongs={selectRandomSongs}
      />
    </div>
  );
}

export default App;
