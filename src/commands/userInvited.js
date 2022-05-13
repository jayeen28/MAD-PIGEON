const { SlashCommandBuilder } = require('@discordjs/builders');
const findUser = require('../hooks/handleFindUser');
const Invites = require('../models/invites');
const { checkRole, isOwnReq } = require('../hooks/checkUser');

/**
 * This function is used for giving reply to the user.
 * @param {Object} interaction The interaction object.
 * @param {String} content The content of the reply.
 */
const hitReply = async (interaction, content) => {
    interaction.reply({
        content,
        ephemeral: true
    })
}

const showInvites = async (userInfo, interaction) => {//show the invites of the user
    const findRes = await Invites.findOne({ invitor: userInfo.userId });
    if (findRes) {
        hitReply(interaction, `${userInfo.userName} has ${findRes.uses} invites`);
    } else {
        hitReply(interaction, `${userInfo.userName} has not created any invites yet.`);
    }
}

//authenticate berfore sending the information to the commander.
const authenticate = async (userInfo, interaction) => {
    const { normalUser } = await checkRole(interaction);//check if the user is a normal user or admin
    if (!normalUser) {//if the user is the owner or the admin
        showInvites(userInfo, interaction);
    } else {//if the user is not the owner or the admin
        const checkRes = await isOwnReq(userInfo, interaction);
        checkRes ? showInvites(userInfo, interaction) : hitReply(interaction, `You can't see the invites of other users.`);//check if the normal user is the user who created the invite.
    }
}

const handleShow = async (interaction) => {
    const inputedData = interaction.options._hoistedOptions;//get the inputed data
    const userData = inputedData[0].value;//get the user data;
    findUser(userData, interaction)//search the user
        .then(userInfo => {
            authenticate(userInfo, interaction);
        })
        .catch(err => hitReply(interaction, err.message))
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinvited')
        .setDescription('This command will show how many people has joined from a users invite link.')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('The user to remove point from.')
                .setRequired(true)),
    async execute(interaction) {
        handleShow(interaction);
    }
}