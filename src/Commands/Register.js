const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { CreateUser } = require("../Modules/Database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Registers you to the database!"),
    
    async execute(Bot, Interaction){
        const UserId = Interaction.user.id;
        const Success = await CreateUser(UserId);
        if (Success){
            await Interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Register")
                        .setDescription("Successfully registered you to the database!")
                        .setColor("Green")
                ],
                ephemeral: true
            })
            return;
        }
        await Interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Register")
                    .setDescription("Failed to registered you to the database!")
                    .setColor("Red")
            ],
            ephemeral: true
        })
        return;
    }
}