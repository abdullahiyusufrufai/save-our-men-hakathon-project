import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RiskScoreDashboard.css';

function RiskScoreDashboard({ formData, onBack }) {
    const navigate = useNavigate();
    const [showJustification, setShowJustification] = useState(null);

    const riskScore = 87.5;
    const riskLevel = 'HIGH RISK';

    const predictiveFactors = [
        { name: 'Genomic Markers', contribution: 25, level: 'high' },
        { name: 'Elevated PSA', contribution: 18, level: 'high' },
        { name: 'Abnormal DRE', contribution: 15, level: 'medium' },
        { name: 'BMI', contribution: 10, level: 'medium' },
        { name: 'Other Factors', contribution: 19.5, level: 'low' }
    ];

    const treatmentModalities = [
        {
            id: 1,
            name: 'Surgery: RP',
            confidence: 92,
            recommendation: 'Primary Path',
            justification: 'Based on patient age (65), good overall health status, and localized disease presentation. Radical prostatectomy offers excellent cancer control with potential for cure.'
        },
        {
            id: 2,
            name: 'Radiation: EBRT/Brachy',
            confidence: 85,
            recommendation: 'Strong Alternative',
            justification: 'External Beam Radiation Therapy or Brachytherapy provides comparable outcomes with less invasive approach. Suitable alternative given patient preferences.'
        },
        {
            id: 3,
            name: 'Active Surveillance (AS)',
            confidence: 5,
            recommendation: 'EXCLUDED',
            justification: 'Not recommended due to high-risk features: PSA > 10, abnormal DRE (T2b), and unfavorable genomic profile.'
        }
    ];

    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (riskScore / 100) * circumference;

    return (
        <div className="risk-dashboard">
            {/* Header */}
            <header className="risk-header">
                <div className="header-content">
                    <div className="logo-section">
                        <span className="logo-icon">💙</span>
                        <h1>SAVE OUR MEN</h1>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-outline" onClick={onBack}>
                            ← Back to Assessment
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/')}>
                            Start New Case
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="risk-content">
                <h2 className="dashboard-title">MOCKUP OF VIEW 3: SOM Score Dashboard (Step 6)</h2>

                <div className="dashboard-grid">
                    {/* Risk Score Circle */}
                    <div className="risk-score-section card">
                        <h3 className="card-header">SOM Prostate Cancer Risk Score</h3>

                        <div className="score-circle-container">
                            <svg className="score-circle" viewBox="0 0 200 200">
                                {/* Background circle */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    fill="none"
                                    stroke="#e2e8f0"
                                    strokeWidth="12"
                                />
                                {/* Progress circle */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    fill="none"
                                    stroke="url(#riskGradient)"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    transform="rotate(-90 100 100)"
                                    className="score-progress"
                                />
                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ef4444" />
                                        <stop offset="100%" stopColor="#dc2626" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="score-text">
                                <span className="score-value">{riskScore}%</span>
                            </div>
                        </div>

                        <div className="risk-badge-large risk-high">
                            {riskLevel}
                        </div>

                        <p className="risk-description">
                            "Likely chance you get aggressive prostate cancer..."
                        </p>
                    </div>

                    {/* Predictive Factors */}
                    <div className="factors-section card">
                        <h3 className="card-header">Top Predictive Factors</h3>

                        <div className="factors-chart">
                            <p className="chart-label">Risk Level Chart:</p>
                            <div className="bar-chart">
                                {predictiveFactors.map((factor, index) => (
                                    <div key={index} className="bar-item">
                                        <div className="bar-label">{factor.name.split(' ')[0]}</div>
                                        <div className="bar-wrapper">
                                            <div
                                                className={`bar-fill bar-${factor.level}`}
                                                style={{ height: `${factor.contribution * 3}px` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="factors-list">
                            <h4>Factor Contribution:</h4>
                            <ul>
                                {predictiveFactors.map((factor, index) => (
                                    <li key={index} className={`factor-item factor-${factor.level}`}>
                                        <span className="factor-name">{factor.name}:</span>
                                        <span className="factor-value">+{factor.contribution}%</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Treatment Modalities */}
                    <div className="treatment-section card">
                        <h3 className="card-header">Treatment Modalities Assessment</h3>

                        <div className="treatment-list">
                            {treatmentModalities.map((treatment) => (
                                <div
                                    key={treatment.id}
                                    className={`treatment-item ${treatment.recommendation === 'EXCLUDED' ? 'excluded' : ''}`}
                                >
                                    <div className="treatment-header">
                                        <span className="treatment-number">{treatment.id}.</span>
                                        <span className="treatment-name">{treatment.name}</span>
                                    </div>
                                    <div className="treatment-details">
                                        <span className="treatment-confidence">
                                            Confidence: {treatment.confidence}%
                                        </span>
                                        <span className={`treatment-type ${treatment.recommendation === 'Primary Path' ? 'primary' : treatment.recommendation === 'EXCLUDED' ? 'excluded' : 'alternative'}`}>
                                            ({treatment.recommendation})
                                        </span>
                                        <button
                                            className="view-justification"
                                            onClick={() => setShowJustification(showJustification === treatment.id ? null : treatment.id)}
                                        >
                                            [View Justification]
                                        </button>
                                    </div>
                                    {showJustification === treatment.id && (
                                        <div className="justification-panel animate-slide-up">
                                            <p>{treatment.justification}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="action-buttons">
                            <button className="btn btn-primary btn-block">
                                Generate Patient Summary & Consent Form
                            </button>
                            <button className="btn btn-secondary btn-block" onClick={() => navigate('/')}>
                                Start New Case
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RiskScoreDashboard;
