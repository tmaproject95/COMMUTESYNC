import { pool } from '../db.js';

export const getAllVehicles = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json({ message: 'Connection Error' });

        connection.query(
            'SELECT Vehicle_ID, Plate_Number, Capacity FROM Vehicles',
            (error, results) => {
                connection.release();
                if (error) {return res.status(500).json({ message: 'Database Error' });};
                res.status(200).json(results);
            }
        );
    });
};

export const getSeatsByVehicle = (req, res) => {
    const vid = req.params.id;

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json({ message: 'Connection Error' });

        connection.query(
            'SELECT Seat_ID, Seat_Number, Is_Booked FROM Seats WHERE Vehicle_ID = ?', [vid], (error, results) => {
                connection.release();
                if (error) {return res.status(500).json({ message: 'Database Error' });}
                else{
                 res.status(200).json(results);};
            }
        );
    });
};

export const getAvailableSeats = (req, res) => {
    const vhid = req.params.id;

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json({ message: 'Connection Error' });

        connection.query(
            `SELECT Seat_ID, Seat_Number FROM Seats WHERE Vehicle_ID = ? AND Is_Booked = 0`, [vhid], (error, results) => {
                connection.release();
                if (error) return res.status(500).json({ message: 'Database Error' });
                res.status(200).json(results);
            }
        );
    });
};

export const bookSeat = (req, res) => {
    const sid = req.params.seatId;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Connection Error' });
        } else {
            connection.query(
                'UPDATE Seats SET Is_Booked = 1 WHERE Seat_ID = ? AND Is_Booked = 0', [sid], (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(500).json({ message: 'Database Error' });
                    }
                    else {
                        if (results.affectedRows === 0) {
                            res.status(200).json({ message: 'Seat Already Booked' });}
                        else {
                            res.status(200).json({ message: 'Seat booked successfully' });
                        }
                    }
                }
            );
        }
    });
};
