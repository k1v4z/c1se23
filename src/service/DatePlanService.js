module.exports = class DatePlanService {
    constructor() {

    }

    //Ensure date time in activities >=  date time in plan
    //For Example: Date time in Plan - 2023-10-07T14:48:00.000Z
    //             Date Time in Activity - 2023-10-10T14:48:00.000Z
    //             => True

    //Ensure start time < end time
    validateDateActivities(plan) {
        const activities = plan.activities
        return activities.every((activity) => {
            return this.compareDate(plan.date, activity.start_time, activity.end_time);
        })
    }

    compareDate(planTime, startTime, endTime) {
        //T is time, avoid duplicate variable
        //Convert to date first to compare
        const planT = new Date(planTime)
        const startT = new Date(startTime)
        const endT = new Date(endTime)


        // check start, end vs plan time first
        if (startT - planT < 0 || endT - planT < 0) {
            return false
        }

        //Then check start time vs end time
        else if (endT - startT < 0) {
            return false
        }

        else {
            return true
        }
    }
}