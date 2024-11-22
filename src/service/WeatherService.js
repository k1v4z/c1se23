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

    async getClimateForecast(province, planDate) {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const url = `https://pro.openweathermap.org/data/2.5/forecast/climate?q=${province}&units=metric&appid=${apiKey}`

        try {
            const response = await axios.get(url);
            const data = response.data;

            // Convert userDate from DD/MM/YYYY format to Unix time
            const [day, month, year] = planDate.split('/').map(Number); // Tách ngày, tháng, năm

            // Tạo đối tượng Date từ ngày, tháng (trừ 1 vì tháng trong JS bắt đầu từ 0), năm
            const date = new Date(year, month - 1, day,12, 0, 0, 0);

            // Chuyển sang Unix Timestamp (bỏ phần millisecond)
            const unixTimestamp = Math.floor(date.getTime() / 1000);
            
            // Find the forecast for the user-provided date
            // const forecast = data.list.find(forecast => {
            //     const forecastDateUnix = new Date(forecast.dt).getTime() / 1000;
            //     return forecastDateUnix == unixTimestamp;
            // });
            let  forecast;
            for(const item of data.list){
                if(unixTimestamp == item.dt){
                    forecast = item
                    break;
                }
            }

            if (forecast) {
                const temperature = forecast.temp.max;
                const weatherCondition = forecast.weather[0].description;
                const windSpeed = forecast.speed;
                const humidity = forecast.humidity;

                return { temperature, weatherCondition, windSpeed, humidity };
            } else {
                console.error('No forecast data available for the provided date');
                return null;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }
}
