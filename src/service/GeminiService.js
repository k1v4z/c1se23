const axios = require("axios");
const model = require("../config/gemini");

module.exports = class GeminiService {
  constructor(weatherService) {
    this.weatherService = weatherService;
  }

  //Get recommendation based on real time weather forecast
  async getRecommendation(province) {
    const weatherData = await this.weatherService.getWeatherForecast(province);
    const { temperature, weatherCondition, windSpeed, humidity } = weatherData;

    const prompt = `
        The user is planning to travel or go outdoors, and I need to send a personalized message that will influence their decision based on the current weather conditions. Here are the details:
    - Weather Condition: ${weatherCondition}
    - Temperature: ${temperature}°C
    - Wind Speed: ${windSpeed} m/s
    - Humidity: ${humidity}%

    Please generate a message that helps the user make a decision about whether to proceed with their plans. If the weather is poor or potentially dangerous (e.g., storms, heavy rain, high winds. etc...), issue a warning and suggest safe alternatives or precautions. If the weather is good and safe for outdoor activities, send a positive, encouraging message with one or two suggested activities. The message should be clear, concise, and friendly, influencing the user's decision effectively. Avoid listing too many activities.

    Example:
    - For bad weather: "The forecast shows heavy rain and strong winds. It might not be the best day for outdoor adventures. Consider rescheduling or choosing an indoor activity to stay safe."
    - For good weather: "The weather looks great with sunny skies and a pleasant temperature of 22°C. It's a wonderful day to enjoy outdoor plans like a nature walk or a picnic. Have a fantastic time!"
    Note: Respone as object following this string format: {
        "weather_forecast": "Combine all the weather data into a single sentence.",
        "recommendation": "The generated message based on the weather conditions."
      Return value as JSON string and remove tag json
    }
    `;

    const results = await model.generateContent(prompt);
    const convertedResults = results.response
      .text()
      .replace(/```json\n/, "")
      .replace(/\n```/, "");
    return JSON.parse(convertedResults);
  }

  async getSuggestLocation(data) {
    //weather forecast data json
    //{predict: lightrain, temp, wind, humidity}
    const { planDate, province, weatherForecast } = data;
    //Call api thoi tiet
    const weatherData = await this.weatherService.getClimateForecast(province, planDate);
    
    const prompt = `
      Role: Generator
      Context: Location: ${province}, weather forecast: ${weatherData}, plan date: ${planDate}
      Task: Generate list suggestion based on location and weather forecast
      Output format: {
      "name": Name of location and unaccented letters ,
      "address": address of location and unaccented letters and follo this format: house number + address street, district name, province name
      "open_at": open time format (HH:MM),
      "close_at": close time format(HH:MM)",
      "longitude": number,
      "latitude": number,
      "imageUrl": "https://image.pollinations.ai/+name of location translated to english and separated by hyphens"
      "transportation": string
      "money": money suggest for location (VND)
      "start_date": ISO string (must be greater or equal plan date)
      "end_date": ISO string (must be greater or equal plan date)
      "locationType": Must be same as one of theses ['Accomodation','Food','Museum', 'Visit']
      }
      Example output json: [{
      "name": "Com Hen Hanh",
      "address": "11 Truong Chinh, Thanh Khe, Da Nang",
      "open_at": "06:30",
      "close_at": "13:00",
      "longitude": 107.585,
      "latitude": 16.4637,
      "imageUrl": "https://image.pollinations.ai/prompt/mussel-rice-ha",
      "transportation": "Air Plane"
      "money": "2.000.000 VND"
      "start_date":  2024-11-21T17:00:00.000Z
      "end_date":  2024-11-22T17:00:00.000Z
      "locationType": "Food"
      }, {
      "name": "Com Hen Hanh",
      "address": "11 Truong Chinh, Thanh Khe, Da Nang",
      "open_at": "06:30",
      "close_at": "13:00",
      "longitude": 107.585,
      "latitude": 16.4637,
      "imageUrl": "https://image.pollinations.ai/prompt/mussel-rice-hanh",
      "transportation": "Air Plane"
      "money": "2.000.000 VND"
      "start_date":  2024-11-21T17:00:00.000Z
      "end_date":  2024-11-22T17:00:00.000Z
      "locationType": "Food"
      }]
      Note: all fields in json required and list at least 15 items and latitude, longitude must be correct absolutely with address name`;
    

    const results = await model.generateContent(prompt);

    const convertedResults = results.response
      .text()
      .replace(/```json\n/, "") 
      .replace(/\n```/, "");
    return JSON.parse(convertedResults);
  }
};
