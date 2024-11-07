// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDVvmvb4AWYBYc0saIVWrBShNPwi7LJokc',
    authDomain: 'fir-app-545ef.firebaseapp.com',
    projectId: 'fir-app-545ef',
    databaseURL: 'https://fir-app-545ef-default-rtdb.europe-west1.firebasedatabase.app/',
    storageBucket: "fir-app-545ef.firebasestorage.app",
    messagingSenderId: "455495746649",
    appId: "1:455495746649:web:4b18d1b2a5ec5105565d48",
    measurementId: "G-15XZ9EPRNL"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        console.log('User signed in with google', response.user);
    } catch (error) {
        console.log('Error signing in with google', error);
    }
}

export default app;
