import express from 'express';
import { getLiveLocation, updateLiveLocation } from '../controllers/liveLocationController.js';

const router = express.Router();

router.get('/:vehicleId', getLiveLocation);
router.post('/:vehicleId', updateLiveLocation);

export default router;