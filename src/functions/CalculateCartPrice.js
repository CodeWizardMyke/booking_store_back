
function CalculateCartPrice (item, type_selected, qtd_items) {
    const {kindle_price, common_price, special_price, inventory } = item

    if(qtd_items > inventory){
        return false
    }

    let request_price = 0;
    let item_price = 0

    switch (type_selected) {
        case 'kindle_price':
            request_price = Number(kindle_price) * qtd_items;
            item_price = Number(kindle_price);
        break;
        case 'common_price':
            request_price = Number(common_price) * qtd_items;
            item_price = Number(common_price);
        break;
            case 'special_price':
            request_price = Number(special_price) * qtd_items;
            item_price = Number(special_price);
        break;
    }

    return {request_price: request_price, item_price: item_price};
};

module.exports = CalculateCartPrice;