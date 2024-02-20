import React, { useState, useEffect } from "react";
import "./App.css";
import Uploader from "./components/Uploader";
import Playlist from "./components/Playlist";
import NowPlaying from "./components/NowPlaying";
import "./App.css";

function App() {
  // Get the audioIndex from localStorage when first file is uploaded
  const audioStorage = JSON.parse(localStorage.getItem("audioIndex"));

  const [audioList, setAudioList] = React.useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  // Declare url and fileName for playlist upload
  const [url, setUrl] = useState();
  const [fileName, setFileName] = useState();
  // Decalre url and filename for audio player
  const src = audioList.length && audioList[currentAudioIndex]?.url;
  const name = audioList.length && audioList[currentAudioIndex]?.name;

  useEffect(() => {
    // Get saved audioList from local storage and update state
    const playlist = localStorage.getItem("playlist");
    if (playlist) {
      setAudioList(JSON.parse(playlist));
    }
  }, []);

  useEffect(() => {
    // Plays same audio when reload
    setCurrentAudioIndex(audioStorage);
  }, [audioStorage]);

  // File upload event handler
  const handleChange = (e) => {
    e.preventDefault();

    let fr = new FileReader();
    // Get audio name from file
    let audioName = e.target.files[0].name;

    // Convert audio to base64 encoded string
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", () => {
      let btoaUrl = fr.result;
      setUrl(btoaUrl);
      setFileName(audioName);
    });
  };

  // Event handler to continue to next audio
  const handlePlayNext = () => {
    setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audioList.length);
    localStorage.setItem(
      "audioIndex",
      ((currentAudioIndex + 1) % audioList.length).toString()
    );
  };

  // Event handler to play audio when clicked
  const handlePlay = async (index) => {
    localStorage.setItem("currentTime", 0);
    localStorage.setItem("audioIndex", index.toString());
    setCurrentAudioIndex(index);
  };

  return (
    <div className="container">
      <Uploader
        fileName={fileName}
        url={url}
        audioList={audioList}
        setAudioList={setAudioList}
        onChange={handleChange}
      />

      <Playlist
        audioIndex={currentAudioIndex}
        audioList={audioList}
        onPlay={handlePlay}
      />
      <NowPlaying src={src} name={name} onEnded={handlePlayNext} />
    </div>
  );
}

export default App;
