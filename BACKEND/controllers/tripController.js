import express from "express"
import { pool } from '../db.js';
export const createTrip = (req, res) => {
    const { route_id, vehicle_id, departure_time, arrival_time } = req.body;
    if (!route_id || !vehicle_id || !departure_time || !arrival_time) {
        return res.status(400).json({ message: 'Error: Please provide Route ID, Vehicle ID, and Times.' });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Connection Error' });
        }
        connection.query(`INSERT INTO Trips (Route_ID, Vehicle_ID, Departure_Time, Arrival_Time) VALUES (?, ?, ?, ?)`,[route_id, vehicle_id, departure_time, arrival_time], (error, results) => {
            connection.release();

            if (error) {
                return res.status(500).json({ message: 'Database error while scheduling trip.' });
            }
            else{return res.status(201).json({
                message: 'Trips Created',
                trip_id: results.insertId})};
        });
    });
};

export const getAllTrips = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Connection Error' });
        }
        const selectall=`
            SELECT 
                Trips.Trip_ID,
                Routes.Source,
                Routes.Destination,
                Trips.Departure_Time,
                Trips.Arrival_Time,
                Trips.Vehicle_ID,
                Routes.Est_Duration
            FROM Trips
            JOIN Routes ON Trips.Route_ID = Routes.Route_ID`;
        connection.query(selectall, (error, results) => {
            connection.release();
            if (error) {
                return res.status(500).json({ message: 'Connection Error' });

            }
            else{
                return res.status(201).json({results})
            }
        })

    })
}




