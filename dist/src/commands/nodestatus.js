"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const embeds_1 = require("../embeds");
exports.name = 'nodestatus';
exports.aliases = ['node', 'nodes', 'nodesstatus'];
exports.description = 'Show nodes connection status';
exports.usage = 'nodestatus';
exports.voiceChannel = false;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [];
const execute = async (client, message) => {
    const nodes = client.lavashark.nodes;
    const pingList = await client.lavashark.nodesPing();
    const nodesStatus = [];
    let healthValue = 0;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const ping = pingList[i];
        if (ping === -1) {
            healthValue++;
            nodesStatus.push({ name: `❌ ${node.identifier}`, value: '**DISCONNECTED**' });
        }
        else {
            nodesStatus.push({ name: `✅ ${node.identifier}`, value: `ping: **${ping}ms**` });
        }
    }
    console.log('nodesStatus', nodesStatus);
    const nodeHealth = healthValue === 0 ? 'All nodes are active' : `⚠️ There are ${healthValue} nodes disconnected`;
    return message.reply({
        embeds: [embeds_1.embeds.nodesStatus(client.config.embedsColor, nodeHealth, nodesStatus)],
        allowedMentions: { repliedUser: false }
    });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const nodes = client.lavashark.nodes;
    const pingList = await client.lavashark.nodesPing();
    const nodesStatus = [];
    let healthValue = 0;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const ping = pingList[i];
        if (ping === -1) {
            nodesStatus.push({ name: `❌ ${node.identifier}`, value: 'DISCONNECTED' });
            healthValue++;
        }
        else {
            nodesStatus.push({ name: `✅ ${node.identifier}`, value: `ping: ${ping}ms` });
        }
    }
    console.log('nodesStatus', nodesStatus);
    const nodeHealth = healthValue === 0 ? '✅ All nodes are active' : `⚠️ There are ${healthValue} nodes disconnected`;
    return interaction.editReply({
        embeds: [embeds_1.embeds.nodesStatus(client.config.embedsColor, nodeHealth, nodesStatus)],
        allowedMentions: { repliedUser: false }
    });
};
exports.slashExecute = slashExecute;
