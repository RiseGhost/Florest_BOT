const lib = require('./lib/index')
const { EmbedBuilder,Attachment } = require('discord.js')
const { exec } = require('child_process')
const fs = require('fs')
const ImagePath = '/home/theo-pi/Documents/Florest_BOT/images/'
const color = 0x99FF00

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

function Embed(Description,Fields,Image){
    const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle("Code")
    .setAuthor({ name: 'FlorestBot 🤖', iconURL: 'https://i.imgur.com/AfFp7pu.png',url: 'https://github.com/RiseGhost/Florest_BOT'})
    .setDescription(Description)
    .addFields(Fields)
    .setThumbnail(Image)
    return embed
}

// Obtem todos os ficheiros criados pelo código:
// DefaultFiles -> os ficheiros default que já existem, por exemplo em C esse ficheiros são:
// a.out        -> ficheiro de execução
// file.c       -> ficheiro onde fica o código em C
// output.out   -> ficheiro onde está o stdout do código de C
function getFiles(message,dir,DefaultFiles){
    const FilesCreat = fs.readdirSync(dir)
    var files = []
    FilesCreat.forEach(file => {
        if (!DefaultFiles.includes(file))
            files.push(dir+"/"+file)
    })
    return files
}

function execute(message,code,CodeFile,language,shellscript,DefaultFiles){
    const dir = "VirtualCodeEnv/disc-" + message.id
    lib.clonecode(dir,dir+"/"+CodeFile,code)
    return new Promise((resolve,reject) => {
        exec("./ShellScripts/" + shellscript + " disc-" + message.id + " " + CodeFile, (error,stdout,stderr) => {
            if (!error && !stderr) {
                var Files = getFiles(message,dir,DefaultFiles)
                Files.push(ImagePath + language + '.png')
                const stdout = fs.readFileSync(dir+"/output.out").toString()
                var data = ''
                if (stdout == '') {data = 'null'}
                else {data = stdout}
                const embed = Embed(
                    "```" + language + "\n" + code + "```",
                    ({name:'output',value:data}),
                    'attachment://' + language + '.png'
                )
                resolve({embeds:[embed],files:Files})
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

async function JavaScript(message,code){
    const CodeFile = "node.js"
    return execute(message,code,CodeFile,'javascript','runjs.sh',[CodeFile,'output.out'])
}

module.exports = {C,Python,JavaScript}