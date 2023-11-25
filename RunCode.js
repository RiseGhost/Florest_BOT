const lib = require('./lib/index')
const {fork, exec} = require('child_process')
const fs = require('fs')

function C(message,code){
    const dir = "VirtualCodeEnv/disc-" + message.id
    const CodeFile = "file.c"
    lib.clonecode(dir,dir+"/"+CodeFile,code)
    exec("./runc.sh " + "disc-" + message.id + " " + CodeFile, (error,stdout,stderr) => {
        if (!error && !stderr) {
            const files = fs.readdirSync(dir)
            files.forEach(file => {
                if (file != 'a.out' && file != CodeFile && file != 'output.out'){
                    const command = "sudo chmod ugo=wr " + dir + "/" + file
                    exec(command,(error,stdout,stderr)=>{
                        if (!error && !stderr) message.channel.send({files: [dir + "/" + file]})
                    })
                }
            })
            const data = fs.readFileSync(dir+"/output.out").toString()
            if (data != '') message.reply(data)
        } else message.reply(stderr)
        setTimeout(()=>{exec('sudo rm -r ' + dir)},10000)
    })
}

module.exports = {C}