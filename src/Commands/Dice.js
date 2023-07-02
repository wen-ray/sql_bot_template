const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GetUser, CreateUser, UpdateUser } = require("./../Modules/Database");
const { STARTING_VALUE } = require("./../Config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dice")
        .setDescription("Earn money by playing dice"),
    async execute(Bot, Interaction){
        const DiceResults = Math.floor(Math.random() * 6) + 1;
        let Earnings = 0;
        if (Earnings < 4){
            Earnings = DiceResults - 4;
        } else {
            Earnings = DiceResults - 3;
        }
        const UserId = Interaction.user.id;
        const SavedData = await GetUser(UserId);
        let FinalVal = 0;
        if (!SavedData){
            const CreateStatus = await CreateUser(UserId);
            if (!CreateStatus){
                console.error(`Failed to create user with id <@${UserId}>`);
                await Interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Command failed")
                            .setDescription("Failed to add user to database")
                            .setColor("Red")
                    ],
                    ephemeral: true
                });
                return;
            }
            FinalVal = STARTING_VALUE + Earnings;
            const UpdateStatus = await UpdateUser(UserId, FinalVal);
            if (!UpdateStatus){
                await Interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Command failed")
                            .setDescription("Failed to add user to database")
                            .setColor("Red")
                    ],
                    ephemeral: true
                });
                return;
            }
            await Interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`🎲 You rolled a ${DiceResults}`)
                        .setDescription(`You've earned ${Earnings}! You now have ${FinalVal}`)
                        .setColor("Green")
                ],
                ephemeral: true
            });
            return;
        }
        const { id, money } = SavedData[0];
        FinalVal = money + Earnings;
        const UpdateStatus = await UpdateUser(UserId, FinalVal);
        if (!UpdateStatus){
            await Interaction.reply({
                embeds: [
                    new EmbedBuilder()
                       .setTitle("Command failed")
                       .setDescription("Failed to update user in database")
                       .setColor("Red")
                ],
                ephemeral: true
            });
            return;
        }
        await Interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`🎲 You rolled a ${DiceResults}`)
                    .setDescription(`You've ${Earnings >= 0 ? "earned" : "lost"} ${Earnings}! You now have ${FinalVal}`)
                    .setColor("Green")
            ],
            ephemeral: true
        });
        return;
    }
}