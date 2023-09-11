"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const dashboard_1 = require("../dashboard");
exports.name = 'play';
exports.aliases = ['p'];
exports.description = 'Enter your song link or song name to play';
exports.usage = 'play <URL/song name>';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [
    {
        name: "play",
        description: "The song link or song name",
        type: 3,
        required: true
    }
];
const execute = async (client, message, args) => {
    if (!args[0]) {
        return message.reply({ content: `❌ | Write the name of the music you want to search.`, allowedMentions: { repliedUser: false } });
    }
    const str = args.join(' ');
    const res = await client.lavashark.search(str);
    if (res.loadType === "LOAD_FAILED") {
        console.log(`Search Error: ${res.exception?.message}`);
        return message.reply({ content: `❌ | No results found.`, allowedMentions: { repliedUser: false } });
    }
    else if (res.loadType === "NO_MATCHES") {
        return message.reply({ content: `❌ | No matches.`, allowedMentions: { repliedUser: false } });
    }
    // Creates the audio player
    const player = client.lavashark.createPlayer({
        guildId: String(message.guild?.id),
        voiceChannelId: String(message.member?.voice.channelId),
        textChannelId: message.channel.id,
        selfDeaf: true
    });
    try {
        // Connects to the voice channel
        await player.connect();
        player.metadata = message;
        // Intial dashboard
        if (!player.dashboard)
            await dashboard_1.dashboard.initial(client, message, player);
    }
    catch (error) {
        console.log(error);
        await dashboard_1.dashboard.destroy(player, client.config.embedsColor);
        return message.reply({ content: `❌ | I can't join voice channel.`, allowedMentions: { repliedUser: false } });
    }
    if (res.loadType === 'PLAYLIST_LOADED') {
        player.addTracks(res.tracks, message.author);
    }
    else {
        const track = res.tracks[0];
        player.addTracks(track, message.author);
    }
    if (!player.playing) {
        await player.play()
            .catch(async (error) => {
            console.log(error);
            await message.reply({ content: `❌ | The service is experiencing some problems, please try again.`, allowedMentions: { repliedUser: false } });
            return await player.destroy();
        });
        player.filters.setVolume(client.config.defaultVolume);
    }
    return message.react('👍');
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const str = interaction.options.getString("play");
    const res = await client.lavashark.search(str);
    if (res.loadType === "LOAD_FAILED") {
        console.log(`Search Error: ${res.exception?.message}`);
        return interaction.editReply({ content: `❌ | No results found.`, allowedMentions: { repliedUser: false } });
    }
    else if (res.loadType === "NO_MATCHES") {
        return interaction.editReply({ content: `❌ | No matches.`, allowedMentions: { repliedUser: false } });
    }
    const guildMember = interaction.guild.members.cache.get(interaction.user.id);
    const { channel } = guildMember.voice;
    // Creates the audio player
    const player = client.lavashark.createPlayer({
        guildId: String(interaction.guild?.id),
        voiceChannelId: String(channel?.id),
        textChannelId: interaction.channel?.id,
        selfDeaf: true
    });
    try {
        // Connects to the voice channel
        await player.connect();
        player.metadata = interaction;
        // Intial dashboard
        if (!player.dashboard) {
            await dashboard_1.dashboard.initial(client, interaction, player);
        }
    }
    catch (error) {
        console.log(error);
        await dashboard_1.dashboard.destroy(player, client.config.embedsColor);
        return interaction.editReply({ content: `❌ | I can't join voice channel.`, allowedMentions: { repliedUser: false } });
    }
    if (res.loadType === 'PLAYLIST_LOADED') {
        player.addTracks(res.tracks, interaction.user);
    }
    else {
        const track = res.tracks[0];
        player.addTracks(track, interaction.user);
    }
    if (!player.playing) {
        await player.play()
            .catch(async (error) => {
            console.log(error);
            await interaction.editReply({ content: `❌ | The service is experiencing some problems, please try again.`, allowedMentions: { repliedUser: false } });
            return await player.destroy();
        });
        player.filters.setVolume(client.config.defaultVolume);
    }
    return interaction.editReply({ content: "✅ | Music added.", allowedMentions: { repliedUser: false } });
};
exports.slashExecute = slashExecute;
