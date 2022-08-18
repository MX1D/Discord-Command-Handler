import { log } from "../../utils/logging.js";
import colors from "colors";

export default {
	name: "ready",
	description: "client ready event",
	once: false,
	function: function (client) {
		log(`Logged in as ${ colors.red(client.user.tag) }`);

		client.guilds.cache.forEach(async guild => {
			const cmds = [];
			const pushCmds = (type) => {
				for (const i of client[type]) {
					if (!i[1].name) return;
					cmds.push(i[1]);
				}
			}
			pushCmds("slashCommands");
			pushCmds("contextMenus");
			await guild.commands.set(cmds);
		});
	}
};