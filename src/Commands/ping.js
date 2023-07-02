const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(Bot, Interaction) {
        const Message = await Interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true });
        await Interaction.editReply({
            content: "",
            embeds: [
                new EmbedBuilder()
                    .setTitle(":ping_pong: Pong!")
                    .addFields(
                        {
                            name: ":stopwatch: Uptime",
                            value: `${Math.round(Interaction.client.uptime / 60000)} minutes`,
                            inline: false
                        },
                        {
                            name: ":sparkling_heart: Websocket heartbeat",
                            value: `${Interaction.client.ws.ping}ms`,
                            inline: false
                        },
                        {
                            name: ":round_pushpin: Roundtrip Latency",
                            value: `${Message.createdTimestamp - Interaction.createdTimestamp}ms`,
                            inline: false
                        }
                    )
                    .setColor("Green")
            ],
            ephemeral: true
        });
    }
};