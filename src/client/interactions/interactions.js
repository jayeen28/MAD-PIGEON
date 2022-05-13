const client = require('../client');

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction)
    } catch (err) {
        console.error(err)
        await interaction.reply({
            content: "An error occured while executing that command.",
            ephemeral: true
        })
    }
})