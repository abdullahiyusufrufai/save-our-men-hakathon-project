import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './PatientDashboard.css';

// Sample patient data
const patientData = {
    id: 'SOM-2345-NGA',
    name: 'John M. Doe',
    age: 65,
    sex: 'Male',
    address: '123 Example St.',
    nin: '******1234',
    pmh: 'Hypertension, Type 2 Diabetes',
    socialHistory: 'Retired Engineer',
    alcoholHistory: 'Socially',
    smokingHistory: 'Ex-Smoker | Pack Years: 30',
    riskScore: 87.5,
    riskLevel: 'HIGH RISK',
    lastCalculated: 'Dec 8, 2025'
};

// Icons
const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);

const ClipboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7zm3 3a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h3a1 1 0 100-2H7z" />
    </svg>
);

const BookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
    </svg>
);

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
);

function PatientDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const getRiskColor = (level) => {
        if (level.includes('HIGH')) return 'high';
        if (level.includes('MEDIUM')) return 'medium';
        return 'low';
    };

    const menuItems = [
        { id: 'profile', label: 'My Health Profile', icon: <HomeIcon /> },
        { id: 'history', label: 'My Assessment History', icon: <ClipboardIcon /> },
        { id: 'resources', label: 'Educational Resources', icon: <BookIcon /> }
    ];

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">💙</div>
                    <span className="logo-text-sidebar">SAVE OUR MEN</span>
                </div>

                <nav className="sidebar-nav">
                    <p className="nav-label">Menu</p>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-text">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button
                        className="logout-btn"
                        onClick={() => navigate('/')}
                    >
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="dashboard-header">
                    <h1 className="page-title">Patient Dashboard</h1>
                    <div className="header-right">
                        <span className="patient-id">Patient ID: <strong>{patientData.id}</strong></span>
                        <button className="header-logout" onClick={() => navigate('/')}>
                            [Logout]
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="dashboard-content">
                    {activeTab === 'profile' && (
                        <div className="profile-content animate-fade-in">
                            <div className="profile-header-row">
                                <h2 className="section-title">My Health Profile: {patientData.name}</h2>
                                <button className="btn btn-primary">
                                    <EditIcon />
                                    Edit/Update My Information
                                </button>
                            </div>

                            {/* Personal Information Card */}
                            <div className="info-card animate-slide-up stagger-1">
                                <h3 className="card-title">Personal Identification & Contact</h3>
                                <div className="info-grid">
                                    <div className="info-field">
                                        <label>Name:</label>
                                        <div className="field-value">{patientData.name}</div>
                                    </div>
                                    <div className="info-field">
                                        <label>Age:</label>
                                        <div className="field-value">{patientData.age}</div>
                                    </div>
                                    <div className="info-field">
                                        <label>Sex:</label>
                                        <div className="field-value">{patientData.sex}</div>
                                    </div>
                                    <div className="info-field full-width">
                                        <label>Address:</label>
                                        <div className="field-value">{patientData.address}</div>
                                    </div>
                                    <div className="info-field">
                                        <label>NIN:</label>
                                        <div className="field-value">{patientData.nin}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Medical History Card */}
                            <div className="info-card animate-slide-up stagger-2">
                                <h3 className="card-title">Medical and Social History</h3>
                                <div className="info-grid">
                                    <div className="info-field">
                                        <label>PMH:</label>
                                        <div className="field-value">{patientData.pmh}</div>
                                    </div>
                                    <div className="info-field">
                                        <label>SH:</label>
                                        <div className="field-value">{patientData.socialHistory}</div>
                                    </div>
                                    <div className="info-field">
                                        <label>Alcohol History:</label>
                                        <div className="field-value">{patientData.alcoholHistory}</div>
                                    </div>
                                    <div className="info-field">
                                        <label>Smoking History:</label>
                                        <div className="field-value">{patientData.smokingHistory}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Risk Score Card */}
                            <div className="risk-score-card animate-slide-up stagger-3">
                                <div className="risk-score-content">
                                    <h3 className="risk-title">Latest SOM Prostate Cancer Risk Score</h3>
                                    <div className={`risk-score-display risk-${getRiskColor(patientData.riskLevel)}`}>
                                        <span className="score-value">{patientData.riskScore}%</span>
                                        <span className={`risk-badge risk-badge-${getRiskColor(patientData.riskLevel)}`}>
                                            **{patientData.riskLevel}**
                                        </span>
                                    </div>
                                    <p className="risk-date">Calculated: {patientData.lastCalculated}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="history-content animate-fade-in">
                            <h2 className="section-title">My Assessment History</h2>
                            <div className="history-list">
                                <div className="history-item">
                                    <div className="history-date">Dec 8, 2025</div>
                                    <div className="history-details">
                                        <span className="history-score">Risk Score: 87.5%</span>
                                        <span className="risk-badge risk-badge-high">HIGH RISK</span>
                                    </div>
                                    <button className="btn btn-outline">View Details</button>
                                </div>
                                <div className="history-item">
                                    <div className="history-date">Sep 15, 2025</div>
                                    <div className="history-details">
                                        <span className="history-score">Risk Score: 72.3%</span>
                                        <span className="risk-badge risk-badge-high">HIGH RISK</span>
                                    </div>
                                    <button className="btn btn-outline">View Details</button>
                                </div>
                                <div className="history-item">
                                    <div className="history-date">Jun 20, 2025</div>
                                    <div className="history-details">
                                        <span className="history-score">Risk Score: 45.8%</span>
                                        <span className="risk-badge risk-badge-medium">MEDIUM RISK</span>
                                    </div>
                                    <button className="btn btn-outline">View Details</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="resources-content animate-fade-in">
                            <h2 className="section-title">Educational Resources</h2>
                            <div className="resources-grid">
                                <div className="resource-card">
                                    <div className="resource-icon">📚</div>
                                    <h4>Understanding Prostate Cancer</h4>
                                    <p>Learn about prostate cancer risk factors, symptoms, and prevention strategies.</p>
                                    <a href="#" className="resource-link">Read More →</a>
                                </div>
                                <div className="resource-card">
                                    <div className="resource-icon">🩺</div>
                                    <h4>PSA Testing Guide</h4>
                                    <p>Everything you need to know about Prostate-Specific Antigen testing.</p>
                                    <a href="#" className="resource-link">Read More →</a>
                                </div>
                                <div className="resource-card">
                                    <div className="resource-icon">🥗</div>
                                    <h4>Lifestyle & Prevention</h4>
                                    <p>Diet, exercise, and lifestyle changes that may reduce your risk.</p>
                                    <a href="#" className="resource-link">Read More →</a>
                                </div>
                                <div className="resource-card">
                                    <div className="resource-icon">💬</div>
                                    <h4>Support Resources</h4>
                                    <p>Connect with support groups and mental health resources.</p>
                                    <a href="#" className="resource-link">Read More →</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default PatientDashboard;
