const getWarningPrompt = (temperature, weatherCondition, windSpeed, humidity) => {
    const prompt = `Given the following weather data: 
  - Temperature: ${temperature}°C
  - Weather Condition: ${weatherCondition}
  - Wind Speed: ${windSpeed} m/s
  - Humidity: ${humidity}% 
  Please generate a list of recommendations for activities and precautions.`;

  return prompt;
}

module.exports = {
    getWarningPrompt
}


