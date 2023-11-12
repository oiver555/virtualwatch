// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD32iNM-bcxu3PfQl_R-Dv89pDENxZF0EY",
    authDomain: "virtual-watch.firebaseapp.com",
    projectId: "virtual-watch",
    storageBucket: "virtual-watch.appspot.com",
    messagingSenderId: "701409325872",
    appId: "1:701409325872:web:46292afa00f8fc37614ef5",
    measurementId: "G-N4QGP2DWSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("Firebase Initialized");
export default analytics