const { createAudioPlayer } = require('@discordjs/voice');
const VoiceConnect = require('./VoiceConnect')
const Music = require('./Music')

class PlayingMusic {
    constructor() {
        this.server = new Map()
        this.players = new Map()
    }

    async startMusic(interaction,serverID) {
        const { commandName, options } = interaction;
        this.players.set(serverID, createAudioPlayer())
        if (!interaction.member.voice.channel) return interaction.reply("Err ❌")
        const connection = VoiceConnect.connect(interaction)
        connection.subscribe(this.players.get(serverID))
        const resource = await Music.getYouTubeResource(options.get('url').value)
        if (resource != -1) this.players.get(serverID).play(resource)
        else {
            connection.destroy()
            interaction.reply('Err URL ❌')
            this.players.delete(serverID)
            this.server.delete(serverID)
        }
        interaction.reply("Playing Music 🎵")
    }

    pause(interaction) {
        const serverID = interaction.guildId
        if (this.server.get(serverID) != undefined) {
            this.players.get(serverID).pause()
            this.server.delete(serverID)
            this.players.delete(serverID)
            interaction.reply("Music stoped")
        } else { interaction.reply("Not music playing") }
    }

    play(interaction) {
        const serverID = interaction.guildId
        if (this.server.get(serverID) != undefined) {
            this.players.get(serverID).pause()
            this.server.set(serverID, this.startMusic(interaction,serverID))
        } else {
            this.server.set(interaction.guildId, this.startMusic(interaction,serverID))
        }
    }
}

module.exports = { PlayingMusic }