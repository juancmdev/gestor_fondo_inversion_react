// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0v6_PHJzr1Z4m9rziisNXblBeNPMN_tk",
  authDomain: "gestor-inversion.firebaseapp.com",
  databaseURL: "https://gestor-inversion-default-rtdb.firebaseio.com",
  projectId: "gestor-inversion",
  storageBucket: "gestor-inversion.firebasestorage.app",
  messagingSenderId: "1004052601336",
  appId: "1:1004052601336:web:cfbe58cf631ba430511e0d",
  measurementId: "G-CS46CR77VM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
