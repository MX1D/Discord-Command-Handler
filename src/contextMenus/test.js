/* eslint-disable no-unused-vars */

export default {
    name: "test",
    type: "message",
    function: async function ({ Discord, interaction }) {
        const { client } = await import("../index.js");
        interaction.reply("test");
    }
}