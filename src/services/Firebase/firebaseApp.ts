import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,

  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,

  appId: process.env.REACT_APP_FIREBASE_APPID
};

export default initializeApp(firebaseConfig);
