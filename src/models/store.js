import database from '../database/database.js';
import toJson from './utils.js';
import { randomUUID } from 'crypto';

export default class Store {
    constructor(body) {
        if (body) {
            this.id = body.id ? body.id : randomUUID();
            this.marketplace = database.marketplace.id;

            if (body.name) {
                this.name = body.name;
            } else {
                throw new Error("Name can't be null!");
            }

            try {
                const parsedFee = parseFloat(body.fee); 

                this.fee = body.fee && parsedFee && parsedFee >= 1 ? parsedFee : 10;
            } catch (err) {
                throw new Error("Fee must be a positive number!");
            }
        
            this.products = [];
            this.purchases = [];
        } else {
            throw new Error("Bad request");
        }
    }

    save() {
        database.marketplace.stores.push(toJson(this));

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
                const parsedFee = parseFloat(body.fee);            

                this.fee = body.fee && parsedFee && parsedFee >= 1  ? parsedFee : this.fee;
            } catch (err) {
                throw new Error("Fee must be a positive number!");
            }
        }

        database.marketplace.stores[index] = toJson(this);

        return this;
    }
}