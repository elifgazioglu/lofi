import React, { useState } from "react";

const useVolume = (initialVolume = 0) => {
  const [volume, setVolume] = useState(initialVolume);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 8; i++) {
      const isActive = i < volume;
      boxes.push(
        <div
          key={i}
          className={`green-box ${isActive ? "active" : ""}`}
          onClick={() => handleVolumeChange(i + 1)}
        />
      );
    }
    return boxes;
  };

  return {
    volume,
    renderVolumeControl: () => <div className="pointer">{renderBoxes()}</div>,
  };
};

export default useVolume;
