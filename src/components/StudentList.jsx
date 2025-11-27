import React from 'react';
import './StudentList.css';

const StudentList = ({ students, onLoad, onAdd, onEdit, onDelete, onView }) => {
    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            onDelete(id);
        }
    };

    return (
        <div className="student-list-container">
            <div className="header">
                <h1>Student Result Management System</h1>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={onLoad}>
                        🔄 Load Students
                    </button>
                    <button className="btn btn-success" onClick={onAdd}>
                        ➕ Add Student
                    </button>
                </div>
            </div>

            {students.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📚</div>
                    <h2>No Students Found</h2>
                    <p>Click "Load Students" to fetch data or "Add Student" to create a new record.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Section</th>
                                <th>Marks</th>
                                <th>Grade</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>
                                        <span className="section-badge">{student.section}</span>
                                    </td>
                                    <td>
                                        <span className="marks-badge">{student.marks}</span>
                                    </td>
                                    <td>
                                        <span className={`grade-badge grade-${student.grade.replace('+', 'plus')}`}>
                                            {student.grade}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-action btn-view"
                                                onClick={() => onView(student)}
                                                title="View Details"
                                            >
                                                👁️
                                            </button>
                                            <button
                                                className="btn-action btn-edit"
                                                onClick={() => onEdit(student)}
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn-action btn-delete"
                                                onClick={() => handleDelete(student.id, student.name)}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="stats-footer">
                <div className="stat-card">
                    <div className="stat-value">{students.length}</div>
                    <div className="stat-label">Total Students</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {students.length > 0
                            ? (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(1)
                            : 0}
                    </div>
                    <div className="stat-label">Average Marks</div>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
