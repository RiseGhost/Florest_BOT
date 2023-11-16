const convert = require('./build/Release/Units')
const CalculatExpression = require('./build/Release/CAS')

function NumeresLastIndex(message){
    var index = 0;
    for (var i = 0; i < message.length; i++){
        if (isNaN(message[i]) && message[i] != '.') return i - 1
    }
    return index
}

function Convert(message){
    var msg = message.replace(/\s/g,'').replace(/,/g,'.')
    var number = parseFloat(msg.substring(0,NumeresLastIndex(msg)+1))
    var units = msg.substring(NumeresLastIndex(msg)+1).split('to')
    if (number != NaN && units.length > 1){
        conv = convert.converter(units[0],units[1],number)
        if (conv != "Invalid convert")
            return convert.converter(units[0],units[1],number)
    }
    else return ""
}

function ValidateExpresion(message){
    message = message.replace(/(\d)\(/g,'$1*(')
    if (message.match(/^(([0-9().]*)|\(|cos|sen|sin|tan|!|([/+*^-]))*$/g)) {
        return CalculatExpression.CalculatExpression(message)
    }
    return ""
}

module.exports = {
    converter:  Convert,
    cas:        ValidateExpresion
}