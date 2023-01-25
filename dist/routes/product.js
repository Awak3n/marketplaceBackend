import { Router } from 'express';
import productController from '../controllers/product.js';

const router = new Router();

router.get('/', (req, res) => productController.get(req, res));

router.get('/:id', (req, res) => productController.getById(req, res));

router.get('/name/:name', (req, res) => productController.getByName(req, res));

router.get('/price/:price', (req, res) => productController.getByPrice(req, res));

router.post('/', (req, res) => productController.create(req, res));

router.put('/:id', (req, res) => productController.update(req, res));

router.delete('/:id', (req, res) => productController.deleteById(req, res));

router.delete('/:name/:price', (req, res) => productController.deleteByNameAndPrice(req, res));

export default router;