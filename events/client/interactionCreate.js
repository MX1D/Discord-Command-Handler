/* eslint-disable no-unused-vars */
import { error, log } from "../../utils/logging.js";
import colors from "colors";

export default {
	name: "interactionCreate",
	description: "client on interaction create event, using for slash commands",
	once: false,
	function: async function (client, Discord, interaction) {
		if (!interaction.isCommand()) return;
		const cmd = interaction.commandName;
		const command = client.slashCommands.get(cmd);
		if (command) {
			if (command.permissions.length) {
				const invalidPerms = [];
				for (const perm of command.permissions) {
					if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags[perm])) invalidPerms.push(perm);
				}
				if (invalidPerms.length) return interaction.reply({ content: `Missing Permissions: \`${ invalidPerms + "".replace(/,/g, ", ") }\`` });
			}
			const { options } = interaction;
			command.function({ client, Discord, interaction, options });
			log(`[Command ran] ${ interaction.commandName } ${ colors.blue("||") } Author: ${ interaction.user.username } ${ colors.blue("||") } ID: ${ interaction.user.id } ${ colors.blue("||") } Server: ${ interaction.guild.name }`); // logging that there is a command that just ran
		}
	}
};