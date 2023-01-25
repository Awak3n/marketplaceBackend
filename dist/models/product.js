import database from '../database/database.js';
import toJson from './utils.js';
import { randomUUID } from 'crypto';
import storeRepository from '../repository/store.js';

const stores = database.marketplace.stores;

export default class Product {
    constructor(body) {
        if (body && body.store_id) {
            const index = storeRepository.getIndexById(body.store_id);

            if (index === -1) {
                throw new Error("Store ID must be valid!");
            }

            this.id = body.id ? body.id : randomUUID();
            this.store_id = body.store_id;

            if (body.name) {
                this.name = body.name;
            } else {
                throw new Error("Name can't be null!");
            }

            try {
                const parsedPrice = parseFloat(body.price);

                if (body.price && parsedPrice && parsedPrice >= 0) {
                    this.price = parsedPrice;
                } else {
                    throw new Error("Price must be a positive number!");
                }
            } catch (err) {
                throw new Error("Price must be a positive number!");
            }
        } else {
            throw new Error("Bad request");
        };
    }

    save() {
        const index = storeRepository.getIndexById(this.store_id);

        database.marketplace.stores[index].products.push(toJson(this));

        return this;
    }

    update(index, body) {
        if (body) {
            if (body.name) {
                this.name = body.name;
            } else {
                throw new Error("Name can't be null!");
            }

            try {
                const parsedPrice = parseFloat(body.price);

                if (body.price && parsedPrice && parsedPrice >= 0) {
                    this.price = parsedPrice;
                } else {
                    throw new Error("Price must be a positive number!");
                }
            } catch (err) {
                throw new Error("Price must be a positive number!");
            }
        }

        const storeIndex = storeRepository.getIndexById(this.store_id);

        database.marketplace.stores[storeIndex].products[storeIndex] = toJson(this);

        return this;
    }
}