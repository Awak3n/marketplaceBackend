var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import database from '../database/database.js';
import toJson from './utils.js';
import { randomUUID } from 'crypto';
import productRepository from '../repository/product.js';
import storeRepository from '../repository/store.js';

const stores = database.marketplace.stores;

export default class Purchase {

    constructor(id) {
        if (id) {
            this.id = randomUUID();

            const product = productRepository.getProductById(id);

            this.store_id = product.store_id;
            this.product_id = product.id;
            this.product_name = product.name;
            this.product_price = product.price;

            const index = storeRepository.getIndexById(this.store_id);

            this.purchase_fee = parseFloat(stores[index].fee);
        }
    }

    save() {
        const index = storeRepository.getIndexById(this.store_id);

        database.marketplace.stores[index].purchases.push(toJson(this));

        return this;
    }

    format(purchase) {
        return _extends({}, purchase, {
            user_paid: purchase.product_price,
            store_money: purchase.product_price - purchase.product_price * purchase.purchase_fee / 100,
            marketplace_money: purchase.product_price * (purchase.purchase_fee - 1) / 100,
            ppp_money: purchase.product_price * database.marketplace.ppp_fee / 100
        });
    }

}