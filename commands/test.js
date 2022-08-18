/* eslint-disable no-unused-vars */
export default {
	name: "test",
	aliases: ["t"],
	description: "testing",
	permissions: ["Administrator"],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	function: function ({ client, message, args, Discord }) {
		message.channel.send("HeLlo!");
	}
};