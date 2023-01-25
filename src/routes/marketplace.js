import { Router } from 'express';
import marketplaceController from '../controllers/marketplace.js';

const router = new Router();

router.get('/', (req, res) => marketplaceController.get(req, res));

export default router;