/* eslint-disable no-unused-vars */
import { ApplicationCommandOptionType  } from "discord.js";

export default {
	name: "test",
	description: "testing",
	permissions: ["Administrator"],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	options: [{ name: "what", description: "you want what?", required: true, type: ApplicationCommandOptionType.String }],
	function: function ({ client, Discord, interaction, options }) {
		interaction.reply({ content: `you said: ${ options.getString("what") }` });
	}
};