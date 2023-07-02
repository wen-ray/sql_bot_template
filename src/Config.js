const dotenv = require("dotenv");
dotenv.config();


module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN || "",
    BOT_ID: process.env.BOT_ID || "",
    STARTING_VALUE: 1000
}