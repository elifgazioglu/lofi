import React, { useEffect} from "react";
import Sound from "react-sound";

function Music({ isPlaying, volume, currentSong, selectRandomSongs }) {
  useEffect(() => {
    if (window.soundManager) {
      window.soundManager.setup({ debugMode: false });
    }
  }, [window.soundManager]);

  return (
    <Sound
      url={currentSong}
      playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
      onFinishedPlaying={selectRandomSongs}
      volume={volume}
    />
  );
}

export default Music;
