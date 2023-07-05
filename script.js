const accessKey = "bh6dbOTpYFdnm0Il9ugYtzdR29Lt0UtIiTwe81C406c";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-box");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value; // take the input text value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; // dynamic url

  const response = await fetch(url); // fetch the data form the url and store in response
  const data = await response.json(); // convert into json format and store in data

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    // duplicate container for search-result
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    //duplicate for image
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
