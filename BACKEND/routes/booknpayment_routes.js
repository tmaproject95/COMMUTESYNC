import express from "express";
import {
    createBookingWithPayment,
    getAllBookings
} from '../controllers/booknpayment_controller.js';

const router = express.Router();
router.post('/', createBookingWithPayment);
router.get('/', getAllBookings);
export default router;

