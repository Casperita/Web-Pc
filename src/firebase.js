import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { functions } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCQt1rXg78XmVNGS0azOC1JUoRGnqXOvrw",
  authDomain: "web-pc-af677.firebaseapp.com",
  projectId: "web-pc-af677",
  storageBucket: "web-pc-af677.appspot.com",
  messagingSenderId: "864568717728",
  appId: "1:864568717728:web:ede3c10971592e4d6a74c5",
  measurementId: "G-36X5RPX7N3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const delField = firebase.firestore.FieldValue.delete();
const orderByTime = firebase.firestore.FieldValue.serverTimestamp();






export { db, auth, storage, delField, orderByTime };