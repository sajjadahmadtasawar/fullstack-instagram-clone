import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { db, storage } from '../firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
import '../styles/imageupload.css';
function ImageUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [{ userInfo }] = useStateValue();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClick = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              image: url,
              username: userInfo.displayName,
            });
            setProgress(0);
            setCaption('');
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="image__upload">
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" className="image__file" onChange={handleChange} />
      <Button onClick={handleClick}>Post</Button>
    </div>
  );
}

export default ImageUpload;
