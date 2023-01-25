import purchase from '../../dist/controllers/purchase.js';
import database from '../database/database.js';
import Purchase from '../models/purchase.js';
import productRepository from '../repository/product.js';

class PurchaseController {
    get (req, res) {
        try {
            var purchases = [];

            database.marketplace.stores.forEach( store => {
                purchases = purchases.concat(store.purchases);
            });

            const purchasesInformation = purchases.map( 
                (purchase) => new Purchase().format(purchase)
            );

            res.status(200).send(purchasesInformation);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    purchase (req, res) {
        try {
            const {
                params: { id },
            } = req;

            var index = productRepository.getIndexById(id);

            if (index === -1) {
                res.status(404).send("ID not found!");
                return;
            } 
                
            const purchase = new Purchase(id).save();
                
            res.status(201).send(purchase);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }  

}

export default new PurchaseController();