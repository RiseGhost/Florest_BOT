const lib = require('./lib/index')
const { EmbedBuilder,Attachment } = require('discord.js')
const { exec } = require('child_process')
const fs = require('fs')
const ImagePath = '/home/theo-pi/Documents/Florest_BOT/images/'

/*
Responsável por fazer a execução do código em si.
Utiliza de ficheiros .sh juntamente com processos para criar e executar os ficheiros de código.
Todos os ficheiro de código são executados nu chroot em um root diferente.
Os ficheiro responsável por entrar no chroot, e copilar os ficheiros de código estão no pasta ShellSripts
As diretoria são criadas utilizando código em C que esta na diretoria lib/Code
-> Inicialmente criação da diretori no foramato disc-message.id;
-> Criação do ficheiros de código;
-> Entrar no chroot;
-> Escrever o stdout do código para um ficheiro out.out;
-> Ler o ficheiro out.out de devolver no chat do discord;
-> Caso haja ficheiros criados pelo código fornecido, esse ficheiro também são enviados.
*/

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
    return new Promise((resolve,reject) => {
        exec("./ShellScripts/" + shellscript + " disc-" + message.id + " " + CodeFile, (error,stdout,stderr) => {
            if (!error && !stderr) {
                sendFiles(message,dir,DefaultFiles)
                const data = fs.readFileSync(dir+"/output.out").toString()
                const embed = Embed(
                    0x99FF00,
                    "Code",
                    { name: 'FlorestBot 🤖', iconURL: 'https://i.imgur.com/AfFp7pu.png',url: 'https://github.com/RiseGhost/Florest_BOT'},
                    "```" + language + "\n" + code + "```",
                    {name:'output',value:data},
                    'attachment://' + language + '.png'
                )
                if (data != '') resolve({embeds:[embed],files:[ImagePath + language + '.png']})
                else resolve('')
            } else resolve(stderr)
            setTimeout(()=>{exec('sudo rm -r ' + dir)},10000)
        })
    })
}

async function C(message,code){
    const CodeFile = "file.c"
    return execute(message,code,CodeFile,'c','runc.sh',['a.out',CodeFile,'output.out'])
}

async function Python(message,code){
    const CodeFile = "py.py"
    return execute(message,code,CodeFile,'python','runpy.sh',[CodeFile,'output.out'])
}

module.exports = {C,Python}