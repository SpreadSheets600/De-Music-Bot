"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const embeds_1 = require("../embeds");
exports.name = 'queue';
exports.aliases = ['q', 'list'];
exports.description = 'Show currnet playlist';
exports.usage = 'queue';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [];
const execute = async (client, message) => {
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    let nowplaying = `Now Playing : ${player.current?.title}\n\n`;
    let tracksQueue = '';
    const tracks = player.queue.tracks.map((track, index) => { return `${++index}. \`${track.title}\``; });
    if (tracks.length < 1) {
        tracksQueue = '------------------------------';
    }
    else if (tracks.length > 9) {
        tracksQueue = tracks.slice(0, 10).join('\n');
        tracksQueue += `\nand ${tracks.length - 10} other songs`;
    }
    else {
        tracksQueue = tracks.join('\n');
    }
    const methods = ['Off', 'Single', 'All'];
    const repeatMode = player.repeatMode;
    return message.reply({
        embeds: [embeds_1.embeds.queue(client.config.embedsColor, nowplaying, tracksQueue, methods[repeatMode])],
        allowedMentions: { repliedUser: false }
    });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player) {
        return interaction.editReply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    let nowplaying = `Now Playing : ${player.current?.title}\n\n`;
    let tracksQueue = '';
    const tracks = player.queue.tracks.map((track, index) => { return `${++index}. \`${track.title}\``; });
    if (tracks.length < 1) {
        tracksQueue = '------------------------------';
    }
    else if (tracks.length > 9) {
        tracksQueue = tracks.slice(0, 10).join('\n');
        tracksQueue += `\nand ${tracks.length - 10} other songs`;
    }
    else {
        tracksQueue = tracks.join('\n');
    }
    const methods = ['Off', 'Single', 'All'];
    const repeatMode = player.repeatMode;
    return interaction.editReply({
        embeds: [embeds_1.embeds.queue(client.config.embedsColor, nowplaying, tracksQueue, methods[repeatMode])],
        allowedMentions: { repliedUser: false }
    });
};
exports.slashExecute = slashExecute;
