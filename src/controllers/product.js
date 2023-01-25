import database from '../database/database.js';
import Product from '../models/product.js';
import productRepository from '../repository/product.js';
import storeRepository from '../repository/store.js';
import { randomUUID } from 'crypto';

class ProductController {

    get(req, res) {
        try {
            var products = [];

            database.marketplace.stores.forEach( store => {
                products = products.concat(store.products);
            });

            res.status(200).send(products);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    getById(req, res) {
        try {
            const {
              params: { id },
            } = req;

            const product = productRepository.getProductById(id);

            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send("ID not found!");
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    getByName(req, res) {
        try {
            const {
              params: { name },
            } = req;

            const products = productRepository.getProductByName(name);

            if (products) {
                res.status(200).send(products);
            } else {
                res.status(404).send("Product not found!");
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    getByPrice(req, res) {
        try {
            const {
              params: { price },
            } = req;

            const parsedPrice = parseFloat(price); 

            const products = productRepository.getProductByPrice(parsedPrice);

            if (products) {
                res.status(200).send(products);
            } else {
                res.status(404).send("Product not found!");
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    create(req, res) {
        try {
          const product = new Product(req.body).save();
  
          res.status(201).send(product);
        } catch (err) {
            res.status(422).send(err.message);
        }
    }

    update(req, res) {
        try {
            const {
              params: { id },
            } = req;

            var index = productRepository.getIndexById(id);

            if (index === -1) {
                res.status(404).send("ID not found!");
                return;
            }    

            var product = productRepository.getProductById(id);

            new Product(product).update(index, req.body);

            res.sendStatus(200);
        } catch (err) {
            res.status(422).send(err.message);
        }
    }

    deleteById(req, res) {
        try {
            const {
              params: { id },
            } = req;

            var index = productRepository.getIndexById(id);

            if (index === -1) {
                res.status(404).send("Product not found!");
                return;
            }    

            const product = productRepository.getProductById(id)

            const storeIndex = storeRepository.getIndexById(product.store_id); 

            database.marketplace.stores[storeIndex].products.splice(index, 1);
    
            res.sendStatus(204);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    deleteByNameAndPrice(req, res) {
        try {
            const {
              params: { name, price },
            } = req;

            const parsedPrice = parseFloat(price);

            var indexes = productRepository.getIndexesByNameAndPrice(
              name, parsedPrice
            );

            if (!indexes.length) {
                res.status(404).send("Products not found!");
                return;
            }
                
            indexes.forEach(index => {
                database.marketplace.stores[index.store].products.splice(index.product, 1);
            });

            res.sendStatus(204);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

}

export default new ProductController();