import React, { useState } from "react";

const useVolume = (initialVolume = 4) => {
  const [volume, setVolume] = useState(initialVolume);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    console.log(newVolume);
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 8; i++) {
      const isActive = i < volume;
      boxes.push(
        <div
          className="green-box-container"
          onClick={() => handleVolumeChange(i + 1)}
        >
          <div
            key={i}
            className={`green-box ${isActive ? "active-box" : ""}`}
          />
        </div>
      );
    }
    return boxes;
  };

  return {
    volume: volume * 12.5,
    renderVolumeControl: () => <div className="pointer">{renderBoxes()}</div>,
  };
};

export default useVolume;
