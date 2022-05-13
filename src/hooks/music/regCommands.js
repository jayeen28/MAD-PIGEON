const client = require('../client/client');
const fs = require('fs');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");

//get the command files with .js extension from the container folder.
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith(".js"));
const commands = [];
client.commands = new Collection();

for (const file of commandFiles) {//loop through all the files which contains the commands.
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command)
}

/**
 * This function is used for registering commands when the ready event triggerd.
 */
const regCommands = async () => {
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: "9"
    }).setToken(process.env.BOT_TOKEN);

    (async () => {
        try {
            if (process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log('[+] Commands registered globally.')
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log('[+] Commands registered locally.')
            }
        }
        catch (err) {
            console.error(err)
        }
    })();
}

module.exports = regCommands;