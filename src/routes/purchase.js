import { Router } from 'express';
import purchaseController from '../controllers/purchase.js';

const router = new Router();

router.get('/', (req, res) => purchaseController.get(req, res));

router.post('/:id', (req, res) => purchaseController.purchase(req, res));

export default router;