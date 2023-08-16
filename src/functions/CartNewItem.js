const CalculateCartPrice = require("./CalculateCartPrice");

const CartNewItem = (req, book) => {
    const { id_books, qtd_items, type_selected } = req.body
    const id_user = req.token_decoded.id;

    const {request_price, item_price} = CalculateCartPrice(book, type_selected, qtd_items);

    const cartItem = {
        item_price,
        request_price,
        status:'pending',
        status_delivery:'',
        qtd_items,
        type_selected: type_selected,
        user_cpf: '',
        fk_id_books: id_books,
        fk_id_user: id_user
    }
    return cartItem;
};

module.exports = CartNewItem; 