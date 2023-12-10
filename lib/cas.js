const cas = require('./index')

function Calculate(message){
    const result = cas.cas(message.content,message.id)
    if (result != '')   message.reply(cas.cas(message.content,message.id))
}

module.exports = {
    Calculate: Calculate
}