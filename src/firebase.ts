// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyA8K9DdqjiiEbVifEta3qqgOEdzq2NWn2s",
    authDomain: "todo-app-dab43.firebaseapp.com",
    projectId: "todo-app-dab43",
    storageBucket: "todo-app-dab43.appspot.com",
    messagingSenderId: "557735077664",
    appId: "1:557735077664:web:b48e7dcd3aad3a43a49945",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
