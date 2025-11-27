import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import * as studentService from './services/studentService';
import './App.css';

function App() {
    // State management
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentView, setCurrentView] = useState('list'); // 'list', 'form', 'details'
    const [isEditMode, setIsEditMode] = useState(false);

    // Load all students from API
    const handleLoadStudents = async () => {
        try {
            const data = await studentService.getAllStudents();
            setStudents(data);
            alert('Students loaded successfully!');
        } catch (error) {
            alert('Error loading students. Please try again.');
        }
    };

    // Switch to Add Student form
    const handleAddStudent = () => {
        setSelectedStudent(null);
        setIsEditMode(false);
        setCurrentView('form');
    };

    // Switch to Edit Student form
    const handleEditStudent = (student) => {
        setSelectedStudent(student);
        setIsEditMode(true);
        setCurrentView('form');
    };

    // Save student (Add or Update)
    const handleSaveStudent = async (studentDataOrId, studentData) => {
        try {
            if (isEditMode) {
                // Update existing student
                // In edit mode: first param is id, second is studentData
                await studentService.updateStudent(studentDataOrId, studentData);
                alert('Student updated successfully! Click "Load Students" to see changes.');
            } else {
                // Add new student
                // In add mode: first param is studentData, second is undefined
                await studentService.addStudent(studentDataOrId);
                alert('Student added successfully! Click "Load Students" to see the new record.');
            }
            setCurrentView('list');
            setSelectedStudent(null);
        } catch (error) {
            // Show specific error message
            alert(error.message || 'Error saving student. Please try again.');
        }
    };

    // Delete student
    const handleDeleteStudent = async (id) => {
        try {
            await studentService.deleteStudent(id);
            alert('Student deleted successfully! Click "Load Students" to refresh the list.');
        } catch (error) {
            alert('Error deleting student. Please try again.');
        }
    };

    // View student details
    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setCurrentView('details');
    };

    // Go back to list view
    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedStudent(null);
    };

    // Render based on current view
    const renderView = () => {
        switch (currentView) {
            case 'form':
                return (
                    <StudentForm
                        student={selectedStudent}
                        onSave={handleSaveStudent}
                        onCancel={handleBackToList}
                        isEditMode={isEditMode}
                    />
                );
            case 'details':
                return (
                    <StudentDetails
                        student={selectedStudent}
                        onBack={handleBackToList}
                    />
                );
            case 'list':
            default:
                return (
                    <StudentList
                        students={students}
                        onLoad={handleLoadStudents}
                        onAdd={handleAddStudent}
                        onEdit={handleEditStudent}
                        onDelete={handleDeleteStudent}
                        onView={handleViewDetails}
                    />
                );
        }
    };

    return (
        <div className="app">
            <div className="app-background"></div>
            <div className="app-content">
                {renderView()}
            </div>
        </div>
    );
}

export default App;
