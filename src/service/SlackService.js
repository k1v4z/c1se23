const { default: axios } = require("axios");
const { WebClient } = require('@slack/web-api');

require("dotenv").config({ path: "../../.env" });
const client =  new WebClient(process.env.SLACK_BOT_TOKEN);

module.exports = class SlackService {
    constructor(geminiService) {
        this.geminiService = geminiService;
    }

    async sendSlackMessage(messageBody) {
        const province = 'Ho Chi Minh';
        const message = await this.geminiService.getRecommendation(province);

        const block = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "🌦️ Weather Alert for Your Plan!",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*Hey <@${messageBody.channel}>! Here's your weather update for your upcoming plan.*\n\n*🗓️ Date:* 2024-11-13\n*📍 Location:* ${province}\n\n*🌦️Weather Forecast:* ${message.weather_forecast}`
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `:umbrella_with_rain_drops: *Recommendations:* ${message.recommendation}`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "image",
                        "image_url": "https://path-to-weather-icon.png",
                        "alt_text": "weather_icon"
                    },
                    {
                        "type": "mrkdwn",
                        "text": "_Stay safe and have a great day!_"
                    }
                ]
            }
        ]

        // Gửi tin nhắn qua Slack API
        try {
            await client.chat.postMessage({
                channel: messageBody.channel,
                blocks: block
            });
   
            return true;
        } catch (error) {
            console.error('Error sending message to Slack:', error);
            return false;
        }
    }
};
