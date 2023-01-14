import config from "../../config.js";
import colors from "colors";
import { log, error } from "../../utils/logging.js";
import { client } from "../../index.js";
import { readdirSync, statSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

export default {
	name: "ready",
	description: "client ready event",
	once: false,
	function: async function () {
		log(`Logged in as ${ colors.red(client.user.tag) }`);

		const commands = [];
		const COMMAND_DIR = './src/commands';
		const readDir = async (dir) => {
			const files = readdirSync(dir);
			for await (const file of files) {
				if (statSync(`${dir}/${file}`).isDirectory()) await readDir(`./${dir}/${file}`);
				else {
					const command = (await import(`../../../${dir}/${file}`)).default;
					if (command?.name) {
						commands.push({
							name: command.name,
							description: command.description,
							options: command.options,
						});
						log(`${dir}/${file} has been registered!`);
					} else {
						error(`${dir}/${file} has no name!`);
					}
				}
			}
		};

		await readDir(COMMAND_DIR)
		const rest = new REST({ version: '10' }).setToken(config.token);

		rest
			.put(Routes.applicationCommands(client.user.id), { body: commands })
			.then(() => log('Commands have been registered successfully!'))
			.catch((err) => console.log(err));
	}
};