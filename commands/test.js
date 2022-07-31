/* eslint-disable no-unused-vars */
export default {
	name: "test",
	aliases: ["t"],
	description: "testing",
	permissions: ["Administrator"],
	function: function ({ client, message, args, Discord }) {
		message.channel.send("HeLlo!");
	}
};