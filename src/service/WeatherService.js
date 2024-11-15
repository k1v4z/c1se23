const axios = require('axios');

module.exports = class WeatherService {
    constructor() {
        
    }

    //Get weather forecast based on location
    async getWeatherForecast(province) {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${province}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            // Extract necessary information
            const temperature = data.main.temp; // Nhiệt độ hiện tại (°C)
            const weatherCondition = data.weather[0].description; // Mô tả điều kiện thời tiết
            const windSpeed = data.wind.speed; // Tốc độ gió (m/s)
            const humidity = data.main.humidity; // Độ ẩm (%)

            return { temperature, weatherCondition, windSpeed, humidity };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }
}