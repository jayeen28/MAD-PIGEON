const Points = require('../models/points');
const client = require('../client/client');
const token = process.env.BOT_TOKEN;//bot token

const findPoints = async () => {//get the points from database.
    const res = await Points.find({});
    if (res.length) return res[0]._doc;
    throw new Error('No points found');
}

const updateNewPoints = async (pointsData) => {//update the points in database.
    const points = await new Points(pointsData).save();
    return points._doc;
}

class ActivityPoints {//this class is used for management of the points.
    constructor() {
        this.getPoints;
        this.text = 0;
        this.reaction = 0;
        this.voicechat = 0;
        this.invites = 0;
    }
    get getPoints() {//gets the points from the database. If not found then update points on databse.
        findPoints()
            .then(res => {
                this.setPoints = res;
                client.login(token)
            })
            .catch(() => {
                updateNewPoints({ text: 2, reaction: 2, voicechat: 2, invites: 2 })
                    .then(points => {
                        this.setPoints = points;
                        client.login(token)
                    })
            });
    }
    set setPoints(points) {//sets the points to the constructor.
        Object.keys(points).forEach(key => {
            this[key] = points[key];
        })
    }
}

const activityPoints = new ActivityPoints();
module.exports = activityPoints;