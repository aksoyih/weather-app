const form = document.querySelector("form");
const searchText = document.querySelector("input");
const forecastDataShower = document.getElementById("forecastData");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  forecastDataShower.innerHTML = "Loading data...";

  const location = searchText.value;

  fetch("/weather?adress=" + encodeURI(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        forecastDataShower.innerHTML = data.error;
      } else {
        forecastDataShower.innerHTML = data.forecast;
      }
    });
  });
});
