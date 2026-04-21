let monuments=[]
let speech=null

fetch("/data/monuments.json")
.then(res=>res.json())
.then(data=>{
monuments=data
showFeatured()
})


document.getElementById("searchBox").addEventListener("keyup",function(){

let query=this.value.toLowerCase()

let monument=monuments.find(m=>m.name.toLowerCase().includes(query))

if(monument){

loadMonument(monument)

}

})


function loadMonument(monument){

speechSynthesis.cancel()

let modelViewer=document.getElementById("modelViewer")
let sketchfabViewer=document.getElementById("sketchfabViewer")

modelViewer.style.display="none"
sketchfabViewer.style.display="none"


if(monument.type==="glb"){

modelViewer.src="/models/"+monument.model
modelViewer.style.display="block"

}

if(monument.type==="sketchfab"){

sketchfabViewer.innerHTML=`
<iframe
src="${monument.embed}"
style="width:100%;height:500px;"
allowfullscreen>
</iframe>
`

sketchfabViewer.style.display="block"

}


let factsHTML=""

if(monument.facts){

monument.facts.forEach(f=>{
factsHTML+=`<li>${f}</li>`
})

}


document.getElementById("info").innerHTML=`

<div class="monument-card">

<h2 class="monument-title">${monument.name}</h2>

<div class="voice-controls">

<button onclick="playNarration()">▶ Play</button>
<button onclick="pauseNarration()">⏸ Pause</button>
<button onclick="resumeNarration()">⏯ Resume</button>
<button onclick="stopNarration()">⏹ Stop</button>

</div>

<div class="monument-meta">
<span>📍 ${monument.location}</span>
<span>🏛 Built: ${monument.year}</span>
</div>

<div class="info-section">
<h3>Overview</h3>
<p>${monument.overview}</p>
</div>

<div class="info-section">
<h3>History</h3>
<p>${monument.history}</p>
</div>

<div class="info-section">
<h3>Architecture</h3>
<p>${monument.architecture}</p>
</div>

<div class="info-section">
<h3>Interesting Facts</h3>
<ul>${factsHTML}</ul>
</div>

</div>
`

}



function showFeatured(){

let container=document.getElementById("featuredList")

let featured=monuments.filter(m=>m.featured)

featured.forEach(m=>{

let card=document.createElement("div")

card.className="card"

card.innerHTML=`

<h3>${m.name}</h3>
<p>${m.location}</p>

<button onclick='loadMonument(${JSON.stringify(m)})'>
Explore
</button>

`

container.appendChild(card)

})

}



function playNarration(){

let text=document.getElementById("info").innerText

speech=new SpeechSynthesisUtterance(text)

speech.rate=0.9
speech.pitch=1
speech.lang="en-US"

speechSynthesis.cancel()
speechSynthesis.speak(speech)

}


function pauseNarration(){

if(speechSynthesis.speaking){

speechSynthesis.pause()

}

}


function resumeNarration(){

if(speechSynthesis.paused){

speechSynthesis.resume()

}

}


function stopNarration(){

speechSynthesis.cancel()

}