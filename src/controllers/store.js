import database from '../database/database.js';
import Store from '../models/store.js';
import storeRepository from '../repository/store.js';

class StoreController {
  create(req, res) {
    try {
        const store = new Store(req.body).save();

        res.status(201).send(store);
    } catch (err) {
        res.status(400).send(err.message);
    }
  }

  update(req, res) {
    try {
        const {
          params: { id },
        } = req;

        var index = storeRepository.getIndexById(id);

        if (index === -1) {
            res.status(404).send("ID not found!");
            return;
        } 

        new Store(database.marketplace.stores[index]).update(index, req.body);

        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(err.message);
    }
  }
}

export default new StoreController();