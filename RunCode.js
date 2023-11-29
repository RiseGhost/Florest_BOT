const lib = require('./lib/index')
const { EmbedBuilder,Attachment } = require('discord.js')
const {fork, exec} = require('child_process')
const fs = require('fs')

function Embed(color,Tittle,Author,Description,Fields,Image){
    const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(Tittle)
    .setAuthor(Author)
    .setDescription(Description)
    .addFields(Fields)
    .setThumbnail(Image)
    return embed
}

//Envia todos os ficheiros criados pelo código:
//files -> os ficheiros default que já existem, por exemplo em C esse ficheiros são:
// a.out -> ficheiro de execução
// file.c -> ficheiro onde fica o código em C
// output.out -> ficheiro onde está o stdout do código de C
async function sendFiles(message,dir,files){
    const FilesCreat = fs.readdirSync(dir)
    FilesCreat.forEach(file => {
        if (!files.includes(file)){
            const command = "sudo chmod ugo=wr " + dir + "/" + file
            exec(command,(error,stdout,stderr)=>{
                if (!error && !stderr) message.channel.send({files: [dir + "/" + file]})
            })
        }
    })
}

function C(message,code){
    const dir = "VirtualCodeEnv/disc-" + message.id
    const CodeFile = "file.c"
    lib.clonecode(dir,dir+"/"+CodeFile,code)
    exec("./runc.sh " + "disc-" + message.id + " " + CodeFile, (error,stdout,stderr) => {
        if (!error && !stderr) {
            sendFiles(message,dir,['a.out',CodeFile,'output.out'])
            const data = fs.readFileSync(dir+"/output.out").toString()
            const embed = Embed(
                0x99FF00,
                "Code",
                { name: 'FlorestBot 🤖', iconURL: 'https://i.imgur.com/AfFp7pu.png',url: 'https://discord.js.org'},
                "```c" + code + "```",
                {name:'output',value:data},
                'attachment://c.png'
            )
            if (data != '') message.channel.send({embeds:[embed],files:['/home/theo-pi/Documents/Florest_BOT/images/c.png']})
        } else message.reply(stderr)
        setTimeout(()=>{exec('sudo rm -r ' + dir)},10000)
    })
}

function Python(message,code){
    const dir = "VirtualCodeEnv/disc-" + message.id
    const CodeFile = "py.py"
    lib.clonecode(dir,dir+"/"+CodeFile,code)
    exec("./runpy.sh " + "disc-" + message.id + " " + CodeFile, (error,stdout,stderr) => {
        if (!error && !stderr) {
            sendFiles(message,dir,[,CodeFile,'output.out'])
            const data = fs.readFileSync(dir+"/output.out").toString()
            const embed = Embed(
                0x99FF00,
                "Code",
                { name: 'FlorestBot 🤖', iconURL: 'https://i.imgur.com/AfFp7pu.png',url: 'https://discord.js.org'},
                "```python" + code + "```",
                {name:'output',value:data},
                'attachment://python.png'
            )
            if (data != '') message.channel.send({embeds:[embed],files:['/home/theo-pi/Documents/Florest_BOT/images/python.png']})
        } else message.reply(stderr)
        setTimeout(()=>{exec('sudo rm -r ' + dir)},10000)
    })
}

module.exports = {C,Python}