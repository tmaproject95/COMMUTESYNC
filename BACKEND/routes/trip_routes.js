import express from "express"
const router = express.Router();
import {
    createTrip,
    getAllTrips,

} from '../controllers/tripController.js';
router.get('/', getAllTrips);
router.post('/', createTrip);


export default router;