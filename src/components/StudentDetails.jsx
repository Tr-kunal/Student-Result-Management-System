import React from 'react';
import './StudentDetails.css';

const StudentDetails = ({ student, onBack }) => {
    return (
        <div className="student-details-container">
            <div className="details-header">
                <button className="btn-back" onClick={onBack}>
                    ← Back to List
                </button>
                <h2>Student Details</h2>
            </div>

            <div className="details-card">
                <div className="student-avatar">
                    <div className="avatar-circle">
                        {student.name.charAt(0).toUpperCase()}
                    </div>
                </div>

                <div className="details-content">
                    <div className="detail-row">
                        <div className="detail-label">Roll No</div>
                        <div className="detail-value">{student.id}</div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Full Name</div>
                        <div className="detail-value">{student.name}</div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Section</div>
                        <div className="detail-value">
                            <span className="section-badge">{student.section}</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Marks Obtained</div>
                        <div className="detail-value">
                            <span className="marks-display">{student.marks} / 100</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Grade</div>
                        <div className="detail-value">
                            <span className={`grade-badge grade-${student.grade.replace('+', 'plus')}`}>
                                {student.grade}
                            </span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Percentage</div>
                        <div className="detail-value">{student.marks}%</div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Status</div>
                        <div className="detail-value">
                            <span className={`status-badge ${student.marks >= 40 ? 'pass' : 'fail'}`}>
                                {student.marks >= 40 ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="performance-indicator">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${student.marks}%` }}
                        ></div>
                    </div>
                    <div className="performance-text">
                        Performance: {student.marks >= 90 ? 'Excellent' : student.marks >= 75 ? 'Good' : student.marks >= 60 ? 'Average' : student.marks >= 40 ? 'Below Average' : 'Poor'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
