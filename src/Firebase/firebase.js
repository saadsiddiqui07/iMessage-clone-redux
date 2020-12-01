import firebase from "firebase";

const firebaseConfig = {
 apiKey: "AIzaSyDGqzzFyf4DPhL4RZFsgm0kXzqDQRhWhf4",
  authDomain: "imessage-clone-07.firebaseapp.com",
  databaseURL: "https://imessage-clone-07.firebaseio.com",
  projectId: "imessage-clone-07",
  storageBucket: "imessage-clone-07.appspot.com",
  messagingSenderId: "525400812423",
  appId: "1:525400812423:web:1362c61ef658bcad6d0122",
  measurementId: "G-NKWTGBELC0"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
