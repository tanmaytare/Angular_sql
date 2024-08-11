const express = require("express");
const cors = require("cors");
const { getStds, getAStd, addStudent, updateStudent, deleteStudent } = require("./Handler/handler");

const app = express();
const port = 3000;


// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Tanmay Tare");
});

app.get("/std", async (req, res) => {
    try {
        const students = await getStds();
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

app.get("/std/:rollNo", async (req, res) => {
    try {
        const { rollNo } = req.params;
        const student = await getAStd(rollNo);
        res.status(200).json(student);
    } catch (error) {
        if (error.message === 'Student not found') {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Error fetching student by roll number:", error);
            res.status(500).json({ error: 'Failed to fetch student by roll number' });
        }
    }
});

app.post("/std", async (req, res) => {
    try {
        const studentData = req.body;
        // Ensure that studentData has all necessary fields
        const newStudent = await addStudent(studentData);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// Update student
app.put("/std/:rollNo", async (req, res) => {
    try {
        const { rollNo } = req.params;
        const updateData = req.body;
        const updatedStudent = await updateStudent(rollNo, updateData);
        if (updatedStudent.affectedRows === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student updated successfully' });
        }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: 'Failed to update student' });
    }
});

// Delete student
app.delete("/std/:rollNo", async (req, res) => {
    try {
        const { rollNo } = req.params;
        const result = await deleteStudent(rollNo);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student deleted successfully' });
        }
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`);
});
