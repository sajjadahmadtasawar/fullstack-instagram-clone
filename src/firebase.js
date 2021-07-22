import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA1cesNEd-CvF96tAe01WVbltHMKky5mXw',
  authDomain: 'instagram-clone-4bed6.firebaseapp.com',
  projectId: 'instagram-clone-4bed6',
  storageBucket: 'instagram-clone-4bed6.appspot.com',
  messagingSenderId: '959433917674',
  appId: '1:959433917674:web:6604a2b7293c804511c393',
  measurementId: 'G-G9GQNJCQC0',
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
