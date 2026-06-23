import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAgz62QVCfzBnxIFUOGYEwqZADQ5_Dve0A",
authDomain: "workdin-52c98.firebaseapp.com",
projectId: "workdin-52c98",
storageBucket: "workdin-52c98.firebasestorage.app",
messagingSenderId: "209402633140",
appId: "1:209402633140:web:5c73ce636c4244dde030e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };