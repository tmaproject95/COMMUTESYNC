import { pool } from '../db.js';
export const registerUser = (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;}
    if (!first_name || !email || !password) {
    return res.status(400).json({ message: 'Error: Please enter all the informations...' });}
