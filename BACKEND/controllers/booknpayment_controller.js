import { pool } from '../db.js';

export const createBookingWithPayment = (req, res) => {
    const { trip_id, user_id, seat_id, amount, method, transaction_id } = req.body;

    if (!trip_id || !seat_id || !amount || !method) {
        return res.status(400).json({ message: "Please fill out all fields" });
    }

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json({ message: "Something went wrong" });

        connection.query(
            `INSERT INTO Bookings (Trip_ID, User_ID, Seat_ID, Booking_Status)
             VALUES (?, ?, ?, 'Confirmed')`, [trip_id, user_id, seat_id], (err, result) => {
                if (err) {
                    connection.release();
                    return res.status(500).json({ message: "Booking failed" });
                }

                const bookId = result.insertId;

                const pq = `
                    INSERT INTO Payments (Booking_ID, Amount, Method, Transaction_ID, Status)
                    VALUES (?, ?, ?, ?, 'Completed')
                `;

                connection.query(
                    pq, [bookId, amount, method, transaction_id], (err, results) => {
                        if (err) {
                            connection.release();
                            return res.status(500).json({ message: "Payment failed" });
                        }

                        const pID = results.insertId;
                        const message = `The booking of (ID: ${bookId}) has been confirmed. Payment ID: ${pID}`;

                        connection.query('INSERT INTO Notifications (User_ID, Message) VALUES (?, ?)',[user_id, message],
                            (err, notifResult) => {
                                connection.release();
                                if (err) {
                                    return res.status(500).json({ message: "Notification is not coming..."});
                                }
                                else{
                                res.status(200).json({
                                    message: "Booking and payment completed successfully",
                                    booking_id: bookId,
                                    payment_id: pID,
                                    notification_id: notifResult.insertId
                                });}
                            }
                        );
                    }
                );
            }
        );
    });
};



export const getAllBookings = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection failed...' });
        }

        const selectQuery = `
            SELECT 
                Bookings.Booking_ID,
                Users.First_Name,
                Users.Email,
                Bookings.Trip_ID,
                Bookings.Seat_ID,
                Bookings.Booking_Status,
                Payments.Payment_ID,
                Payments.Amount,
                Payments.Method,
                Payments.Transaction_ID,
                Payments.Status
            FROM Bookings
            JOIN Users ON Bookings.User_ID = Users.User_ID
            LEFT JOIN Payments ON Bookings.Booking_ID = Payments.Booking_ID
        `;

        connection.query(selectQuery, (err, results) => {
            connection.release();

            if (err) {
                return res.status(500).json({ message: 'Database Error...' });
            }

            res.status(200).json(results);
        });
    });
};