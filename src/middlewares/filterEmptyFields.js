// Middleware para filtrar campos vazios
const filterEmptyFields = (req, res, next) => {
    for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key) && req.body[key] === '') {
          delete req.body[key];
        }
      }
      next();
  };

  module.exports = filterEmptyFields