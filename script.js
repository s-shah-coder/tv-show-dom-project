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

//Function to check image
function checkForImage(showImage) {
  if (showImage === null) return "";
  else return showImage;
}

// Creates an show card and appends it to the card container
function addShow(show) {
  const showCard = document.createElement("div");
  showCard.classList.add("show-card");
  showCard.setAttribute("id", `${show.name}`);
  showCard.innerHTML = `
                        <div class="show-name-div">
                          <h1>${show.name}</h1>
                        </div>         
                        <img src="${checkForImage(
                          show.image.medium
                        )}" alt=""></img>
                        <div class="summary-div">
                          ${show.summary}
                        </div>
                        <div class="show-info-div">
                          <ul>
                            <li><strong>Rated</strong>: ${
                              show.rating.average
                            }</li>
                            <li><strong>Genres</strong>: ${show.genres.join(
                              " | "
                            )}</li>
                            <li><strong>Status</strong>: ${show.status}</li>
                            <li><strong>Runtime</strong>: ${show.runtime}</li>
                          </ul>
                        </div>
                   `;
  showCard.addEventListener("click", (e) => {
    selectSearch.classList.remove("on-show-hide");
    liveSearch.classList.remove("on-show-hide");
    episodeDisplayCount.classList.remove("on-show-hide");

    filteringDiv.classList.add("on-episode-hide");
    showLiveSearch.classList.add("on-episode-hide");
    showDisplayCount.classList.add("on-episode-hide");

    let selectedShow = allShows.filter(
      (show) => show.name === e.currentTarget.id
    );
    let selectedShowId = selectedShow[0].id;

    fetchEpisodes(selectedShowId);
    showSearch.value = e.currentTarget.id;
  });
  cardContainerElem.appendChild(showCard);
}

//Function to display all shows
function displayAllShows() {
  cardContainerElem.innerHTML = "";
  allShows.forEach((show) => addShow(show));
  let showListLength = allShows.length;
  console.log(showListLength);
  showDisplayCount.textContent = `Found ${showListLength} shows`;
}

//Function to add every show to showSearch
function addShowsToShowList(showList) {
  showSearch.innerHTML = `<option value="all">All Shows</option>`;
  showList.forEach((show) => {
    const option = document.createElement("option");
    option.value = `${show.name}`;
    option.innerText = `${show.name}`;
    showSearch.appendChild(option);
  });
  console.log(showList);
}

//Function that displays every episode
function displayAllEpisodes(allEpisodes) {
  cardContainerElem.innerHTML = "";
  allEpisodes.forEach((episode) => addEpisode(episode));
  selectSearch.innerHTML = `<option value="all">All</option>`;
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = `${episode.name}`;
    option.innerText = `S${padZero(episode.season)}E${padZero(
      episode.number
    )} - ${episode.name}`;
    selectSearch.appendChild(option);
  });
  let count = allEpisodes.length;
  episodeDisplayCount.innerHTML = `Displaying ${count}/${allEpisodes.length} episodes`;
}

//Fetch Function
function fetchEpisodes(id) {
  //Fetch
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      console.log("made an api call");
      allEpisodes = data;
      displayAllEpisodes(allEpisodes);
    })
    .catch((error) => console.log(error));
}
