import fs from "fs";

export default {
	function: async function (client) {
		const command_files = fs.readdirSync("./slashCommands/");

		for (const file of command_files) {
			let command;
			if (file.endsWith(".js")) {
				command = await import(`../slashCommands/${ file }`);
			}
			if (fs.statSync(`./slashCommands/${ file }`).isDirectory()) {
				fs.readdirSync(`./slashCommands/${ file }`).forEach(async cmd => {
					if (cmd.endsWith(".js")) {
						const command = await import(`../slashCommands/${ file }/${ cmd }`);
						client.slashCommands.set(command.default.name, command.default);
					}
				});
				continue;
			} else
				if (command?.default?.name) {
					client.slashCommands.set(command.default.name, command.default);
				} else {
					continue;
				}
		}
	}
};