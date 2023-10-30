const Tree = require('./tree/tree')
const Convert = require('./lib/Units/index')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ]
    });

function NumeresLastIndex(message){
    var index = 0;
    for (var i = 0; i < message.length; i++){
        if (isNaN(message[i]) && message[i] != '.') return i - 1
    }
    return index
}

function Validate(message){
    var msg = message.content.replace(/\s/g,"")
    var number = parseFloat(msg.substring(0,NumeresLastIndex(msg)+1))
    var compoments = msg.substring(NumeresLastIndex(msg)+1).split('to')
    if (number != NaN && compoments.length > 1) message.reply(Convert.c(compoments[0],compoments[1],number).toString())
    else                                        return false
}

client.on('messageCreate',async function (message){
    if (message.content.substring(0,4) == "tree")   message.reply(Tree.StrToTree(message.content))
    Validate(message)
})

/*
/etc/systemd/system/meu-projeto-nodejs.service
sudo systemctl start floarest-service.service         
☁  Florest BOT  sudo systemctl enable floarest-service.service
*/

client.login("MTE2Nzg1NjMzNzE2NjgxMTIyNg.GLFXDG.JHRQEnBkSk4kW8F5uVtLr2D6_96-pQtAfYOuXY");
console.log("Server ON")