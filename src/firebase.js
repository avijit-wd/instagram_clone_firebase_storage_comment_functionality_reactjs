import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr3HmlvzMaJ5YKOi1x8aw1JGEDhl9Wbs8",
  authDomain: "insta-clone-27233.firebaseapp.com",
  projectId: "insta-clone-27233",
  storageBucket: "insta-clone-27233.appspot.com",
  messagingSenderId: "556536987140",
  appId: "1:556536987140:web:1a289b6d8b0a9521653f51",
  measurementId: "G-K62SD3NH53",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
