import { log } from "../../utils/logging.js";
import colors from "colors";

export default {
	name: "ready",
	description: "client ready event",
	once: false,
	// eslint-disable-next-line no-unused-vars
	function: function (client, Discord) {
		log(`Logged in as ${ colors.red(client.user.tag) }`);

		client.guilds.cache.forEach(guild => {
			let commands;
			if (guild) {
				commands = guild.commands;
			} else {
				commands = client.application.commands;
			}

			for (const i of client.slashCommands) {
				commands.create({ name: i[1].name, description: i[1].description, options: i[1].options });
			}
		});
	}
};