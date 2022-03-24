import fs from "fs";

export default {
	// eslint-disable-next-line no-unused-vars
	function: async function (client, Discord) {
		const command_files = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

		for (const file of command_files) {
			const command = await import(`../commands/${ file }`);
			if (command.default.name) {
				client.commands.set(command.default.name, command.default);
			} else {
				continue;
			}
		}
	}
};