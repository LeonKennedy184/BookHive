import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBnOiTohVpO3eoyL0-A0nfCeMPm1ezqh78",
    authDomain: "bookhive28.firebaseapp.com",
    projectId: "bookhive28",
    storageBucket: "bookhive28.appspot.com",
    messagingSenderId: "587997264943",
    appId: "1:587997264943:web:45df3854b96a2fa4ba5ada",
    measurementId: "G-D5BKKMXCE2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
