const Tree = require('./tree/tree')
const json = require('./data.json')
const {fork, exec} = require('child_process')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ]
    });

const Pcas = fork('./lib/cas.js')
const Pconverter = fork('./lib/convert.js')

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

    Pconverter.send(message.content)
    Pconverter.once('message',(data)=>{if (data != "") message.reply(data)})

    Pcas.send(message)
    Pcas.once('message',(data)=>{if (data != "") message.reply(data)})
})

/*
/etc/systemd/system/meu-projeto-nodejs.service
sudo systemctl start floarest-service.service         
☁  Florest BOT  sudo systemctl enable floarest-service.service
*/

client.login(json['bot'].Token);
console.log("Server ON")