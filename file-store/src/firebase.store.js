import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyApXCzHMQlDLrmmb6uQ5cRKkjKfytir744",
    authDomain: "lineupapp-d1e9e.firebaseapp.com",
    projectId: "lineupapp-d1e9e",
    storageBucket: "lineupapp-d1e9e.appspot.com",
    messagingSenderId: "226154531465",
    appId: "1:226154531465:web:6fe546865d9bd7263a9458"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;