const Tree = require('./tree/tree')
const json = require('./data.json')
const {fork} = require('child_process')
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

client.on('messageCreate', async function (message) {
    if (message.author.bot) return
    if (message.content.substring(0, 4) == "tree") message.reply(Tree.StrToTree(message.content))
    
    try{
        Pconverter.send(message.content)
        Pconverter.once('message',(data)=>{if (data != "") message.reply(data)})
    
        Pcas.send(message.content)
        Pcas.once('message',(data)=>{if (data != "") message.reply(data)})
    } catch{}
   
})

/*
/etc/systemd/system/meu-projeto-nodejs.service
sudo systemctl start floarest-service.service         
☁  Florest BOT  sudo systemctl enable floarest-service.service
*/

client.login(json['bot'].Token);
console.log("Server ON")