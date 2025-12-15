import express from 'express';
import {
    getAllVehicles,
    getSeatsByVehicle,
    getAvailableSeats,
    bookSeat
} from '../controllers/vehiclenseatController.js';
const router = express.Router();
router.get('/vehicles', getAllVehicles);
router.get('/vehicles/:id/seats', getSeatsByVehicle);
router.get('/vehicles/:id/seats/available', getAvailableSeats);
router.put('/seats/:seatId/book', bookSeat);
export default router;
