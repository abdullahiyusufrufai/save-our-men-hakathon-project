import { useNavigate } from 'react-router-dom';
import './AssessmentHistory.css';

function AssessmentHistory() {
    const navigate = useNavigate();

    const assessments = [
        {
            id: 'SOM-2345-001',
            patientName: 'John M. Doe',
            date: 'Dec 8, 2025',
            riskScore: 87.5,
            riskLevel: 'HIGH',
            status: 'Completed'
        },
        {
            id: 'SOM-2345-002',
            patientName: 'James Wilson',
            date: 'Dec 5, 2025',
            riskScore: 42.3,
            riskLevel: 'MEDIUM',
            status: 'Completed'
        },
        {
            id: 'SOM-2345-003',
            patientName: 'Robert Brown',
            date: 'Dec 3, 2025',
            riskScore: 15.8,
            riskLevel: 'LOW',
            status: 'Completed'
        },
        {
            id: 'SOM-2345-004',
            patientName: 'Michael Johnson',
            date: 'Nov 28, 2025',
            riskScore: null,
            riskLevel: null,
            status: 'Pending'
        }
    ];

    return (
        <div className="history-page">
            <header className="history-header">
                <div className="header-content">
                    <div className="logo-section">
                        <span className="logo-icon">💙</span>
                        <h1>SAVE OUR MEN</h1>
                    </div>
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>
                        ← Back to Home
                    </button>
                </div>
            </header>

            <div className="history-content">
                <div className="page-header">
                    <h2>Assessment History</h2>
                    <p>View all completed and pending patient assessments</p>
                </div>

                <div className="history-table-wrapper">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Assessment ID</th>
                                <th>Patient Name</th>
                                <th>Date</th>
                                <th>Risk Score</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assessments.map((assessment) => (
                                <tr key={assessment.id} className="animate-slide-up">
                                    <td className="id-cell">{assessment.id}</td>
                                    <td className="name-cell">{assessment.patientName}</td>
                                    <td className="date-cell">{assessment.date}</td>
                                    <td className="score-cell">
                                        {assessment.riskScore !== null ? (
                                            <div className="score-display">
                                                <span className={`score-value risk-${assessment.riskLevel.toLowerCase()}`}>
                                                    {assessment.riskScore}%
                                                </span>
                                                <span className={`risk-badge risk-badge-${assessment.riskLevel.toLowerCase()}`}>
                                                    {assessment.riskLevel}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="pending-text">—</span>
                                        )}
                                    </td>
                                    <td className="status-cell">
                                        <span className={`status-badge ${assessment.status.toLowerCase()}`}>
                                            {assessment.status}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <button className="btn-icon" title="View Details">
                                            👁️
                                        </button>
                                        <button className="btn-icon" title="Download Report">
                                            📄
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AssessmentHistory;
