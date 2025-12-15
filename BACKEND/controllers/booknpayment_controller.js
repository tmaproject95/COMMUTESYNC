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
             VALUES (?, ?, ?, 'Confirmed')`,
            [trip_id, user_id, seat_id],
            (err, result) => {
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
                    pq,
                    [bookId, amount, method, transaction_id],
                    (err, results) => {
                        connection.release();

                        if (err) {
                            return res.status(500).json({ message: "Payment failed" });
                        }

                        res.status(200).json({
                            message: "Booking completed successfully",
                            booking_id: bookId,
                            payment_id: results.insertId
                        });
                    }
                );
            }
        );
    });
};
