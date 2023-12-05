const { detect } = require('program-language-detector')
const RunCode = require('./RunCode')

/*
Existe a criação de um processo que recebe como argumento uma messagem do discord e devolve:
NULL -> Se a mensagem não for código
STDOUT/STDERR -> Caso a mensagem seja código ele tenta executar o código e devolve o stdout em caso positivo ou o
stderr em caso negativo.
*/

const LanguagesSuport = new Map()
LanguagesSuport.set("C++",(message,code) => {return RunCode.C(message,code)})
LanguagesSuport.set("C",(message,code) => {return RunCode.C(message,code)})
LanguagesSuport.set("Python",(message,code) => {return RunCode.Python(message,code)})

process.on('message',async (message)=>{
    const language = detect(message.content)
    if (LanguagesSuport.has(language)){
        process.send(await LanguagesSuport.get(language)(message,message.content))
    }
    else process.send(null)
})
