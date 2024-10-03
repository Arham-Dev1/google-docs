// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDaSXEzrSCJmqMASFQ3yBMXu4SlTlgh-tk",
  authDomain: "docs-fced2.firebaseapp.com",
  projectId: "docs-fced2",
  storageBucket: "docs-fced2.appspot.com",
  messagingSenderId: "1067296297509",
  appId: "1:1067296297509:web:53e1c2f474dbab0b5265cc",
  measurementId: "G-TTJY3C213Z"
};

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore()
  
  export { db }