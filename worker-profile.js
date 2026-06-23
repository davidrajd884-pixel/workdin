import {
db,
collection,
getDocs
}
from "./firebase.js";

async function loadWorkerProfile(){

const selectedPhone =
localStorage.getItem(
"selectedWorker"
);

if(!selectedPhone){

document.getElementById(
"workerProfileContainer"
).innerHTML =
"<h2>No Worker Selected</h2>";

return;
}

const snapshot =
await getDocs(
collection(db,"workers")
);

let found = false;

snapshot.forEach(doc=>{

const worker = doc.data();

if(worker.phone === selectedPhone){

found = true;

const reviewsHtml =
(worker.reviews || [])
.map(review =>

`<li>${review}</li>`

).join("");

const photosHtml =
(worker.jobPhotos || [])
.map(photo =>

`<img
src="${photo}"
class="gallery-image">`

).join("");

document.getElementById(
"workerProfileContainer"
).innerHTML =

`
<div class="worker-card">

<img
src="${
worker.photo ||
'https://via.placeholder.com/150'
}"
class="worker-photo">

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

Rating:
${worker.rating || 5}/5

</span>

</div>

<h3>

📸 Previous Work

</h3>

<div id="myGallery">

${photosHtml ||

"<p>No work photos uploaded</p>"}

</div>

<h3>

💬 Reviews

</h3>

<ul>

${reviewsHtml ||

"<li>No reviews yet</li>"}

</ul>

</div>
`;

}

});

if(!found){

document.getElementById(
"workerProfileContainer"
).innerHTML =

"<h2>Worker Not Found</h2>";

}

}

loadWorkerProfile();
