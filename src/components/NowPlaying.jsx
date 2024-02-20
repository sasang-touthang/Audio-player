import React, { useEffect, useRef } from "react";

function NowPlaying({ src, name, onEnded }) {
  // Reference the audio player
  const audioRef = useRef(null);

  // Load the saved playback time from localStorage, or start at 0 if not found.
  const savedTime = parseFloat(localStorage.getItem("currentTime")) || 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set the audio currentTime to the saved playback position.
      audio.currentTime = savedTime;

      const handleTimeUpdate = () => {
        // Update localStorage with the current playback position.
        localStorage.setItem("currentTime", audio.currentTime);
      };

      const handleEnded = () => {
        // Reset the playback position in localStorage when the audio ends.
        localStorage.setItem("currentTime", 0);
        if (onEnded) {
          // Go to next audio when current audio ends
          onEnded();
        }
      };

      // Add event listeners for time updates and when the audio ends.
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [src, onEnded, savedTime]);

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={{ color: "#fff", textDecoration: "underline" }}>
        Now Playing: {name || "Please save a song first"}
      </div>
      <audio id="audio" controls src={src} ref={audioRef} autoPlay />
    </div>
  );
}

export default NowPlaying;
