/*
Copyright (C) 2020-2021 Nicholas Christopher

This file is part of AutoPublisher.

AutoPublisher is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, version 3.

AutoPublisher is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with AutoPublisher.  If not, see <https://www.gnu.org/licenses/>.
*/

console.log("Starting AutoPublisher...");

const { Client, Intents, Options } = require("discord.js");
const config = require("./config.json");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	makeCache: Options.cacheWithLimits({
		MessageManager: 0,
		ThreadManager: 0,
	}),
});

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
	client.user.setPresence({
		activities: [
			{
				name: `${client.guilds.cache.size} servers!`,
				type: "WATCHING",
			},
		],
	});

	setInterval(() => {
		client.user.setPresence({
			activities: [
				{
					name: `${client.guilds.cache.size} servers!`,
					type: "WATCHING",
				},
			],
		});
	}, 600000);
});

client.on("messageCreate", async (message) => {
	if (message.channel.type !== "GUILD_NEWS") return;
	try {
		await message.crosspost();
	} catch {} // eslint-disable-line no-empty
});

client.login(config.token);
