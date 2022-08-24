import colors from "colors";
import { log } from "../../utils/logging.js";

export default {
    name: "interactionCreate",
    once: false,
    function: async function (client, Discord, interaction) {
        if (!interaction.isSelectMenu()) return;
        const selectMenu = client.selectMenus.get(interaction.customId);
        if (!selectMenu) return;
        log(`[Select menu clicked] ${ interaction.customId } ${ colors.blue("||") } Author: ${ interaction.user.username } ${ colors.blue("||") } ID: ${ interaction.user.id } ${ colors.blue("||") } Server: ${ interaction.guild.name }`);
        selectMenu.function({ client, Discord, interaction, choices: interaction.values });
    }
}