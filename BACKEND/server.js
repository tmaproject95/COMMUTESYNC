import express from 'express';
import cors from 'cors';
import {db,APP_PORT}  from "./db.js";
import user_routes from "./routes/user_routes.js";
import route_routes from "./route_routes.js";


const app = express();
const port=APP_PORT;
app.use(cors());
app.use(express.json());
app.use('/api/users', user_routes);
app.use("api/routes", route_routes);

app.listen(PORT, () => {
    console.log(`Server running in on http://localhost:${PORT}`);
});
