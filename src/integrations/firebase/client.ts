// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDca9kTBulDg3dHgh9qgAxAFsJI8ESBMXE",
  authDomain: "bot-8463e.firebaseapp.com",
  projectId: "bot-8463e",
  storageBucket: "bot-8463e.firebasestorage.app",
  messagingSenderId: "1051558246691",
  appId: "1:1051558246691:web:0722ef2f2bdc77bf24f496",
  measurementId: "G-CDTFN2CTQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
