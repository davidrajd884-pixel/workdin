import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDIpwCvxlpzIiWv6hoDaHSFCRJ7X41-gGU",
authDomain: "workdin-a654f.firebaseapp.com",
projectId: "workdin-a654f",
storageBucket: "workdin-a654f.firebasestorage.app",
messagingSenderId: "938476466822",
appId: "1:938476466822:web:a6e143bd24bb13b106d707"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;