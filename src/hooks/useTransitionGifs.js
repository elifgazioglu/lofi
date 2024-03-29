import { useEffect, useState } from "react";

const useTransitionGifs = () => {
  const [showTransition, setShowTransition] = useState(false);
  const [transitionGifList, setTransitionGifList] = useState([]);
  const [currentTransitionGifIndex, setCurrentTransitionGifIndex] =
    useState(null);
  const transitionGifs = require.context("../transitionGifs", true);

  useEffect(() => {
    setTransitionGifList(
      transitionGifs
        .keys()
        .map((transitionGif) => transitionGifs(transitionGif))
    );
  }, [transitionGifs]);

  const selectRandomTransitionGifs = () => {
    const randomIndex = Math.floor(Math.random() * transitionGifList.length);
    setCurrentTransitionGifIndex(randomIndex);
  };

  const handleGifTransition = () => {
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
    }, 250);
  };

  return {
    currentTransitionGif: transitionGifList[currentTransitionGifIndex],
    handleGifTransition,
    selectRandomTransitionGifs,
    showTransition
  };
};

export default useTransitionGifs;
