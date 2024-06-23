import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVv4lRRTMJJMRJnwrZLY0Eacj_rNJE6a4",
  authDomain: "chat-room-4be1c.firebaseapp.com",
  projectId: "chat-room-4be1c",
  storageBucket: "chat-room-4be1c.appspot.com",
  messagingSenderId: "766391704837",
  appId: "1:766391704837:web:91f5e3537ad52b8f426b6c",
  measurementId: "G-NC7RC10H3Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);