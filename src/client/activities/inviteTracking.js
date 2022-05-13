const client = require('../client');
const { handleMemberAdd, inviteCreate, inviteDelete } = require('../../hooks/leaderboard/handleInvites');

//This module handles the invitation system. Like when a new user joins the server, when a new invitation link is created or when a invitation link is deleted.
client.on('guildMemberAdd', async (member) => {
    member.guild.invites.fetch().then(invites => {
        handleMemberAdd(invites)
    })
})

client.on('inviteCreate', async invite => inviteCreate(invite))
client.on('inviteDelete', async invite => inviteDelete(invite.code))