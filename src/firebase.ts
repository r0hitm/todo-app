/**
 * Initialize Firebase and provide wrapper functions for authentication and database in the app.
 */
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVUI7WRSc-mfdFvYQ2QwflBuJpVOX4z9w",
    authDomain: "todo-app-11d74.firebaseapp.com",
    projectId: "todo-app-11d74",
    storageBucket: "todo-app-11d74.appspot.com",
    messagingSenderId: "554638288884",
    appId: "1:554638288884:web:13ad3ebdc7269b01613ba1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Sign in a user with Google.
 * @returns A promise that resolves with the user credential
 */
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

/**
 * Sign out the current user.
 */
const signOutUser = () => {
    return signOut(auth);
};

export { auth, db, signInWithGoogle, signOutUser };
