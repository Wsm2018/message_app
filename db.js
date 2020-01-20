import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAQTaHbGrvP6mEMLiTBVzmDL6QOYs0IHFE",
  authDomain: "messages-c612c.firebaseapp.com",
  databaseURL: "https://messages-c612c.firebaseio.com",
  projectId: "messages-c612c",
  storageBucket: "messages-c612c.appspot.com",
  messagingSenderId: "537953148662",
  appId: "1:537953148662:web:db97903171c3a2e9e996d7",
  measurementId: "G-FXFQQRS54D"
});

export default firebase.firestore();
