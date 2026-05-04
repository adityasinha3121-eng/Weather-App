 const API_KEY = "0a291386df2b4a0898b12919251912"; // 🔑 replace this

const weatherDiv = document.getElementById("weather");
const errorText = document.getElementById("error");

async function searchWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  if (!cityInput) return;

  // 🔥 FORCE INDIA
  const query = `${cityInput},IN`;

  fetchWeather(query);
}

// Auto-detect location on load
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`);
    });
  }
};

async function fetchWeather(query) {
  try {
    errorText.textContent = "";
    weatherDiv.classList.add("hidden");

    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    displayWeather(data);

  } catch (err) {
    errorText.textContent = "City not found!";
  }
}

function displayWeather(data) {
  weatherDiv.classList.remove("hidden");

  document.getElementById("location").textContent =
    `${data.location.name}, ${data.location.country}`;

  document.getElementById("icon").src =
    "https:" + data.current.condition.icon;

  document.getElementById("temp").textContent =
    `🌡 Temperature: ${data.current.temp_c}°C`;

  document.getElementById("condition").textContent =
    `☁ Condition: ${data.current.condition.text}`;

  document.getElementById("humidity").textContent =
    `💧 Humidity: ${data.current.humidity}%`;

  document.getElementById("wind").textContent =
    `🌬 Wind: ${data.current.wind_kph} km/h`;
}
