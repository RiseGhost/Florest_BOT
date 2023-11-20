const { SlashCommandBuilder } = require('@discordjs/builders');

const play = new SlashCommandBuilder()
    .setName('play')
    .setDescription('play music')
    .addStringOption(option =>
        option.setName('url')
        .setDescription('YouTube URL')
        .setRequired(true))

const stop = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('stop music')

module.exports = {play,stop}