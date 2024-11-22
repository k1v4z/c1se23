const { WebClient } = require('@slack/web-api');

require("dotenv").config({ path: "../../.env" });
const client = new WebClient(process.env.SLACK_BOT_TOKEN);

module.exports = class SlackService {
    constructor(geminiService) {
        this.geminiService = geminiService;
    }

    async sendSlackMessage(messageBody) {
        //Step 1: Get activity location (address) (join 2 table activity & activity location) from database which have start date > current date 1 day
        //Step 2: Xử lý kết quả của address ví dụ  4 An Thuong 3, Ngu Hanh Son, Da Nang thành Da Nang bằng split
        //Step 3: Gửi request lên Gemini API để lấy thông tin thời tiết và recommendation
        //Step 4: Lấy access token và channel từ database của cái người mà set 1 cái activities trên plan (join 5 table )
        //Step 5: Gửi message qua Slack API
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
