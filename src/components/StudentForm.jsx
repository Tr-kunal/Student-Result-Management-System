import React, { useState } from 'react';
import './StudentForm.css';

const StudentForm = ({ student, onSave, onCancel, isEditMode }) => {
    const [formData, setFormData] = useState({
        id: student?.id || '',
        name: student?.name || '',
        section: student?.section || '',
        marks: student?.marks || '',
        grade: student?.grade || '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.id) {
            newErrors.id = 'Roll No is required';
        } else if (isNaN(formData.id) || formData.id <= 0) {
            newErrors.id = 'Roll No must be a positive number';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.section.trim()) {
            newErrors.section = 'Section is required';
        }

        if (!formData.marks) {
            newErrors.marks = 'Marks are required';
        } else if (formData.marks < 0 || formData.marks > 100) {
            newErrors.marks = 'Marks must be between 0 and 100';
        }

        if (!formData.grade.trim()) {
            newErrors.grade = 'Grade is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const studentData = {
            ...formData,
            id: Number(formData.id),
            marks: Number(formData.marks),
        };

        if (isEditMode) {
            onSave(student.id, studentData);
        } else {
            onSave(studentData);
        }
    };

    return (
        <div className="student-form-container">
            <div className="form-header">
                <h2>{isEditMode ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
                <p>Fill in the details below to {isEditMode ? 'update' : 'add'} a student record</p>
            </div>

            <form onSubmit={handleSubmit} className="student-form">
                <div className="form-group">
                    <label htmlFor="id">
                        Roll No <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="Enter roll number"
                        className={errors.id ? 'error' : ''}
                        disabled={isEditMode}
                    />
                    {errors.id && <span className="error-message">{errors.id}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">
                        Student Name <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter student name"
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="section">
                        Section <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="section"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        placeholder="Enter section (e.g., A, B, C)"
                        className={errors.section ? 'error' : ''}
                    />
                    {errors.section && <span className="error-message">{errors.section}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="marks">
                        Marks <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        id="marks"
                        name="marks"
                        value={formData.marks}
                        onChange={handleChange}
                        placeholder="Enter marks (0-100)"
                        min="0"
                        max="100"
                        className={errors.marks ? 'error' : ''}
                    />
                    {errors.marks && <span className="error-message">{errors.marks}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="grade">
                        Grade <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        placeholder="Enter grade (e.g., A+, A, B+)"
                        className={errors.grade ? 'error' : ''}
                    />
                    {errors.grade && <span className="error-message">{errors.grade}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {isEditMode ? 'Update Student' : 'Add Student'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
