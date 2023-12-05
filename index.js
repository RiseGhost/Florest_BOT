const Tree = require('./tree/tree')
const json = require('./data.json')
const {fork, exec} = require('child_process')
const { Client, GatewayIntentBits } = require('discord.js');
const Commands = require('./modules/Commands')
const { PlayingMusic } = require('./modules/MusicPlay')
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates, //Talk voice
        ]
    });

const Pcas = fork('./lib/cas.js')
const ProcessCode = fork('./DetectCode.js')
const Pconverter = fork('./lib/convert.js')

client.on('ready',async () => {
    console.log("Server ON")
    Object.values(Commands).forEach(command => {
        client.application.commands.create(command)
    })
})

const Play = new PlayingMusic()
const Slashs = new Map()
Slashs.set("play",(i) => {Play.play(i)})
Slashs.set("stop",(i) => {Play.pause(i)})

client.on('interactionCreate', async interaction => {
    const { commandName } = interaction;
    if (Slashs.has(commandName)) Slashs.get(commandName)(interaction)
})

client.on('messageCreate', function (message) {
    if (message.author.bot) return
    if (message.content.substring(0, 4) == "tree") message.reply(Tree.StrToTree(message.content))
    if (message.content.substring(0, 5) == "graph"){
        expression = '"' + message.content.substring(5).replace(' ','').replace('sen','sin') + '"'
        cmd = 'python /home/theo-pi/Documents/Florest_BOT/lib/CAS/graph.py ' + expression + ' ' + message.id + ".png"
        exec(cmd,(error,stdout,stderr) => {
            imagepath = "./" + message.id + ".png"
            message.channel.send({files: [imagepath]}).then(() => {exec("rm *.png")})
        })
    }
    //Pconverter.send(message.content)
    //Pconverter.once('message',(data)=>{if (data != "") message.reply(data)})

    ProcessCode.send(message)
    ProcessCode.once('message',(stdout)=>{if (stdout)(message.channel.send(stdout))})

    Pcas.send(message)
    Pcas.once('message',(data)=>{if (data != "") message.reply(data)})
})

/*
/etc/systemd/system/meu-projeto-nodejs.service
sudo systemctl start floarest-service.service         
☁  Florest BOT  sudo systemctl enable floarest-service.service
*/

client.login(json['bot'].Token);
//sudo systemctl stop floarest-discord-bot.service