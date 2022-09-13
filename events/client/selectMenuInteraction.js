import colors from "colors";
import { log } from "../../utils/logging.js";

export default {
    name: "interactionCreate",
    once: false,
    function: async function (client, Discord, interaction) {
        if (!interaction.isSelectMenu()) return;
        const selectMenu = client.selectMenus.get(interaction.customId);
        if (!selectMenu) return;
        console.log(client.cooldowns);
        if (client.cooldowns.find((a) => selectMenu.id == selectMenu.id && a.user == interaction.user.id)) {
            const embed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("Cooldown")
                .setDescription(`:x: **You can use this command again <t:${ client.cooldowns.find((a) => a.user === interaction.user.id && a.id === selectMenu.id).until }:R>**`)
                .setTimestamp()
                .setFooter({ text: interaction.user.username, icon_url: interaction.user.avatarURL() });
            return interaction.reply({ embeds: [embed] });
        }
        log(`[Select menu clicked] ${ interaction.customId } ${ colors.blue("||") } Author: ${ interaction.user.username } ${ colors.blue("||") } ID: ${ interaction.user.id } ${ colors.blue("||") } Server: ${ interaction.guild.name }`);
        selectMenu.function({ client, Discord, interaction, choices: interaction.values });
        console.log(selectMenu);
        if (selectMenu.cooldown !== 0 && !interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            client.cooldowns.push({ user: interaction.user.id, id: selectMenu.id, until: Math.round((Date.now() + selectMenu.cooldown) / 1000) });
            setTimeout(() => {
                client.cooldowns.splice(client.cooldowns.indexOf(client.cooldowns.find((a) => a.user === interaction.user.id && a.id === selectMenu.id)), 1);
            }, selectMenu.cooldown);
        }
    }
}