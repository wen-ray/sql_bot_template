const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { RemoveUser, GetUser } = require("../Modules/Database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove_user")
        .setDescription("removes you or another user's (admin only) data from the database")
        .addStringOption(option => option.setName("user").setDescription("User id").setRequired(false)),
    
    async execute(Bot, Interaction){
        const TargetId = Interaction.options.getString("user");
        const UserId = Interaction.user.id;
        const UserData = await GetUser(UserId);
        if (!UserData || UserData.Role !== "admin"){
            await Interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Failed")
                        .setDescription("You're not an admin!!")
                        .setColor("Red")
                ],
                ephemeral: true
            });
            return;
        }
        RemoveUser(UserId, TargetId).then(async (Success) => {
            if (Success){
                await Interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Remove User")
                            .setDescription(`Successfully removed <@${TargetId}> from the database`)
                            .setColor("Green")
                    ],
                    ephemeral: true
                });
                return;
            }
            await Interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Failed")
                        .setDescription(`Failed to remove <@${TargetId}> from the database`)
                        .setColor("Red")
                ],
                ephemeral: true
            });
            return;
        }).catch(async () => {
            await Interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Failed")
                        .setDescription("Insufficient permissions")
                        .setColor("Red")
                ],
                ephemeral: true
            });
            return;
        });
    }
}