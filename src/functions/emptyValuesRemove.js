//remove campos que estiverem vazios em um formulario recebido pelo front end

function emptyValuesRemove(data){
    return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''))
 }
 module.exports = emptyValuesRemove;