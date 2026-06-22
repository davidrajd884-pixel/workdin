const workers =
JSON.parse(
localStorage.getItem("workers")
) || [];

const selectedPhone =
localStorage.getItem(
"selectedWorker"
);

const worker =
workers.find(
w => w.phone === selectedPhone
);

const container =
document.getElementById(
"workerProfileContainer"
);

if(worker){

container.innerHTML = `

<div class="worker-card">

<img
src="${
worker.photo
?
worker.photo
:
'https://via.placeholder.com/120'
}" 
class="worker-photo">

<h2>${worker.name}</h2>

<p class="profession-badge">
${worker.workType}
</p>

<p>📍 ${worker.location}</p>

<p>📞 ${worker.phone}</p>

<h3>⭐ Rate This Worker</h3>

<div class="rating-stars">

<span onclick="selectRating(1)">⭐</span>
<span onclick="selectRating(2)">⭐</span>
<span onclick="selectRating(3)">⭐</span>
<span onclick="selectRating(4)">⭐</span>
<span onclick="selectRating(5)">⭐</span>

</div>

<h3>📝 Write Feedback</h3>

<textarea
id="reviewText"
placeholder="Share your experience...">
</textarea>

<br><br>

<button onclick="submitReview()">
Submit Feedback
</button>

<hr>

<h3>📸 Previous Works</h3>

<input
type="file"
id="jobPhotos"
multiple
accept="image/*">

<br><br>

<button
onclick="uploadJobImages()">
Upload Photos
</button>

<div id="jobGallery"></div>

<hr>

<h3>Customer Reviews</h3>

<div id="reviewsList"></div>

</div>

`;

loadReviews();
setTimeout(loadGallery,100);

}

let selectedRating = 0;

function selectRating(rating){

selectedRating = rating;

alert(
rating + " Star Selected"
);

}

function submitReview(){

const reviewText =
document.getElementById(
"reviewText"
).value;

if(selectedRating === 0){

alert(
"Please select rating"
);

return;

}

const reviews =
JSON.parse(
localStorage.getItem(
"reviews"
)
) || [];

reviews.push({

workerPhone:
selectedPhone,

rating:
selectedRating,

review:
reviewText

});

localStorage.setItem(

"reviews",

JSON.stringify(reviews)

);

alert(
"Review Submitted"
);

loadReviews();

document.getElementById(
"reviewText"
).value = "";

}

function loadReviews(){

const reviews =
JSON.parse(
localStorage.getItem(
"reviews"
)
) || [];

const workerReviews =
reviews.filter(

review =>

review.workerPhone ===
selectedPhone

);

const reviewsList =
document.getElementById(
"reviewsList"
);

if(!reviewsList) return;

reviewsList.innerHTML = "";

workerReviews.forEach(

review => {

reviewsList.innerHTML += `

<div class="worker-card">

<p>
⭐ ${review.rating}/5
</p>

<p>
${review.review}
</p>

</div>

`;

});

}

function uploadJobImages(){

const files =
document.getElementById(
"jobPhotos"
).files;

if(files.length === 0){

alert("Select images");

return;

}

const images = [];

for(let i=0;i<files.length;i++){

const reader =
new FileReader();

reader.onload = function(e){

images.push(
e.target.result
);

if(images.length === files.length){

localStorage.setItem(

"jobImages_" +
selectedPhone,

JSON.stringify(images)

);

loadGallery();

}

};

reader.readAsDataURL(
files[i]
);

}

}

function loadGallery(){

const gallery =
document.getElementById(
"jobGallery"
);

if(!gallery) return;

const images =
JSON.parse(

localStorage.getItem(
"jobImages_" +
selectedPhone
)

) || [];

gallery.innerHTML = "";

images.forEach(img=>{

gallery.innerHTML += `

<img
src="${img}"
style="
width:120px;
height:120px;
object-fit:cover;
margin:10px;
border-radius:12px;
">

`;

});

}