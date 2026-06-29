// ==============================
// firebase.js
// WORKDIN Firebase Configuration
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDIpwCvxlpzIiWv6hoDaHSFCRJ7X41-gGU",
    authDomain: "workdin-a654f.firebaseapp.com",
    projectId: "workdin-a654f",
    storageBucket: "workdin-a654f.firebasestorage.app",
    messagingSenderId: "938476466822",
    appId: "1:938476466822:web:a6e143bd24bb13b106d707"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Storage
const storage = getStorage(app);

// Export everything used by the project
export {
    db,
    storage,

    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,

    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
};;
