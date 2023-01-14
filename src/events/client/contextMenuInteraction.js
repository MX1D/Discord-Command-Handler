import colors from "colors";
import { log } from "../../utils/logging.js";
import { client } from "../../index.js";

export default {
    name: "interactionCreate",
    once: false,
    function: async function (Discord, interaction) {
        if (!interaction.isUserContextMenuCommand() && !interaction.isMessageContextMenuCommand()) return;
		const command = client.contextMenus.get(interaction.commandName);
        if (command) {
            command.function({ Discord, interaction });
			log(`[Context menu clicked] ${ interaction.commandName } ${ colors.blue("||") } Author: ${ interaction.user.username } ${ colors.blue("||") } ID: ${ interaction.user.id } ${ colors.blue("||") } Server: ${ interaction.guild.name }`);
        }
    }
}