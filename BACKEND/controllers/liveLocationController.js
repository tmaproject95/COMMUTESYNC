import { pool } from '../db.js';

export const getLiveLocation = (req, res) => {
    const vID = req.params.vehicleId;

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json({ message: 'Connection Error' });

        connection.query(
            'SELECT Location_ID, Location_Name FROM Live_Locations WHERE Vehicle_ID = ? ORDER BY Location_ID DESC LIMIT 1', [vID], (error, results) => {
                connection.release();
                if (error) {
                    return res.status(500).json({ message: 'Database Error' });};
                if (results.length === 0) {
                    return res.status(404).json({ message: 'No location found' });}
                res.status(200).json(results[0]);
            }
        );
    });
};

export const updateLiveLocation = (req, res) => {
    const vID = req.params.vehicleId;
    const { location } = req.body;
    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json({ message: 'Connection Error' });

        connection.query(
            'INSERT INTO Live_Locations (Vehicle_ID, Location_Name) VALUES (?, ?)', [vID, location], (error, result) => {
                connection.release();
                if (error)
                {return res.status(500).json({ message: 'Database Error' });}
                else{
                   res.status(201).json({ message: 'Location updated', Location_id: result.insertId });}
            }
        );
    });
};