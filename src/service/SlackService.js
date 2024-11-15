const { default: axios } = require("axios");
require("dotenv").config({ path: "../../.env" });

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
                    "text": `*Hey <@${messageBody.channel}>! Here's your weather update for your upcoming plan.*\n\n*🗓️ Date:* 2024-11-13\n*📍 Location:* ${province}\n\n*Weather Forecast:* ${message.weather_forecast}`
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
        const response = await axios.post(
            "https://slack.com/api/chat.postMessage",
            {
                channel: messageBody.channel, // ID kênh hoặc người dùng
                blocks: block, // Nội dung tin nhắn
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Kiểm tra phản hồi từ API Slack
        if (!response.data.ok) {
            throw new Error(`Failed to send message: ${response.data.error}`);
        }

        return response.data
    }
};
