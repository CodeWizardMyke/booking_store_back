
const publicViews = {
    index:( req, res) => {
        const urlBase = {url:'http://localhost:3000/'}
        
        return res.render('index',{urlBase} );
    },
    singup:( req, res) => {
        return res.render('singup');
    },
    about:( req, res) => {
        return res.render('about');
    },
}

module.exports = publicViews;