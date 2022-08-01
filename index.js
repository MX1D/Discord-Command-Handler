// Package imports
import Discord, { GatewayIntentBits } from "discord.js";
import { readFileSync, writeFileSync } from "fs";

// Initilazing the client
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.cooldowns = [];

// Client read and write config file
client.config = JSON.parse(readFileSync("./config.json"));
client.saveConfig = () => { writeFileSync("./config.json", JSON.stringify(client.config, null, 4)); };

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

// Logging in the client from the config
client.login(client.config.token);