import { Router } from 'express';
import marketRouter from './marketplace.js';
import productRouter from './product.js';
import purchaseRouter from './purchase.js';
import storeRouter from './store.js';

const router = new Router();

router.get('/healths', (req, res) => res.status(200).json({ status: 'UP' }));

router.use('/marketplace', marketRouter);

router.use('/product', productRouter);

router.use('/purchase', purchaseRouter);

router.use('/store', storeRouter);

export default router;