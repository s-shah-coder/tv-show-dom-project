//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

const filteredShows = getAllEpisodes();
const rootElem = document.getElementById("root");
const header = document.createElement("div");
let search = document.createElement("input");
const grid = document.createElement("div");
grid.className = "eachBox";
header.appendChild(search);
rootElem.appendChild(header);

header.className = "header";
search.className = "search";

function output() {
  search.addEventListener("keyup", (e) => {
    const res = e.target.value;
    const filtered = filteredShows.filter((movie) => {
      return movie.name.includes(res) || movie.summary.includes(res);
    });

    return filtered;
  });
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const eachEpisode = document.createElement("div");

  eachEpisode.className = "eachBox";

  episodeList.map((element) => {
    const show = document.createElement("div");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");
    const episodeInfo = document.createElement("p");

    // eachEpisode.className = "eachBox"

    rootElem.appendChild(eachEpisode);
    eachEpisode.appendChild(show);
    show.appendChild(h3);
    show.appendChild(img);
    show.appendChild(episodeInfo);

    show.className = "episodeShow";
    h3.className = "episodeTitle";
    episodeInfo.className = "summary";
    img.className = "img";

    h3.innerHTML = ` ${element.name} - S0${element.season}E0${element.number} `;
    img.src = `${element.image.medium} `;
    episodeInfo.innerHTML = `${element.summary}`;
    return element;
  });
}

window.onload = setup;
