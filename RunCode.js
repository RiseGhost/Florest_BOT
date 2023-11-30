const lib = require('./lib/index')
const { EmbedBuilder,Attachment } = require('discord.js')
const {fork, exec} = require('child_process')
const fs = require('fs')
const ImagePath = '/home/theo-pi/Documents/Florest_BOT/images/'

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
// DefaultFiles -> os ficheiros default que já existem, por exemplo em C esse ficheiros são:
// a.out        -> ficheiro de execução
// file.c       -> ficheiro onde fica o código em C
// output.out   -> ficheiro onde está o stdout do código de C
async function sendFiles(message,dir,DefaultFiles){
    const FilesCreat = fs.readdirSync(dir)
    FilesCreat.forEach(file => {
        if (!DefaultFiles.includes(file)){
            const command = "sudo chmod ugo=wr " + dir + "/" + file
            exec(command,(error,stdout,stderr)=>{
                if (!error && !stderr) message.channel.send({files: [dir + "/" + file]})
            })
        }
    })
}

function execute(message,code,CodeFile,language,shellscript,DefaultFiles){
    const dir = "VirtualCodeEnv/disc-" + message.id
    lib.clonecode(dir,dir+"/"+CodeFile,code)
    exec("./ShellScripts/" + shellscript + " disc-" + message.id + " " + CodeFile, (error,stdout,stderr) => {
        if (!error && !stderr) {
            sendFiles(message,dir,DefaultFiles)
            const data = fs.readFileSync(dir+"/output.out").toString()
            const embed = Embed(
                0x99FF00,
                "Code",
                { name: 'FlorestBot 🤖', iconURL: 'https://i.imgur.com/AfFp7pu.png',url: 'https://github.com/RiseGhost/Florest_BOT'},
                "```" + language + code + "```",
                {name:'output',value:data},
                'attachment://' + language + '.png'
            )
            if (data != '') message.channel.send({embeds:[embed],files:[ImagePath + language + '.png']})
        } else message.reply(stderr)
        setTimeout(()=>{exec('sudo rm -r ' + dir)},10000)
    })
}

function C(message,code){
    const CodeFile = "file.c"
    execute(message,code,CodeFile,'c','runc.sh',['a.out',CodeFile,'output.out'])
}

function Python(message,code){
    const CodeFile = "py.py"
    execute(message,code,CodeFile,'python','runpy.sh',[CodeFile,'output.out'])
}

module.exports = {C,Python}