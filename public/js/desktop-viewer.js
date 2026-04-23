let monuments = [];
let currentMonument = null;

async function init() {
await fetchMonuments();
renderFeatured();
}

async function fetchMonuments() {
try {
const res = await fetch('/data/monuments.json');
monuments = await res.json();
} catch (err) {
console.error('Error loading monuments:', err);
monuments = [];
}
}

function renderFeatured() {
const featured = monuments.filter(m => m.featured);
const container = document.getElementById('featuredList');


container.innerHTML = featured
    .map(m => `
        <div class="monument-card" onclick="loadMonument('${m.name}')">
            <h3>${m.name}</h3>
            <p>${m.location}</p>
            <p class="year">${m.year}</p>
        </div>
    `)
    .join("");


}

function loadMonument(name){

currentMonument = monuments.find(m => m.name === name)

const viewer = document.getElementById("modelViewer")
const sketchfab = document.getElementById("sketchfabViewer")

if(currentMonument.type === "glb"){

viewer.src = "/models/" + currentMonument.model
viewer.style.display = "block"
sketchfab.style.display = "none"

}

else if(currentMonument.type === "sketchfab"){

viewer.src = ""
viewer.style.display = "none"

sketchfab.innerHTML = `
<iframe
title="${currentMonument.name}"
frameborder="0"
allowfullscreen
allow="autoplay; fullscreen; xr-spatial-tracking"
src="${currentMonument.embed}"
style="width:100%;height:500px;border-radius:12px;">
</iframe>
`

sketchfab.style.display = "block"

}

}

info.innerHTML = `
    <div class="info-section">
        <h3>Overview</h3>
        <p>${currentMonument.overview}</p>
    </div>

    <div class="info-section">
        <h3>History</h3>
        <p>${currentMonument.history}</p>
    </div>

    <div class="info-section">
        <h3>Architecture</h3>
        <p>${currentMonument.architecture}</p>
    </div>

    <div class="info-section">
        <h3>Key Facts</h3>
        <ul>
            ${currentMonument.facts.map(f => `<li>${f}</li>`).join("")}
        </ul>
    </div>
`;




function searchMonument() {
const query = document
.getElementById('searchBox')
.value
.toLowerCase();


const result = monuments.find(m =>
    m.name.toLowerCase().includes(query)
);

if (result) {
    loadMonument(result.name);
    document.getElementById('searchBox').value = '';
} 
else {
    alert('Monument not found');
}


}

function launchAR() {
if (!currentMonument) {
alert('Please select a monument first');
return;
}


if (currentMonument.type === 'glb') {
    window.location.href = `/ar.html?model=${currentMonument.model}`;
} 
else {
    alert('AR not available for Sketchfab models');
}


}

document.addEventListener('DOMContentLoaded', init);
