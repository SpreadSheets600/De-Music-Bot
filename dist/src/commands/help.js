"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const discord_js_1 = require("discord.js");
const embeds_1 = require("../embeds");
exports.name = 'help';
exports.aliases = ['h'];
exports.description = 'Get commands help';
exports.usage = 'help [command]';
exports.voiceChannel = false;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [
    {
        name: "command",
        description: "which command need help",
        type: 3,
        required: false
    }
];
const execute = async (client, message, args) => {
    const prefix = client.config.prefix;
    if (!args[0]) {
        let title = client.user?.username;
        const commands = client.commands.filter(x => x.showHelp !== false);
        let select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("helpSelect")
            .setPlaceholder("Select the help")
            .setOptions(commands.map(x => {
            return {
                label: x.name,
                description: `Aliases: ${x.aliases && x.aliases[0] ? x.aliases.join(', ') : x.name}`,

                value: x.name
            };
        }));
        let row = new discord_js_1.ActionRowBuilder().addComponents(select);
        let msg = await message.reply({
            content: 'Choose a command to get help. ⬇️',
            components: [row.toJSON()],
            allowedMentions: { repliedUser: false }
        });
        const collector = msg.createMessageComponentCollector({
            time: 20000,
            filter: i => i.user.id === message.author.id
        });
        collector.on("collect", async (i) => {
            if (i.customId != "helpSelect")
                return;
            const cmd = commands.find(x => x.name === i.values[0]);
            const usage = `${cmd.description}\n\`\`\`${prefix}${cmd.usage}\`\`\``;
            i.deferUpdate();
            await msg.edit({
                embeds: [embeds_1.embeds.help(client.config.embedsColor, title, usage)],
                components: [],
                allowedMentions: { repliedUser: false }
            });
        });
        collector.on("end", async (collected, reason) => {
            if (reason == "time" && collected.size == 0) {
                await msg.edit({ content: "❌ | Time expired.", components: [], allowedMentions: { repliedUser: false } });
            }
        });
    }
    else {
        const helpCmd = args[0];
        const commands = client.commands.filter(x => x.showHelp !== false);
        let found = false;
        found = commands.find(x => {
            if (helpCmd === x.name || x.aliases.includes(helpCmd)) {
                let command = x.name;
                let description = `${x.description}\n\`\`\`${prefix}${x.usage}\`\`\``;
                message.reply({
                    embeds: [embeds_1.embeds.help(client.config.embedsColor, command, description)],
                    allowedMentions: { repliedUser: false }
                });
                return true;
            }
        });
        if (!Boolean(found))
            return message.reply({ content: '❌ | The command not found.', allowedMentions: { repliedUser: false } });
    }
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const prefix = client.config.prefix;
    const command = interaction.options.getString("command");
    if (!command) {
        let title = client.user?.username;
        const commands = client.commands.filter(x => x.showHelp !== false);
        let select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("helpSelect")
            .setPlaceholder("Select the help")
            .setOptions(commands.map(x => {
            return {
                label: x.name,
                description: `Aliases: ${x.aliases && x.aliases[0] ? x.aliases.join(', ') : x.name}`,

                value: x.name
            };
        }));
        let row = new discord_js_1.ActionRowBuilder().addComponents(select);
        let msg = await interaction.editReply({
            content: 'Choose a command to get help. ⬇️',
            components: [row.toJSON()],
            allowedMentions: { repliedUser: false }
        });
        const collector = msg.createMessageComponentCollector({
            time: 20000,
            filter: i => i.user.id === interaction.user.id
        });
        collector.on("collect", async (i) => {
            if (i.customId != "helpSelect")
                return;
            const cmd = commands.find(x => x.name === i.values[0]);
            const usage = `${cmd.description}\n\`\`\`${prefix}${cmd.usage}\`\`\``;
            i.deferUpdate();
            await msg.edit({
                embeds: [embeds_1.embeds.help(client.config.embedsColor, title, usage)],
                components: [],
                allowedMentions: { repliedUser: false }
            });
        });
        collector.on("end", async (collected, reason) => {
            if (reason == "time" && collected.size == 0) {
                await msg.edit({ content: "❌ | Time expired.", components: [], allowedMentions: { repliedUser: false } });
            }
        });
    }
    else {
        const helpCmd = command;
        const commands = client.commands.filter(x => x.showHelp !== false);
        let found = false;
        found = commands.find(x => {
            if (helpCmd === x.name || x.aliases.includes(helpCmd)) {
                let command = x.name;
                let description = `${x.description}\n\`\`\`${prefix}${x.usage}\`\`\``;
                interaction.editReply({
                    embeds: [embeds_1.embeds.help(client.config.embedsColor, command, description)],
                    allowedMentions: { repliedUser: false }
                });
                return true;
            }
        });
        if (!Boolean(found))
            return interaction.editReply({ content: '❌ | The command not found.', allowedMentions: { repliedUser: false } });
    }
};
exports.slashExecute = slashExecute;
