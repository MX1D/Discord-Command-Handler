/* eslint-disable no-unused-vars */
export default {
    name: "test",
    type: "message",
    function: async function ({ client, Discord, interaction }) {
        interaction.reply("test");
    }
}