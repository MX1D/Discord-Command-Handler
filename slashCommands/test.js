/* eslint-disable no-unused-vars */
import { Constants } from "discord.js";

const type = Constants.ApplicationCommandOptionTypes;

export default {
	name: "test",
	description: "testing",
	permissions: ["ADMINISTRATOR"],
	options: [{ name: "what", description: "you want what?", required: true, type: type.STRING }],
	function: function (client, Discord, interaction, options) {
		interaction.reply({ content: `you said: ${ options.getString("what") }` });
	}
};