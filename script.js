//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const eachEpisode = document.createElement("div");

  // eachEpisode.className = "eachBox"

  episodeList.map((element) => {
    
  const show = document.createElement("div")
  const h3 = document.createElement("h3");
  const img = document.createElement("img");
  const episodeInfo = document.createElement("p")

  eachEpisode.className = "eachBox"

  
  

  })

}

window.onload = setup;
