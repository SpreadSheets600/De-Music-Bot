"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const discord_js_1 = require("discord.js");
const embeds_1 = require("../embeds");
exports.name = 'nowplaying';
exports.aliases = ['np', 'save'];
exports.description = 'Show now playing song';
exports.usage = 'nowplaying';
exports.voiceChannel = false;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [];
const execute = async (client, message) => {
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    const track = player.current;
    const subtitle = `Author : **${track?.author}**\nDuration **${track?.duration.label}**\n`;
    const saveButton = new discord_js_1.ButtonBuilder()
        .setCustomId('musicSave')
        .setLabel('Save Song')
        .setStyle(discord_js_1.ButtonStyle.Success);
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(saveButton);
    return message.channel.send({
        embeds: [embeds_1.embeds.save(client.config.embedsColor, track.title, subtitle, track.uri, track.thumbnail)],
        components: [row],
        allowedMentions: { repliedUser: false }
    });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player) {
        return interaction.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    const track = player.current;
    const subtitle = `Author : **${track?.author}**\nDuration **${track?.duration.label}**\n`;
    const saveButton = new discord_js_1.ButtonBuilder()
        .setCustomId('musicSave')
        .setLabel('Save Song')
        .setStyle(discord_js_1.ButtonStyle.Success);
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(saveButton);
    return interaction.editReply({
        embeds: [embeds_1.embeds.save(client.config.embedsColor, track.title, subtitle, track.uri, track.thumbnail)],
        components: [row],
        allowedMentions: { repliedUser: false }
    });
};
exports.slashExecute = slashExecute;
