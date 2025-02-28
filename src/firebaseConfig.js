import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVGF9E87NbYFEEehmw2SQw_J2zoE3Qp90",
    authDomain: "loginreact-2a08a.firebaseapp.com",
    projectId: "loginreact-2a08a",
    storageBucket: "loginreact-2a08a.firebasestorage.app",
    messagingSenderId: "1011399137390",
    appId: "1:1011399137390:web:1991639269e901716fae7f",
    measurementId: "G-4727WS23Q0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
