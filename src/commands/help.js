const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkRole } = require('../hooks/common/checkUser');

const normalUserFields = [
    {
        name: 'points',
        value: 'This command will show the points for the user interactions.\n Example: /points'
    },
    {
        name: 'position',
        value: 'This command will show the position of the user in the leaderboard.\n Example: /position'
    },
    {
        name: 'playmusic',
        value: 'This command will play music from a youtube link.\n Example: /playmusic https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        name: 'controlmusic',
        value: 'This command will control the music. Available methods are: play,pause,stop.\n Example: /controlmusic:stop'
    },
    {
        name: 'help',
        value: 'This command will show informations about all the commands.\n Example: /help'
    }
]

const ownerOrAdminFields = [
    {
        name: 'addpoint',
        value: 'This command will add points to the targeted user. Type in the username as @username and then type in the point.\n Example: /addpoint @username 10'
    },
    {
        name: 'removepoint',
        value: 'This command will remove points from the targeted user. Type in the username as @username and then type in the point.\n Example: /removepoint @username 10'
    },
    {
        name: 'configpoints',
        value: 'This command will let you set the points for the user interactions.\nExample: /configpoints text 10'
    },
    {
        name: 'leaderboard',
        value: 'This command will show the top ten users from the leaderboard.\n Example: /leaderboard'
    },
    {
        name: 'points',
        value: 'This command will show the points for the user interactions.\n Example: /points'
    },
    {
        name: 'position',
        value: 'This command will show the position of the user in the leaderboard.\n Example: /position'
    },
    {
        name: 'userinvited',
        value: 'This command will show how many user has been joined from a specific users invite link.\n Example: /userinvited @username'
    },
    {
        name: 'playmusic',
        value: 'This command will play music from a youtube link.\n Example: /playmusic https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        name: 'controlmusic',
        value: 'This command will control the music. Available methods are: play,pause,stop.\n Example: /controlmusic:stop'
    },
    {
        name: 'help',
        value: 'This command will show informations about all the commands.\n Example: /help'
    }
]

const embedMessage = {
    color: '0x0099ff',
    title: 'Here are the commands of leadbot for you.',
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('This command will show you the list of commands.'),
    async execute(interaction) {
        const { normalUser } = await checkRole(interaction);
        if (!normalUser) {//if the user is the owner or the admin
            embedMessage.fields = ownerOrAdminFields;
        } else {
            embedMessage.fields = normalUserFields;
        }
        interaction.reply({
            embeds: [embedMessage],
            ephemeral: true
        })
    }
}