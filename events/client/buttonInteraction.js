import colors from "colors";
import { log } from "../../utils/logging.js";

export default {
    name: "interactionCreate",
    once: false,
    function: async function (client, Discord, interaction) {
        if (!interaction.isButton()) return;
        const button = client.buttons.get(interaction.customId);
        if (button) {
            if (button.permissions) {
				const invalidPerms = [];
				for (const perm of button.permissions) {
					if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags[perm])) invalidPerms.push(perm);
				}
				if (invalidPerms.length) return interaction.reply({ content: `Missing Permissions: \`${ invalidPerms + "".replace(/,/g, ", ") }\``, ephemeral: true });
			}
			if (button.roleRequired) {
				if (!interaction.member.roles.cache.has(button.roleRequired) && !interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `:x: **You don't have the required role!**`, ephemeral: true });
			}
            button.function({ client, Discord, button: interaction });
			log(`[Button clicked] ${ interaction.customId } ${ colors.blue("||") } Author: ${ interaction.user.username } ${ colors.blue("||") } ID: ${ interaction.user.id } ${ colors.blue("||") } Server: ${ interaction.guild.name }`); // logging that there is a command that just ran
        }
    }
}