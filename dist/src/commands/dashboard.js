"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const dashboard_1 = require("../dashboard");
exports.name = 'dashboard';
exports.aliases = ['d', 'console'];
exports.description = 'Move the dashboard embed to the bottom';
exports.usage = 'dashboard';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = false;
exports.options = [];
const execute = async (client, message) => {
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player || !player.dashboard) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    try {
        await player.dashboard?.delete();
    }
    catch (error) {
        console.log('Dashboard delete error:', error);
    }
    await dashboard_1.dashboard.initial(client, message, player);
    await dashboard_1.dashboard.update(client, player, player.current);
    return message.react('👍');
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player || !player.dashboard) {
        return interaction.editReply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    try {
        await player.dashboard?.delete();
    }
    catch (error) {
        console.log('Dashboard delete error:', error);
    }
    await dashboard_1.dashboard.initial(client, interaction, player);
    await dashboard_1.dashboard.update(client, player, player.current);
    return interaction.editReply("✅ | Dashboard updated.");
};
exports.slashExecute = slashExecute;
