import express from 'express';
import {
    getAllRoutes,
    createRoute,
    getRouteById,
    deleteRoute
} from '../controllers/routeController.js';
const router = express.Router();
router.get('/', getAllRoutes);
router.get('/:id', getRouteById);
router.post('/', createRoute);
router.delete('/:id', deleteRoute);
export default router;
