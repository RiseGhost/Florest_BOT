const conv = require('./index')
function Converter(message){
    try{
        const result = conv.converter(message.content)
        if (result != '')   message.reply(result)
    } catch(error){}
}

module.exports = {
    Converter: Converter
}