const axios = require("axios");
const model = require("../config/gemini");
const fs = require('fs')
const path = require('path');
const ExistedError = require("../errors/ExistedError");

const locationTypeData = JSON.parse(fs.readFileSync(path.join(__dirname, 'locationType.json'), 'utf8'));

module.exports = class GeminiService {
  constructor(weatherService, activityLocationService) {
    this.weatherService = weatherService;
    this.activityLocationService = activityLocationService;
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
    const { planDate, province } = data;
    //Call api thoi tiet
    const weatherData = await this.weatherService.getClimateForecast(province, planDate);

    const prompt = `
      Role: Generator
      Context: Location: ${province}, weather forecast: ${weatherData.weatherCondition}, ${weatherData.temperature},${weatherData.windSpeed}, ${weatherData.humidity}, plan date: ${planDate}, Type: ${data.type}
      Task: Generate list suggestion to protect health of tourist  based on location and weather forecast in context given above. Example: Storm should recommend user in door. Heavy rain recommend user location in door like Restaurant. vincom, ... etc.
      If have type data, only generate location match with this type. Example: If type is check in, only generate location belong to check in type
      Output format: {
      "id": ""
      "name": Name of location and unaccented letters ,
      "address": address of location and unaccented letters and folloư this format: house number + address street name, district name, province name
      "open_at": open time format (HH:MM),
      "close_at": close time format(HH:MM)",
      "longitude": number,
      "latitude": number,
      "imageUrl": "https://image.pollinations.ai/+name of location translated to english and separated by hyphens"
      "transportation": string
      "money": money suggest for location (VND)
      "start_date": ISO string (must be greater or equal plan date)
      "end_date": ISO string (must be greater or equal plan date)
      "locationType": Must be same as one of theses ['Accomodation','Food','Museum', 'Visit','Checkin']
      }
      Example output json: [{
      "id": ""
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
      "id": ""
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
      Note: all fields in json required and list at least 15 items and latitude, longitude must be correct absolutely with address name
      all fields in json required and list at least 15 items and latitude, longitude must be correct absolutely with address name. 
      If weather forecast is storm or thunder, json format is a list item have one element  and response it json.
      [{
      "id": ""
      "name": "Indoor Activities",
      "address": "Your Hotel/Home Room",
      "open_at": "00:00",
      "close_at": "23:59",
      "longitude": 108.178457,
      "latitude": 16.033881,
      "imageUrl": "https://image.pollinations.ai/prompt/indoor-activities",
      "transportation": "None",
      "money": "0 VND",
      "start_date": "2024-11-20T17:00:00.000Z",
      "end_date": "2024-11-21T17:00:00.000Z",
      "locationType": "Accomodation"
      }]`;


    const results = await model.generateContent(prompt);

    const convertedResults = results.response
      .text()
      .replace(/```json\n/, "")
      .replace(/\n```/, "");

    const suggestLocation = JSON.parse(convertedResults);


    for (const location of suggestLocation) {
      // const locationType = location.locationType;
      // if (locationTypeData.LocationType[locationType]) {
      //   const images = locationTypeData.LocationType[locationType];
      //   const randomImage = images[Math.floor(Math.random() * images.length)];
      //   location.imageUrl = randomImage;
      // }

      try {
        const result = await this.activityLocationService.createActivityLocation(location);
        
        location.id = result.id;
      } catch (err) {
        if (err instanceof ExistedError) {
          const existingLocation = await this.activityLocationService.getActivityLocationByName(location.name, location.address);

          location.id = existingLocation.id;
          continue;
        }
      }
    }


    return {
      suggestLocation,
      weather: {
        temperature: weatherData.temperature,
        windSpeed: weatherData.windSpeed,
        humidity: weatherData.humidity,
        weatherCondition: weatherData.weatherCondition,
        deg: weatherData.deg,
        pressure: weatherData.pressure,
        icon: weatherData.icon
      }
    }
  }
};
