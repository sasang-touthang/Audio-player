import React from "react";

function Uploader({ onChange, audioList, url, setAudioList, fileName }) {
  // eventHandler for file upload
  const handleClick = (e) => {
    e.preventDefault();

    const file = document.getElementById("file");
    // Get audioIndex from local storage
    const audioIndex = JSON.parse(localStorage.getItem("audioIndex"));

    if (file.files[0] === undefined) {
      return alert("Please select a file");
    }

    // Reset file when uploaded
    file.value = "";

    // set audioIndex to 0 if no file is uploaded yet
    if (!audioIndex) {
      localStorage.setItem("audioIndex", (0).toString());
    }

    // Check for duplicate for uploads and prevent
    const isDuplicate = audioList.find((audio) => audio.url === url);

    if (isDuplicate) {
      alert("File already added to playlist");
      return;
    }
    // Update audioList state
    const newAudioList = [...audioList, { url: url, name: fileName }];
    setAudioList(newAudioList);

    // Update audioList in the local storage
    const stringify = JSON.stringify(newAudioList);
    localStorage.setItem("playlist", stringify);
  };
  return (
    <div style={{ padding: "1rem" }}>
      <h2
        style={{
          padding: "1rem",
          textAlign: "center",
          color: "#fff",
          textDecoration: "underline",
        }}
      >
        Choose audio to upload
      </h2>

      {/* Upload section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          id="file"
          type="file"
          accept="audio/*"
          multiple
          onChange={onChange}
          style={{ color: "#fff", borderRadius: "1rem", cursor: "pointer" }}
        />
        <button
          style={{ width: "50px", borderRadius: "1rem", cursor: "pointer" }}
          onClick={handleClick}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Uploader;
