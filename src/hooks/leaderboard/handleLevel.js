const handleDm = require('./handleDm')

const bonus = {//bonus points for each level
    10: 1000,
    20: 2000
}

let levels = {}//levels object.
for (let i = 0; i <= 25; i++) {//generate the levels
    let position = parseInt(Object.keys(levels)[i - 1]);
    let pre = position ? position : 0;
    levels[i * 1000 + pre] = i
}

/**
 * This function will handle the user level.
 * @param {Object} userData This object carries the user data of the message.
 */
const handleLevel = async (userData) => {
    try {
        const { points, userId, level } = userData;
        if (typeof points !== 'number') throw new Error('Please provide me valid points !')
        if (points < 1000) {//If points is less than 1000 then level is 0
            level !== 0 && handleDm(userId, `You have been upgraded to level 0.`)
            return { checkedLevel: 0, added: 0 }
        };
        const levelKeys = Object.keys(levels);//get the keys of the levels
        const findLevelkey = levelKeys.find((key, i) => points >= parseInt(key) && points < parseInt(levelKeys[i + 1]));//find the level key
        let checkedLevel;
        findLevelkey ? checkedLevel = levels[findLevelkey] : checkedLevel = 25;//if level key is not found then set the level to 25
        if (level !== checkedLevel) {
            let levelRange;
            if (level < 10 && checkedLevel >= 10 && checkedLevel < 20) {
                levelRange = 10
            } else if (level < 20 && checkedLevel >= 20) {
                levelRange = 20;
            }

            if (bonus[levelRange]) {//if level exists in bonus object then update bonus points
                handleDm(userId, `You have been upgraded to level ${checkedLevel}.`);
                return { checkedLevel, added: bonus[levelRange] }
            }
            else {
                handleDm(userId, `You have been upgraded to level ${checkedLevel}`);//if level changed then send message to user.
                return { checkedLevel, added: 0 }
            }
        }
        return { checkedLevel, added: 0 }
    } catch (err) {
        throw console.error(err)
    }
}

module.exports = handleLevel;