import {
db,
collection,
addDoc,
getDocs
} from "./firebase.js";
let workers =  [];

/* ==========================
   REGISTER WORKER
========================== */

function registerWorker(){

const name = document.getElementById("name").value.trim();
const workType = document.getElementById("workType").value.trim();
const location = document.getElementById("location").value.trim();
const phone = document.getElementById("phone").value.trim();

if(!name || !workType || !location || !phone){
alert("Please fill all fields");
return;
}

/* Prevent same worker registering same profession */

const alreadyExists = workers.some(
worker =>
worker.name.toLowerCase() === name.toLowerCase() &&
worker.workType.toLowerCase() === workType.toLowerCase()
);

if(alreadyExists){
alert("⚠ You already have a profile for this profession");
return;
}

/* Photo upload */

const photoInput = document.getElementById("photo");
const jobPhotosInput =
document.getElementById("jobPhotos");

if(photoInput && photoInput.files.length > 0){

const file = photoInput.files[0];

const reader = new FileReader();

reader.onload = function(e){

saveWorker(
name,
workType,
location,
phone,
e.target.result,
jobPhotosInput
);

};

reader.readAsDataURL(file);

}else{

saveWorker(
name,
workType,
location,
phone,
"",
jobPhotosInput
);

}

}

/* ==========================
   SAVE WORKER
========================== */

async function saveWorker(
name,
workType,
location,
phone,
photo
){

const worker = {
name,
workType,
location,
phone,
photo
};

try{

await addDoc(
collection(db,"workers"),
worker
);

alert("✅ Worker Registered Successfully!");

document.getElementById("name").value="";
document.getElementById("workType").value="";
document.getElementById("location").value="";
document.getElementById("phone").value="";

if(document.getElementById("photo")){
document.getElementById("photo").value="";
}

}catch(error){

console.error(error);

alert("❌ Failed to save worker");

}

}

/* ==========================
   DISPLAY WORKERS
========================== */
function displayWorkers(workerList){

const container =
document.getElementById("workerContainer");

if(!container) return;

container.innerHTML = "";

if(workerList.length === 0){

container.innerHTML = `

<div class="worker-card">

<h2>😔 No Workers Found</h2>

<p>
Try another profession or location
</p>

</div>

`;

return;
}

workerList.forEach(worker => {

container.innerHTML += `

<div class="worker-card">

<div class="worker-top">

<img
src="${
worker.photo && worker.photo.trim() !== ""
? worker.photo
: "https://via.placeholder.com/150"
}"
class="worker-photo">

</div>

<h2>${worker.name}</h2>

<p class="profession-badge">

${worker.workType}

</p>

<p>

📍 ${worker.location}

</p>

<p>

📞 ${worker.phone}

</p>

<div class="worker-rating">

⭐⭐⭐⭐⭐

<span>
Verified Worker ✅
</span>

</div>

<div class="action-buttons">

<a
class="call-btn"
href="tel:${worker.phone}">
📞 Call
</a>

<a
class="whatsapp-btn"
href="https://wa.me/${worker.phone}"
target="_blank">
💬 WhatsApp
</a>

<button
class="profile-btn"
onclick="openProfile('${worker.phone}')">

👤 Profile

</button>

</div>

</div>

`;

});

}
function openProfile(phone){

localStorage.setItem(
"selectedWorker",
phone
);

window.location.href =
"worker-profile.html";

}
/* ==========================
   SEARCH WORKERS
========================== */

function searchWorkers(){

const search =
document.getElementById("searchInput")
.value
.toLowerCase();

const filtered =
workers.filter(worker =>

worker.name.toLowerCase().includes(search) ||

worker.workType.toLowerCase().includes(search) ||

worker.location.toLowerCase().includes(search) ||

worker.phone.includes(search)

);

displayWorkers(filtered);

}

/* ==========================
   FILTER CATEGORY
========================== */

function filterCategory(category){

if(category === "All"){

displayWorkers(workers);

return;

}

const filtered =
workers.filter(worker =>

worker.workType.toLowerCase() ===
category.toLowerCase()

);

displayWorkers(filtered);

}

/* ==========================
   DEVELOPMENT TOOL
========================== */

function clearWorkers(){

localStorage.removeItem("workers");

location.reload();

}

/* ==========================
   LOAD WORKERS
========================== */

if(document.getElementById("workerContainer")){

displayWorkers(workers);

}
function openProfile(phone){

localStorage.setItem(
"selectedWorker",
phone
);

window.location.href =
"worker-profile.html";
}
async function loadWorkers(){
const querySnapshot =
await getDocs(
collection(db,"workers")
);

workers = [];

querySnapshot.forEach(doc=>{

workers.push(doc.data());

});

if(document.getElementById("workerContainer")){
displayWorkers(workers);
}

}

loadWorkers();
window.registerWorker = registerWorker;
window.searchWorkers = searchWorkers;
window.filterCategory = filterCategory;
window.openProfile = openProfile;
