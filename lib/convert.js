const conv = require('./index')

process.on('message',(message)=>{
    process.send(conv.converter(message))
})