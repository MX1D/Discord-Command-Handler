// Package imports
import Discord, { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

// Initilazing the client
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.cooldowns = [];

// Command & event handlers imports
import command_handler from "./handlers/command_handler.js";
import event_handler from "./handlers/event_handler.js";
import slashCommands_handler from "./handlers/slashCommands_handler.js";

// Command & event handlers
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();
await command_handler.function(client, Discord);
await slashCommands_handler.function(client, Discord);
event_handler.function(client, Discord);

// Logging in the client from the dotenv config
client.login(process.env.token);