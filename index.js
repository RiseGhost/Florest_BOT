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
const Pconverter = fork('./lib/convert.js')

client.on('ready',async () => {
    console.log("Server ON")
    Object.values(Commands).forEach(command => {
        client.application.commands.create(command)
    })
})

const Play = new PlayingMusic()

client.on('interactionCreate', async interaction => {
    const { commandName } = interaction;
    if (commandName === "play"){
        Play.play(interaction)
    } else if (commandName === "stop"){
        Play.pause(interaction)
    }
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

    Pcas.send(message)
    Pcas.once('message',(data)=>{if (data != "") message.reply(data)})
})

/*
/etc/systemd/system/meu-projeto-nodejs.service
sudo systemctl start floarest-service.service         
☁  Florest BOT  sudo systemctl enable floarest-service.service
*/

client.login(json['bot'].Token);

//https://discord.com/api/oauth2/authorize?client_id=1167856337166811226&permissions=35190851241984&scope=bot