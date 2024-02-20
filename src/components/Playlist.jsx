import React from "react";

function Playlist({ audioList, onPlay, audioIndex }) {
  // Event handler to play audio when clicked
  const handlePlay = (index) => {
    onPlay(index);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ color: "#fff", textDecoration: "underline" }}>Playlist</h3>
      {audioList.length ? (
        audioList.map((audio, index) => (
          <div key={index}>
            <button
              style={{
                background: audioIndex === index ? "white" : "#b3b3b3",
                borderRadius: "1rem",
                padding: "3px",
                marginTop: "2px",
                cursor: "pointer",
              }}
              // Event emitter for playing audio when clicked
              onClick={() => {
                handlePlay(index);
              }}
            >
              {audio.name}
            </button>
          </div>
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </div>
  );
}

export default Playlist;
