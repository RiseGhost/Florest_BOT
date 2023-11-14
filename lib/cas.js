const cas = require('./index')

process.on('message',(message)=>{
    process.send(cas.cas(message))
})