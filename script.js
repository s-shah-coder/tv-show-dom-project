// Variables
const cardContainerElem = document.querySelector(".card-container");
const showSearch = document.querySelector("#showSearch");
const selectSearch = document.getElementById("selectSearch");
const liveSearch = document.getElementById("liveSearch");
const episodeDisplayCount = document.getElementById("episodeDisplayCount");
const filteringDiv = document.getElementById("filtering-text");
const showLiveSearch = document.getElementById("showLiveSearch");
const showDisplayCount = document.getElementById("showDisplayCount");

// Get all episodes
let allEpisodes = getAllEpisodes();
let allShows = getAllShows().sort((a, b) => a.name.localeCompare(b.name));
let oneShow = getOneShow();

//Displays episode number with padded zeros
function padZero(num) {
  if (num < 10) return `0${num}`;
  else return num;
}

// Creates an episode card and appends it to the card container
function addEpisode(episode) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
                      <div class="name-div">
                        <h3>${episode.name} - S${padZero(
    episode.season
  )}E${padZero(episode.number)}</h3>
                      </div>
                      <img src="${episode.image.medium}" alt="">
                      ${episode.summary}
                   `;
  cardContainerElem.appendChild(card);
}
