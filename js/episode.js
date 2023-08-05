const episodeContainer = document.querySelector(".chars-container");
const loadMoreButton = document.querySelector("#load-more");

const API = "https://rickandmortyapi.com/api";

const defaults = {
  name: "",
  air_date: "",
  episode: "",
  page: 1,
};

async function getEpisodes({ name, air_date, episode, page = 1 }) {
  const response = await fetch(
    `${API}/episode?name=${name}&air_date?=${air_date}&numero?=${episode}&page=${page}`
  );

  const episodes = await response.json();

  return episodes.results;
}

async function render({ episodes }) {
  episodes.forEach((episodes) => {
    return (episodeContainer.innerHTML += `
        <div class="char">
        <div class="char-info">
          <h3>${episodes.name}</h3>
          <h4>${episodes.episode}</h4>
          <span>${episodes.air_date}</span>
        </div>
      </div>`);
  });
}

async function handleLoandMore() {
  defaults.page += 1;
  const episodes = await getEpisodes(defaults);
  render({ episodes });
}

function addListener() {
  loadMoreButton.addEventListener("click", handleLoandMore);
}



async function main() {
  const episodes = await getEpisodes(defaults);
  addListener();
  render({ episodes });
}

main();
