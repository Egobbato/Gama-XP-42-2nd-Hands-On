const formSelector = document.querySelector("#form");
const nameSelector = document.querySelector("#name-input");
const bannerSelector = document.querySelector("#banner-input");
const attractionsSelector = document.querySelector("#attractions-input");
const descriptionSelector = document.querySelector("#description-input");
const dateSelector = document.querySelector("#date-input");
const capacitySelector = document.querySelector("#capacity-input");

const querySelector = new URLSearchParams(window.location.search);

function placeInputValuesFromEvent(data) {
  nameSelector.value = data.name;
  bannerSelector.value = data.poster;
  attractionsSelector.value = data.attractions.join(", ");
  descriptionSelector.value = data.description;
  dateSelector.value = data.scheduled.substring(0, 16);
  capacitySelector.value = data.number_tickets;
}

formSelector.addEventListener("submit", (event) => {
  event.preventDefault();

  const body = {
    name: nameSelector.value,
    attractions: attractionsSelector.value.split(", "),
    poster: bannerSelector.value,
    description: descriptionSelector.value,
    scheduled: dateSelector.value,
    number_tickets: capacitySelector.value,
  };

  fetch(
    "https://xp41-soundgarden-api.herokuapp.com/events/" +
      querySelector.get("id"),
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }
  )
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
});

fetch(
  "https://xp41-soundgarden-api.herokuapp.com/events/" +
    querySelector.get("id"),
  { method: "GET" }
)
  .then((response) => response.json())
  .then((data) => placeInputValuesFromEvent(data))
  .catch((error) => console.error(error));
