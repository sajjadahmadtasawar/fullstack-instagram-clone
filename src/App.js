import React, { useState, useEffect } from 'react';
import './App.css';
import ImageUpload from './component/ImageUpload';
import Post from './component/Post';
import SignIn from './component/signIn';
import SignUp from './component/signUp';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import InstagramEmbed from 'react-instagram-embed';

function App() {
  const [post, setPost] = useState([]);
  const [{ userInfo }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) =>
      setPost(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
        ></img>
        <div className="signingIn">
          <SignUp />
          <SignIn />
        </div>
      </div>

      {post.map(({ id, post }) => (
        <Post
          postId={id}
          key={id}
          username={post.username}
          image={post.image}
          caption={post.caption}
        />
      ))}

      {userInfo.displayName ? (
        <ImageUpload />
      ) : (
        <h1>You should be logged in to post</h1>
      )}
    </div>
  );
}

export default App;
