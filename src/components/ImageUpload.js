import React, { useState } from "react";
import "./ImageUpload.css";
import { Button } from "@material-ui/core";
import { db, storage } from "../firebase";
import firebase from "firebase";

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    //   It uploaded the image and created a ref in storage
    if (image !== null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      // Checking realtime changes
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },

        (error) => {
          console.log(error);
          alert(error.message);
        },
        //   Final completed function and getting a url of image from storage and putting it on DB to track
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageURL: url,
                username: username,
              });
              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    }
  };
  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter a caption..."
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
