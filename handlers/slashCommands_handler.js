/* eslint-disable no-unused-vars */
import fs from "fs";

export default {
	function: async function (client, Discord) {
		const command_files = fs.readdirSync("./slashCommands/").filter(file => file.endsWith(".js"));

		for (const file of command_files) {
			const command = await import(`../slashCommands/${ file }`);
			if (command.default.name) {
				client.slashCommands.set(command.default.name, command.default);
			} else {
				continue;
			}
		}
	}
};