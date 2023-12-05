const { detect } = require('program-language-detector')
const RunCode = require('./RunCode')

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
