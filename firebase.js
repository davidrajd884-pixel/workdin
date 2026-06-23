import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "workdin-a654f.firebaseapp.com",
projectId: "workdin-a654f",
storageBucket: "workdin-a654f.firebasestorage.app",
messagingSenderId: "938476466822",
appId: "1:938476466822:web:a6e143bd24bb13b106d707"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
db,
collection,
addDoc,
getDocs
};
