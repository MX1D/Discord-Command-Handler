import fs from "fs";

export default {
	function: async function (client) {
		const command_files = fs.readdirSync("./commands/");

		for (const file of command_files) {
			if (file.endsWith(".js")) {
				var command = await import(`../commands/${ file }`);
				client.commands.set(command.default.name, command.default);
			}
			if (fs.statSync(`./commands/${ file }`).isDirectory()) {
				fs.readdirSync(`./commands/${ file }`).forEach(async cmd => {
					if (cmd.endsWith(".js")) {
						const command = await import(`../commands/${ file }/${ cmd }`);
						client.commands.set(command.default.name, command.default);
					}
				});
				continue;
			}
		}
	}
};