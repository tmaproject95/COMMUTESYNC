import express from 'express';
import cors from 'cors';
import {db,APP_PORT}  from "./db.js";
import user_routes from "./routes/user_routes.js";
import route_routes from "./route_routes.js";
import trip_routes from './routes/trip_routes.js';
import booknpayment_routes from './routes/booknpayment_routes.js';
import vehicleseat_routes from './routes/vehiclenseat_routes.js';


const app = express();
app.use(express.json());
const port=APP_PORT;
app.use(cors());
app.use(express.json());
app.use('/api/users', user_routes);
app.use("/api/routes", route_routes);
app.use('/api/trips',trip_routes);
app.use('/api/bookings', booknpayment_routes);
app.use('/api/vehicles', vehicleseat_routes);

app.listen(port, () => {
    console.log(`Server running in on http://localhost:${port}`);
});
