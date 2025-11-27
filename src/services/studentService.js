// API Base URL for JSON Server
const API_URL = 'http://localhost:3001/students';

// Get all students
export const getAllStudents = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

// Get student by ID
export const getStudentById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch student');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching student:', error);
        throw error;
    }
};

// Add new student
export const addStudent = async (student) => {
    try {
        // Check if a student with this ID already exists
        if (student.id) {
            const existingStudents = await getAllStudents();
            const duplicate = existingStudents.find(s => s.id === student.id);
            if (duplicate) {
                throw new Error(`Roll No ${student.id} already exists. Please use a different Roll No.`);
            }
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to add student: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
};

// Update existing student
export const updateStudent = async (id, student) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });
        if (!response.ok) {
            throw new Error('Failed to update student');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};

// Delete student
export const deleteStudent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete student');
        }
        return true;
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
};
