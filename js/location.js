const localContainer = document.querySelector(".chars-container");
const loadMoreButton = document.querySelector("#load-more");

const API = "https://rickandmortyapi.com/api";

const defaults = {
  name: "",
  type: "",
  dimension: "",
  page: 1,
};

async function getLocations({ name, type, dimension, page = 1 }) {
  const response = await fetch(
    `${API}/location?name=${name}&type?=${type}&dimension?=${dimension}&page=${page}`
  );

  const location = await response.json();

  return location.results;
}

async function render({ location }) {
  location.forEach((location) => {
    return (localContainer.innerHTML += `
        <div class="char">
        <div class="char-info">
          <h3>${location.name}</h3>
          <span>${location.type}</span>
        </div>
      </div>
        `);
  });
}

async function handleLoandMore() {
  defaults.page += 1;
  const location = await getLocations(defaults);
  render({ location });
}

function addListeners() {
  loadMoreButton.addEventListener("click", handleLoandMore);
}

async function main() {
  const location = await getLocations(defaults);
  addListeners();
  render({ location });
}

main();
