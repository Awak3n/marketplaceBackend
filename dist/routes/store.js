import { Router } from 'express';
import storeController from '../controllers/store.js';

const router = new Router();

router.post('/', (req, res) => storeController.create(req, res));

router.put('/:id', (req, res) => storeController.update(req, res));

export default router;