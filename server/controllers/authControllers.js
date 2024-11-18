const { response } = require('express');
const db = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { firstname, lastname, email, password, phone, dob, gender, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [patients] = await db.execute(`SELECT * FROM Patients WHERE email = ?`, [email]);

        if (patients.length) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const [result] = await db.execute(
            `INSERT INTO Patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [firstname, lastname, email, hashedPassword, phone, dob, gender, address]
        );
        res.status(201).json({ message: 'Patient Registered successfully', patientID: result.insertId });
        console.log('Patient Registered successfully');
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error });
        console.log('Server Error', error);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [patients] = await db.execute(`SELECT * FROM Patients WHERE email = ?`, [email]);

        if (patients.length === 0 || !(await bcrypt.compare(password, patients[0].password_hash))) {
            res.status(401).json({ message: 'Invalid password/email combination' });
            console.log("Invalid password/email combination");
            return;
        }

        res.status(200).json({ message: 'Login Successful' });
        console.log("Login Successful");
    } catch (e) {
        res.status(500).json({ message: 'Server Error', error: e });
        console.log('Failed to login', e);
    }
};
