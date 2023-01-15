import config from "../../config.js";
import colors from "colors";
import { log, error } from "../../utils/logging.js";
import { client } from "../../index.js";
import { readdirSync, statSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { initServer, renewKey } from "../../server/express.js";
import { getGiveaways, getMembers, removeGiveaway } from "../../handlers/databaseHandler.js";

export default {
	name: "ready",
	description: "client ready event",
	once: false,
	function: async function () {
		log(`Logged in as ${ colors.red(client.user.tag) }`);
		
		initServer();

		setInterval(async () => {
			config.groups.forEach(async group => {
				const members = await getMembers(group);
				members.forEach(async member => {
					if (member.expires_in < 518400) {
						renewKey(member, group);
					}
				});
			});
		}, 60000);

		setInterval(async () => {
			const giveaways = await getGiveaways();
			giveaways.forEach(async giveaway => {
				if (Date.now() > giveaway.time) {
					const channel = await client.channels.fetch(giveaway.channelId);
					if (channel) {
						const message = await channel.messages.fetch(giveaway.messageId);
						if (message) {
							await message.edit({ content: "🎉🎉 **GIVEAWAY ENDED!** 🎉🎉", components: [] });
							await message.reply({ content: `🎉🎉 **Congratulations <@${ giveaway.winnerId }>, you won the giveaway!** 🎉🎉` });
							await removeGiveaway(giveaway);
						}
					}
				}
			});
		}, 5000);

		const commands = [];
		const registerDir = async (dirName) => {
			const COMMAND_DIR = `./src/${dirName}`;
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
			}
			await readDir(COMMAND_DIR)
		};

		await registerDir("slashCommands");
		await registerDir("commands");
		
		const rest = new REST({ version: '10' }).setToken(config.token);
		rest
			.put(Routes.applicationCommands(client.user.id), { body: commands })
			.then(() => log('Commands have been registered successfully!'))
			.catch((err) => console.log(err));
	}
};