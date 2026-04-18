import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOIRtz8h9h4u2AJ7kEeINGnV9XCk6xup4",
    authDomain: "disco-dispatch-493610-i4.firebaseapp.com",
    projectId: "disco-dispatch-493610-i4",
    storageBucket: "disco-dispatch-493610-i4.firebasestorage.app",
    messagingSenderId: "669710233968",
    appId: "1:669710233968:web:9c2b7ac88fe813da559fb5",
    measurementId: "G-1LXXVM5BRP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);