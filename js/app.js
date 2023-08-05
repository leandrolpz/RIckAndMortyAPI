const charsContainer = document.querySelector(".chars-container");
const searchInput = document.querySelector("#search");

const speciesFilter = document.querySelector("#species");
const genderFilter = document.querySelector("#gender");
const statusFilter = document.querySelector("#status");
const loadMoreButton = document.querySelector("#load-more");

const API = "https://rickandmortyapi.com/api";

const defaultFilters = {
  name: "",
  species: "",
  gender: "",
  status: "",
  page: 1,
};

async function getCharacters({ name, species, gender, status, page = 1 }) {
  const response = await fetch(
    `${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`
  );

  const characters = await response.json();

  return characters.results;
}

async function render({ characters }) {
  characters.forEach((characters) => {
    return (charsContainer.innerHTML += `
        <div class="char">
        <img src="${characters.image}" alt="">
        <div class="char-info">
          <h3>${characters.name}</h3>
          <span>${characters.species}</span>
        </div>
      </div>
        `);
  });
}

function handleFilterChange(type, e) {
  return async () => {
    defaultFilters[type] = e.target.value;
    charsContainer.innerHTML = "";
    const characters = await getCharacters(defaultFilters);
    render({ characters });
  };
}

async function handleLoadMore() {
  defaultFilters.page += 1;
  const characters = await getCharacters(defaultFilters);
  render({ characters });
}

function addListeners() {
  speciesFilter.addEventListener("change", async (e) => {
    handleFilterChange("species", e)();
  });

  genderFilter.addEventListener("change", async (e) => {
    handleFilterChange("gender", e)();
  });

  statusFilter.addEventListener("change", async (e) => {
    handleFilterChange("status", e)();
  });

  searchInput.addEventListener("keyup", async (e) => {
    handleFilterChange("name", e)();
  });

  loadMoreButton.addEventListener("click", handleLoadMore);
}

async function main() {
  const characters = await getCharacters(defaultFilters);
  addListeners();
  render({ characters });
}

main();
