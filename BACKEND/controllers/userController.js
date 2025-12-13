import { pool } from '../db.js';
export const registerUser = (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;
    if (!first_name || !email || !password) {
        return res.status(400).json({ message: 'Error: Please enter all the informations...' });
    }
    const userRole = role || "Passenger";
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        connection.query('SELECT User_ID FROM Users WHERE Email = ?', [email], (error, results) => {

            if (error) {
                connection.release();
                return res.status(500).json({ message: 'Database error.' });
            } else if (results.length > 0) {
                connection.release();
                return res.status(400).json({ message: 'User already exists.' }); // <-- FIXED: Closing parenthesis added here
            } else {
                const insertQuery = 'INSERT INTO Users (First_Name, Last_Name, Email, Password, Role) VALUES (?, ?, ?, ?, ?)';
                const values = [first_name, last_name, email, password, userRole];

                connection.query(insertQuery, values, (err, result) => {
                    connection.release();

                    if (err) {
                        return res.status(500).json({ message: 'Database error inserting user.' });
                    } else {
                        res.status(201).json({ message: 'Registration successful.'});
                    }
                });
            }
        });
    });
};


export const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Error: Please enter informations correctly'
        });
    } else {
        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({
                    message: "Error in connection..."
                });
            } else {
                connection.query(
                    'SELECT User_ID, First_Name, Last_Name, Password, Role FROM Users WHERE Email = ?',
                    [email],
                    (err, results) => {
                        connection.release();

                        if (err) {
                            return res.status(500).json({
                                message: "DATABASE ERROR"
                            });
                        }

                        if (results.length === 1 && results[0].Password === password) {
                            res.json({ message: 'Login successful.' });
                        } else {
                            res.status(400).send(
                                "You have to enter correct email and password otherwise maybe you need to registger an account "
                            );
                        }
                    }
                );
            }
        });
    }
};

export const getUserProfile = (req, res) => {
    res.status(403).json({ message: 'Access Denied!!! First you need to login...' });


}
