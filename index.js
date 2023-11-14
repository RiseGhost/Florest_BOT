const Tree = require('./tree/tree')
const Convert = require('./lib/index')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ]
    });

client.on('messageCreate', async function (message) {
    if (message.author.bot) return
    if (message.content.substring(0, 4) == "tree") message.reply(Tree.StrToTree(message.content))
    Convert.converter(message)
    Convert.cas(message)
})

/*
/etc/systemd/system/meu-projeto-nodejs.service
sudo systemctl start floarest-service.service         
☁  Florest BOT  sudo systemctl enable floarest-service.service
*/

client.login("MTE2Nzg1NjMzNzE2NjgxMTIyNg.GLFXDG.JHRQEnBkSk4kW8F5uVtLr2D6_96-pQtAfYOuXY");
console.log("Server ON")