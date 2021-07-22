import { Avatar, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import '../styles/post.css';
import firebase from 'firebase';

function Post({ username, image, caption, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [{ userInfo }] = useStateValue();

  useEffect(() => {
    let unSubscribe;
    if (postId) {
      unSubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unSubscribe();
    };
  }, [postId]);

  const handlePost = () => {
    db.collection('posts').doc(postId).collection('comments').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      username: userInfo.displayName,
    });
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src={image} alt="Petergriffin" />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={image}></img>
      <p className="post__text">
        <strong>{username}</strong> {caption}
      </p>

      <div className="posted__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      <div className="comment__box">
        <input
          className="comment__text"
          value={comment}
          placeholder="add a comment..."
          type="text"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          disabled={!comment}
          className="comment__button"
          onClick={handlePost}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default Post;
