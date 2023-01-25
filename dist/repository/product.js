import database from '../database/database.js';

class ProductRepository {
    getProductById(id) {
        var obj;

        database.marketplace.stores.forEach(store => {
            store.products.forEach(product => {
                if (product.id === id) {
                    obj = product;
                    //I tried return here but it was returning undefined
                }
            });
        });

        return obj;
    }

    getIndexById(id) {
        var obj = -1;
        var index;

        database.marketplace.stores.forEach(store => {
            index = store.products.findIndex(product => product.id === id);
            if (index !== -1) {
                obj = index;
            }
        });

        return obj;
    }

    getProductByName(name) {
        var products = [];

        database.marketplace.stores.forEach(store => {
            products = products.concat(store.products.filter(product => product.name === name));
        });

        return products;
    }

    getProductByPrice(price) {
        var products = [];

        database.marketplace.stores.forEach(store => {
            products = products.concat(store.products.filter(product => product.price === price));
        });

        return products;
    }

    getIndexesByNameAndPrice(name, price) {
        var indexes = [];
        var storeIndex = 0;

        database.marketplace.stores.forEach(store => {
            var productIndex = store.products.findIndex(product => product.name === name && product.price === price);

            if (productIndex !== -1) {
                indexes.push({ store: storeIndex, product: productIndex });
            }

            storeIndex += 1;
        });

        return indexes;
    }
}

export default new ProductRepository();