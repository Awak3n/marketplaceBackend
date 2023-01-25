import database from '../database/database.js';

class MarketplaceController {
    get(req, res) {
        try {
            res.send(database.marketplace);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

export default new MarketplaceController();