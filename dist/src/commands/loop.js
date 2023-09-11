"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const lavashark_1 = require("lavashark");
exports.name = 'loop';
exports.aliases = ['lp'];
exports.description = 'Turns the music loop mode on or off';
exports.usage = 'loop <off/one/all>';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [
    {
        name: "mode",
        description: "The loop mode",
        type: 3,
        required: true,
        choices: [
            {
                name: "Off",
                value: "off"
            },
            {
                name: "One",
                value: "one"
            },
            {
                name: "All",
                value: "all"
            }
        ]
    }
];
const execute = async (client, message, args) => {
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    let mode = null;
    const methods = ['Off', 'Single', 'All'];
    if (!args[0])
        return message.reply({ content: `❌ | ${client.config.prefix}${exports.usage}`, allowedMentions: { repliedUser: false } });
    switch (args[0].toLowerCase()) {
        case 'off': {
            mode = 0;
            player.setRepeatMode(lavashark_1.RepeatMode.OFF);
            break;
        }
        case 'one' || 'single': {
            mode = 1;
            player.setRepeatMode(lavashark_1.RepeatMode.TRACK);
            break;
        }
        case 'all' || 'queue': {
            mode = 2;
            player.setRepeatMode(lavashark_1.RepeatMode.QUEUE);
            break;
        }
        default: {
            return message.reply({ content: `❌ | ${client.config.prefix}${exports.usage}`, allowedMentions: { repliedUser: false } });
        }
    }
    await message.react('👍');
    return message.reply({ content: `Set loop to \`${methods[mode]}\``, allowedMentions: { repliedUser: false } });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player) {
        return interaction.editReply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    let mode = null;
    const methods = ['Off', 'Single', 'All'];
    switch (interaction.options.getString("mode")) {
        case 'off': {
            mode = 0;
            player.setRepeatMode(lavashark_1.RepeatMode.OFF);
            break;
        }
        case 'one': {
            mode = 1;
            player.setRepeatMode(lavashark_1.RepeatMode.TRACK);
            break;
        }
        case 'all': {
            mode = 2;
            player.setRepeatMode(lavashark_1.RepeatMode.QUEUE);
            break;
        }
        default: {
            return interaction.editReply({ content: `❌ | ${client.config.prefix}${exports.usage}`, allowedMentions: { repliedUser: false } });
        }
    }
    return interaction.editReply({ content: `Set loop to \`${methods[mode]}\``, allowedMentions: { repliedUser: false } });
};
exports.slashExecute = slashExecute;
