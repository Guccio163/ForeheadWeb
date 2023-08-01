// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1gbzBBRxVtVkp5uzn1Qw8w7WDLHnF69Q",
  authDomain: "czolko-ff0b5.firebaseapp.com",
  projectId: "czolko-ff0b5",
  storageBucket: "czolko-ff0b5.appspot.com",
  messagingSenderId: "660874588948",
  appId: "1:660874588948:web:acb96ad627cb4d96aa0801",
  measurementId: "G-HEXPXB5G58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
