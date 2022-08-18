import colors from "colors";
import { log } from "../../utils/logging.js";

export default {
    name: "interactionCreate",
    once: false,
    function: async function (client, Discord, interaction) {
        if (interaction.type !== 2 && interaction.type !== 3) return;
		const command = client.contextMenus.get(interaction.commandName);
        if (command) {
            command.function({ client, Discord, interaction });
			log(`[Context menu clicked] ${ interaction.commandName } ${ colors.blue("||") } Author: ${ interaction.user.username } ${ colors.blue("||") } ID: ${ interaction.user.id } ${ colors.blue("||") } Server: ${ interaction.guild.name }`); // logging that there is a command that just ran
        }
    }
}