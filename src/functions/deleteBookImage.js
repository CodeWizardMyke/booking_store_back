let path = require('path');
let fs = require('fs');

function deleteImageBook (filename){
    const storage = path.resolve(__dirname, `../../public/images/books/${filename}`);
    fs.unlink(storage, (err) => { if (err) {
        const mgsError = `Falha ao executar a função deleteImageBook | ${err}`
        console.log(err)
        return new Error(mgsError);
    }});
};

module.exports = deleteImageBook;