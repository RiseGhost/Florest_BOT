const yt = require('ytdl-core');
const discordyt = require('ytdl-core-discord')
const { createAudioResource } = require('@discordjs/voice');

const audioOptionsPlay = {
    filter: 'audioonly',
    quality: 'lowestaudio',
    inline: true,
    type: "audio/mp3"
}

async function getYouTubeResource(url){
    try {
        return createAudioResource(await discordyt(url, audioOptionsPlay))
    } catch (error) {
        return -1
    }
}

module.exports = {
    getYouTubeResource
}