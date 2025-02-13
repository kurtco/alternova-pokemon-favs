// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXnTzQt0h8AjjA0EwO8jU4uw26sXAN9OU",
  authDomain: "pokemon-app-alternova.firebaseapp.com",
  projectId: "pokemon-app-alternova",
  storageBucket: "pokemon-app-alternova.firebasestorage.app",
  messagingSenderId: "906454016526",
  appId: "1:906454016526:web:30ea02e48e83f4425d925f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
