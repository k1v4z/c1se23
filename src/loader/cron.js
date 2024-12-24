const prisma = require("../../prisma/db");
const appContainer = require("../container/registration/containerRegistration")
const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const cron = require('node-cron');

const slackService = appContainer.get(containerNames.SERVICE_CONTAINER).get(serviceNames.SLACK_SERVICE);

async function getPlan() {
    const plans = await prisma.plans.findMany({
        select: {
            date: true,
            user: {
                select: {
                    slackToken: {
                        select: {
                            accessToken: true,
                            channelId: true
                        }
                    }
                }
            },
            plan_on_province: {
                select: {
                    province: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });

    return plans
}

async function startCron() {
    // Run at 7 AM daily
    cron.schedule('54 23 * * *', async () => {
        try {
            console.log("Cron job started");

            const plans = await getPlan();
            console.log("Plans:", plans);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            for (const plan of plans) {
                const planDate = new Date(plan.date);
                planDate.setHours(0, 0, 0, 0);


                // Only send message if plan date is in the future
                if (planDate > currentDate) {
                    const messageBody = {
                        accessToken: plan.user.slackToken.accessToken,
                        channel: plan.user.slackToken.channelId,
                        province: plan.plan_on_province[0].province.name,
                        date: currentDate
                    };

                    await slackService.sendSlackMessage(messageBody);
                }
            }
        } catch (error) {
            console.error('Cron job error:', error);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh"
    });
}

module.exports = startCron
