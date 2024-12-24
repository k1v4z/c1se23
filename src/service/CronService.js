const cron = require('cron');
const prisma = require('../../prisma/db');
const GeminiService = require('../service/GeminiService');
const SlackService = require('../service/SlackService');

class WeatherNotificationCron {
    constructor() {
        this.geminiService = new GeminiService();
        this.slackService = new SlackService();
    }

    startCron() {
        const job = new cron.CronJob('0 1 * * *', async () => {
            try {
                // Get tomorrow's date
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);

                // Query plans with user slack tokens and provinces for tomorrow
                const plans = await prisma.plans.findMany({
                    where: {
                        date: tomorrow,
                        users: {
                            slackTokens: {
                                isNot: null
                            }
                        }
                    },
                    include: {
                        users: {
                            include: {
                                slackTokens: true
                            }
                        },
                        plan_on_province: {
                            include: {
                                provinces: true
                            }
                        }
                    }
                });

                // Send notifications for each plan
                for (const plan of plans) {
                    // Get province name from the first province in plan_on_province
                    const province = plan.plan_on_province[0]?.province.name;

                    if (province && plan.user.slackToken) {
                        const messageBody = {
                            accessToken: plan.user.slackToken.accessToken,
                            channel: plan.user.slackToken.channelId,
                            province: province,
                            date: plan.date
                        };

                        await this.slackService.sendSlackMessage(messageBody);
                    }
                }

            } catch (error) {
                console.error('Cron job error:', error);
            }
        }, null, true, 'Asia/Ho_Chi_Minh');

        job.start();
    }
}

module.exports = new WeatherNotificationCron();