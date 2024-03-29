import { useEffect, useState } from "react";

const useGifs = () => {
  const [gifList, setGifList] = useState([]);
  const [currentGifIndex, setCurrentGifIndex] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/gifs.json");
        if (!response.ok) {
          throw new Error("error: " + response.status);
        }
        const data = await response.json();
        setGifList(data.gifs);
        selectRandomGif(data.gifs.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const selectRandomGif = (length) => {
    const randomIndex = Math.floor(Math.random() * (length || gifList.length));
    setCurrentGifIndex(randomIndex);
  };

  return {
    currentGif: gifList[currentGifIndex],
    currentGifIndex,
    selectRandomGif: selectRandomGif,
  };
};

export default useGifs;
