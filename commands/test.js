/* eslint-disable no-unused-vars */
export default {
	name: "test",
	aliases: ["t"],
	description: "testing",
	permissions: ["ADMINISTRATOR"],
	function: function (client, message, args, Discord) {
		message.channel.send("HeLlo!");
	}
};