import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCkPAME7LvVXe5V15TkbAAX8J4_m9F4yRg",
  authDomain: "circleup-7da4d.firebaseapp.com",
  projectId: "circleup-7da4d",
  storageBucket: "circleup-7da4d.appspot.com",
  messagingSenderId: "792870786061",
  appId: "1:792870786061:web:0d965a4ab1a90da6fdf144",
  measurementId: "G-5Q6DLSBWQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}