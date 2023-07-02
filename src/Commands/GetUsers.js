const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GetUser } = require("../Modules/Database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("get_info")
        .setDescription("get the information of users")
        .addBooleanOption(option => option.setName("all").setDescription("get all user's information").setRequired(false))
        .addStringOption(option => option.setName("user_id").setDescription("the id of the user you want to get the information of").setRequired(false)),
    
    async execute(Bot, Interaction){
        const GetAll = Interaction.options.getBoolean("all") || false;
        const TargetId = Interaction.options.getString("user_id") || null;
        const UserId = Interaction.user.id;
        const data = await GetUser(TargetId ? TargetId : UserId, GetAll);
        const SuccessEmbed = new EmbedBuilder()
            .setTitle("Get Info")
            .setColor("Green");

        if (!data){
            await Interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Command failed")
                    .setDescription(`Failed to get information of ${GetAll ? "all users" : "your "}`)
                    .setColor("Red")
                ],
                ephemeral: true
            });
        }
        for (let i = 0; i < data.length; i++){
            const { id, money } = data[i];
            SuccessEmbed.addFields({
                name: `<@${id}>`,
                value: money.toString(),
            });
        }
        await Interaction.reply({
            embeds: [ SuccessEmbed ],
            ephemeral: true
        });
        return;
    }
}