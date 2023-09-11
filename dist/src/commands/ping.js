"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const embeds_1 = require("../embeds");
exports.name = 'ping';
exports.aliases = [];
exports.description = 'Get server ping';
exports.usage = 'ping';
exports.voiceChannel = false;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [];
const execute = async (client, message) => {
    const botPing = `${Date.now() - message.createdTimestamp}ms`;
    const apiPing = client.ws.ping.toString();
    await message.react('👍');
    return message.reply({
        embeds: [embeds_1.embeds.ping(client.config.embedsColor, botPing, apiPing)],
        allowedMentions: { repliedUser: false }
    });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const botPing = `${Date.now() - interaction.createdTimestamp}ms`;
    const apiPing = client.ws.ping.toString();
    return interaction.editReply({
        embeds: [embeds_1.embeds.ping(client.config.embedsColor, botPing, apiPing)],
        allowedMentions: { repliedUser: false }
    });
};
exports.slashExecute = slashExecute;
