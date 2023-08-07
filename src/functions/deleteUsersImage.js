let path = require('path');
let fs = require('fs');

function deleteUsersImage (filename){
    const storage = path.resolve(__dirname, `../../public/images/users/${filename}`);
    fs.unlink(storage, (err) => { if (err) {
        const mgsError = `Falha ao executar a função deleteImageBook | ${err}`
        console.log(err)
        return new Error(mgsError);
    }});
};

module.exports = deleteUsersImage;