import { Client, Message, ChatInputCommandInteraction   } from "discord.js";
import { RepeatMode } from "lavashark";

export const name = 'loopplaylist';
export const description = 'Turns the playlist loop mode on or off';
export const usage = 'loopplaylist';
export const voiceChannel = true;
export const showHelp = true;
export const sendTyping = true;

export const execute = async (client: Client, message: Message, _args: string[]) => {
  if (!message.guild) return; // Ensure this command is executed in a guild context

  const player = client.lavashark.getPlayer(message.guild.id);

  if (!player) {
    return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
  }

  player.setRepeatMode(client.playlistLoop ? RepeatMode.OFF : RepeatMode.QUEUE);
  client.playlistLoop = !client.playlistLoop;

  return message.reply({ content: `Playlist loop is now ${client.playlistLoop ? 'enabled' : 'disabled'}.`, allowedMentions: { repliedUser: false } });
};


export const slashExecute = async (client: Client, interaction: ChatInputCommandInteraction) => {
  const player = client.lavashark.getPlayer(interaction.guildId!);

  if (!player) {
    return interaction.followUp({ content: '❌ | There is no music currently playing.', ephemeral: true });
  }

  player.setRepeatMode(client.playlistLoop ? RepeatMode.OFF : RepeatMode.QUEUE);
  client.playlistLoop = !client.playlistLoop;

  await interaction.followUp({ content: `Playlist loop is now ${client.playlistLoop ? 'enabled' : 'disabled'}.`, allowedMentions: { repliedUser: false } });
};
