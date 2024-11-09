const apiKey = 'f2700912e52b42aba5b110405240911'; // Replace with your actual API key from WeatherAPI
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity'); // New element for humidity
const errorMessage = document.getElementById('errorMessage');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherData(city);
  }
});

async function fetchWeatherData(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        showError("City not found.");
      } else if (response.status === 503) {
        showError("Service is temporarily unavailable.");
      } else {
        showError("An unexpected error occurred.");
      }
      return;
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    showError("Network error. Please check your connection.");
  }
}

function displayWeatherData(data) {
  cityName.textContent = data.location.name;
  temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
  condition.textContent = `Condition: ${data.current.condition.text}`;
  humidity.textContent = `Humidity: ${data.current.humidity}%`; // Display humidity

  weatherInfo.classList.remove('hidden');
  errorMessage.classList.add('hidden');
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  weatherInfo.classList.add('hidden');
}
