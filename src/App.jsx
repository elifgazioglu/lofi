import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gifs, setGifs] = useState([]);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/gifs.json");
        if (!response.ok) {
          throw new Error("error: " + response.status);
        }
        const data = await response.json();
        setGifs(data.gifs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const selectRandomGif = () => {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    setCurrentGifIndex(randomIndex);
  };

  return (
    <div className="App">
      <div className="gif-container">
        <img src={gifs[currentGifIndex]} />
      </div>
      <button onClick={selectRandomGif}>Random gif</button>
    </div>
  );
}

export default App;
