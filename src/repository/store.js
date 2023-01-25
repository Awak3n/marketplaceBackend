import database from '../database/database.js';

class StoreRepository {
    getIndexById(id) {
        return database.marketplace.stores.findIndex(store => store.id === id);
    }
}

export default new StoreRepository();