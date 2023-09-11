"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.name = void 0;
const lavashark_1 = require("lavashark");
exports.name = 'loopplaylist';
exports.description = 'Turns the playlist loop mode on or off';
exports.usage = 'loopplaylist';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = true;
const execute = async (client, message, _args) => {
    if (!message.guild)
        return; // Ensure this command is executed in a guild context
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    player.setRepeatMode(client.playlistLoop ? lavashark_1.RepeatMode.OFF : lavashark_1.RepeatMode.QUEUE);
    client.playlistLoop = !client.playlistLoop;
    return message.reply({ content: `Playlist loop is now ${client.playlistLoop ? 'enabled' : 'disabled'}.`, allowedMentions: { repliedUser: false } });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guildId);
    if (!player) {
        return interaction.followUp({ content: '❌ | There is no music currently playing.', ephemeral: true });
    }
    player.setRepeatMode(client.playlistLoop ? lavashark_1.RepeatMode.OFF : lavashark_1.RepeatMode.QUEUE);
    client.playlistLoop = !client.playlistLoop;
    await interaction.followUp({ content: `Playlist loop is now ${client.playlistLoop ? 'enabled' : 'disabled'}.`, allowedMentions: { repliedUser: false } });
};
exports.slashExecute = slashExecute;
