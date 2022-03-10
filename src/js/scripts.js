import { setWithExpiry, getWithExpiry } from "./modules/localStorageHelpers.js";
import clickHandlers from "./modules/clickHandlers.js";
import { handleSubmit } from "./modules/forms.js";

document.addEventListener("click", clickHandlers);
const myForm = document.querySelector("form");
myForm.addEventListener("submit", handleSubmit);

// store the link plus the API key in a variable
const key = "XJYe53T8oZ9wRgPqxGVAs2NtPqId5pdL";
const API = `https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=${key}`;
const storagePrefix = "nyt-autosave";

function getStories() {
  const stories = getWithExpiry(storagePrefix);
  if (!stories) {
    console.warn(" stories expired - fetching again ");
    fetch(API)
      .then((response) => response.json())
      .then((data) => showData(data.results));
  } else {
    console.warn(" stories not expired - no fetching ");
    document.querySelector(".stories").innerHTML = stories;
  }
}

function showData(stories) {
  const looped = stories
    .map(
      (story) => `
    <div class="item">
    <img src="${story.multimedia ? story.multimedia[2].url : ""}" alt="${
        story.multimedia ? story.multimedia[2]?.caption : ""
      }" />
    <figcaption>${
      story.multimedia ? story.multimedia[2]?.caption : ""
    }</figcaption>
      <h3><a href="${story.url}">${story.title}</a></h3>
      <p>${story.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
  setWithExpiry(storagePrefix, looped, 1000 * 60 * 60);
}

if (document.querySelector(".home")) {
  getStories();
}
