const { pool } = require("../db/db");

async function getStds() {
    try {
        const [rows] = await pool.query("SELECT * FROM info");
        return rows;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw new Error("Failed to fetch students");
    }
}

async function getAStd(roll) {
    try {
        const [rows] = await pool.query("SELECT * FROM info WHERE roll = ?", [roll]);
        if (rows.length === 0) {
            throw new Error("Student not found");
        }
        return rows;
    } catch (error) {
        console.error("Error fetching student:", error);
        throw new Error("Failed to fetch student by roll number");
    }
}

async function addStudent(student) {
    try {
        const { roll, name, fees, medium } = student;
        const [result] = await pool.query(
            "INSERT INTO info (roll, name, fees, medium) VALUES (?, ?, ?, ?)",
            [roll, name, fees, medium]
        );
        return { id: result.insertId, roll, name, fees, medium };
    } catch (error) {
        console.error("Error adding student:", error);
        throw new Error("Failed to add student");
    }
}

// Update student
async function updateStudent(roll, updateData) {
    try {
        const { name, fees, medium } = updateData;
        const [result] = await pool.query(
            "UPDATE info SET name = ?, fees = ?, medium = ? WHERE roll = ?",
            [name, fees, medium, roll]
        );
        return result;
    } catch (error) {
        console.error("Error updating student:", error);
        throw new Error("Failed to update student");
    }
}

// Delete student
async function deleteStudent(roll) {
    try {
        const [result] = await pool.query("DELETE FROM info WHERE roll = ?", [roll]);
        return result;
    } catch (error) {
        console.error("Error deleting student:", error);
        throw new Error("Failed to delete student");
    }
}

module.exports = { getStds, getAStd, addStudent, updateStudent, deleteStudent };
