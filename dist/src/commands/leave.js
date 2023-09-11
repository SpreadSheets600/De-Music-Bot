"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const dashboard_1 = require("../dashboard");
exports.name = 'leave';
exports.aliases = ['stop'];
exports.description = 'Leave current voice channel';
exports.usage = 'leave';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = false;
exports.options = [];
const execute = async (client, message) => {
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    if (client.config.autoLeave) {
        await player.destroy();
    }
    else {
        player.queue.clear();
        await player.skip();
        await dashboard_1.dashboard.destroy(player, client.config.embedsColor);
    }
    return message.react('👍');
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player) {
        return interaction.editReply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    if (client.config.autoLeave) {
        await player.destroy();
    }
    else {
        player.queue.clear();
        await player.skip();
        await dashboard_1.dashboard.destroy(player, client.config.embedsColor);
    }
    return interaction.editReply('✅ | Bot leave.');
};
exports.slashExecute = slashExecute;
