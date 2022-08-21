const Invites = require('../../models/leaderboard/invites');
const { handleUserData } = require('./handleUserData');
const activityPoints = require('../../leaderboard/activityPoints/activityPoints');
/**
 * This function get called when a new user get in to the server.
 * @param {Array} invites It carries all the created invites by the users of the server.
 */
const handleMemberAdd = async (invites) => {
    const allInvites = await Invites.find({});//get all the invites from data base
    invites.forEach(async (invite) => {//loop through all the invites to know if the user has came from a invite link.
        const findIndex = allInvites.findIndex(invt => invt.code === invite.code);
        try {
            //if the data exists and the new uses missmatch with previous uses then it means the user has came from a invite link the inviter is the container of this uses data.(NOTE: uses means how many user has used this link to get into this server.)
            if (findIndex !== -1 && invite.uses !== allInvites[findIndex].uses) {
                await Invites.findOneAndUpdate({ code: invite.code }, {//the uses compare is done now we can update the database.
                    uses: invite.uses
                })
                //now update the user data with the specific points for inviting users.
                handleUserData({ ...invite.inviter, type: 'invites', value: activityPoints.invites })
            }
        }
        catch (err) { console.error(err) }
    })
}

/**
 * This function get hitted when a new invite link is been created by any user.
 * @param {Object} invite This object carries the invite code,uses and the id of the creator.
 */
const inviteCreate = async (invite) => {
    try {
        const updateInvites = new Invites({
            code: invite.code,
            uses: invite.uses,
            invitor: invite.inviter.id
        })
        await updateInvites.save();
    }
    catch (err) {
        console.error(err)
    }
}

/**
 * This function get hitted when a invitation link is deleted.
 * @param {String} code The code of the invitation link.
 */
const inviteDelete = async (code) => {
    try {
        await Invites.deleteOne({ code })
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = { handleMemberAdd, inviteCreate, inviteDelete };