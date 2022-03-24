import dotenv from "dotenv";
import { log, error } from "../../utils/logging.js";
import colors from "colors";
dotenv.config();

export default {
	name: "messageCreate",
	description: "Client on recieve message event",
	once: false,
	function: function (client, Discord, message) {
		const permissionsList = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "REQUEST_TO_SPEAK", "MANAGE_EVENTS", "MANAGE_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "USE_EXTERNAL_STICKERS", "SEND_MESSAGES_IN_THREADS", "START_EMBEDDED_ACTIVITIES", "MODERATE_MEMBERS"];
		// eslint-disable-next-line no-undef
		const prefix = process.env.prefix;
		if (!message.content.startsWith(prefix)) return; // prefix ;-;
		const args = message.content.slice(prefix.length).split(/ +/); // message arguments
		const cmd = args.shift().toLowerCase(); // getting first word of the args which is the command
		const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd)); // finding the command to see if it's in client.commands
		if (command) {
			if (command.permissions.length) {
				const invalidPerms = [];
				for (const perm of command.permissions) {
					if (!permissionsList.includes(perm)) return error(`You put a wrong permission! ${ colors.blue("||") } "${ perm }" in ${ command.name } file!`);
					if (!message.member.permissions.has(Discord.Permissions.FLAGS[perm])) invalidPerms.push(perm);
				}
				if (invalidPerms.length) return message.channel.send(`Missing Permissions: \`${ invalidPerms + "".replace(/,/g, ", ") }\``);
			}
			command.function(client, message, args, Discord); // running the command code
			log(`[Command ran] ${ message.content } ${ colors.blue("||") } Author: ${ message.author.username } ${ colors.blue("||") } ID: ${ message.author.id } ${ colors.blue("||") } Server: ${ message.guild.name }`); // logging that there is a command that just ran
		}
	}
};