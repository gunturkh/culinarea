import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC9DXonrTkks_G4xolFAynI6bx947-WGu8",
  authDomain: "culinarea-app.firebaseapp.com",
  databaseURL: "https://culinarea-app.firebaseio.com",
  projectId: "culinarea-app",
  storageBucket: "culinarea-app.appspot.com",
  messagingSenderId: "280768220454",
  appId: "1:280768220454:web:0c493fab361fbf5e4d85e7",
  measurementId: "G-9PSWFMSE7P",
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

