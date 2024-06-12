import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs52ss-PiRE5f2evEEmppHmjYE3bE_Lpw",
  authDomain: "chatroom-io-9422e.firebaseapp.com",
  projectId: "chatroom-io-9422e",
  storageBucket: "chatroom-io-9422e.appspot.com",
  messagingSenderId: "203150986483",
  appId: "1:203150986483:web:bb3996e683591534f53b86",
  measurementId: "G-D6J34ETPFC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);