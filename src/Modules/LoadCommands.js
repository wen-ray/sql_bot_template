const { Collection, REST, Routes} = require("discord.js");
const path = require("node:path");
const fs = require("node:fs");
const { BOT_TOKEN, BOT_ID } = require("../Config");


function LoadCommands(Bot, CommandsDirectory){
    CommandsDirectory = path.join(__dirname, "..", CommandsDirectory)
    Bot.commands = new Collection();
    const CommandFiles = fs.readdirSync(CommandsDirectory).filter((File) => File.endsWith(".js"));
    const Commands = [];
    for (const File of CommandFiles){
        const Command = require(`${CommandsDirectory}/${File}`);
        Bot.commands.set(Command.data.name, Command);
        Commands.push(Command.data.toJSON());
    }

    const Rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

    Rest.put(Routes.applicationCommands(BOT_ID), { body: Commands })
        .then((Data) => console.log(`Successfully registered ${Data.length} slash commands`))
        .catch(console.error);
}

module.exports = LoadCommands;