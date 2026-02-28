import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RiskScoreDashboard from '../components/RiskScoreDashboard';
import './PractitionerAssessment.css';

const ethnicities = [
    'Nigerian (Yoruba)',
    'Nigerian (Igbo)',
    'Nigerian (Hausa)',
    'African American',
    'Caucasian',
    'Asian',
    'Other'
];

const familyHistoryOptions = [
    'None',
    'Father Dx',
    'Brother Dx',
    'Father/Brother Dx',
    'Multiple Family Members'
];

function PractitionerAssessment() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [genomicConsent, setGenomicConsent] = useState(false);

    const [formData, setFormData] = useState({
        // Demographics
        age: '65',
        ethnicity: 'Nigerian (Yoruba)',
        // Clinical Markers
        psaLevel: '18.5',
        familyHistory: 'Father/Brother Dx',
        dre: 'T2b',
        // Lifestyle
        weight: '95',
        height: '178',
        bmi: '29.9',
        smoking: 'Current',
        diabetes: 'Yes',
        vasectomy: 'No',
        // Imaging
        prostateVolume: '45.2',
        mriFile: null,
        // Genomics
        genomicFile: null
    });

    const steps = [
        { id: 1, label: 'Demographics & Clinical Markers' },
        { id: 2, label: 'Lifestyle' },
        { id: 3, label: 'Imaging & Diagnostics' },
        { id: 4, label: 'Genomics' },
        { id: 5, label: 'SOM Score Generation' }
    ];

    const handleChange = (field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };
            // Auto-calculate BMI
            if (field === 'weight' || field === 'height') {
                const weight = parseFloat(updated.weight);
                const height = parseFloat(updated.height) / 100;
                if (weight && height) {
                    updated.bmi = (weight / (height * height)).toFixed(1);
                }
            }
            return updated;
        });
    };

    const calculateScore = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
            setShowResults(true);
        }, 2000);
    };

    const getBMIStatus = (bmi) => {
        const value = parseFloat(bmi);
        if (value < 18.5) return 'UNDERWEIGHT';
        if (value < 25) return 'NORMAL';
        if (value < 30) return 'OVERWEIGHT';
        return 'OBESE';
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="step-content animate-fade-in">
                        <h2 className="step-title">VIEW 1: Steps 1 & 2 (Demographics & Clinical Markers)</h2>

                        {/* Demographics Section */}
                        <div className="form-section">
                            <h3 className="section-label">Patient Demographics & Ethnicity</h3>
                            <div className="form-grid cols-2">
                                <div className="form-group">
                                    <label>Age:</label>
                                    <input
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) => handleChange('age', e.target.value)}
                                        placeholder="Enter age"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ethnicity:</label>
                                    <select
                                        value={formData.ethnicity}
                                        onChange={(e) => handleChange('ethnicity', e.target.value)}
                                    >
                                        {ethnicities.map(eth => (
                                            <option key={eth} value={eth}>{eth}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Clinical Markers Section */}
                        <div className="form-section">
                            <h3 className="section-label">Key Clinical Markers</h3>
                            <div className="form-grid cols-2">
                                <div className="form-group">
                                    <label>PSA Level:</label>
                                    <input
                                        type="text"
                                        value={formData.psaLevel}
                                        onChange={(e) => handleChange('psaLevel', e.target.value)}
                                        placeholder="ng/mL"
                                    />
                                    {parseFloat(formData.psaLevel) > 10 && (
                                        <div className="alert alert-warning">
                                            <span className="alert-icon">⚠️</span>
                                            <span>Alert: Value &gt; 10.0 ng/mL. High risk factor detected.</span>
                                            <button className="alert-close">✕</button>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Family History:</label>
                                    <select
                                        value={formData.familyHistory}
                                        onChange={(e) => handleChange('familyHistory', e.target.value)}
                                    >
                                        {familyHistoryOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group mt-4">
                                <label>Abnormal DRE:</label>
                                <div className="radio-group">
                                    {['T2b', 'T2a', 'Normal'].map(opt => (
                                        <label key={opt} className="radio-label">
                                            <input
                                                type="radio"
                                                name="dre"
                                                value={opt}
                                                checked={formData.dre === opt}
                                                onChange={(e) => handleChange('dre', e.target.value)}
                                            />
                                            <span className="radio-custom"></span>
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content animate-fade-in">
                        <h2 className="step-title">VIEW 2: Step 3 (Lifestyle & Comorbidity)</h2>

                        <div className="form-section">
                            <h3 className="section-label">3. Lifestyle & Comorbidity</h3>
                            <div className="form-grid cols-3">
                                <div className="form-group">
                                    <label>Weight:</label>
                                    <div className="input-with-unit">
                                        <input
                                            type="number"
                                            value={formData.weight}
                                            onChange={(e) => handleChange('weight', e.target.value)}
                                        />
                                        <span className="unit">kg</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Height:</label>
                                    <div className="input-with-unit">
                                        <input
                                            type="number"
                                            value={formData.height}
                                            onChange={(e) => handleChange('height', e.target.value)}
                                        />
                                        <span className="unit">cm</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>BMI:</label>
                                    <div className="bmi-display">
                                        <span className="bmi-value">{formData.bmi}</span>
                                        <span className={`bmi-status ${getBMIStatus(formData.bmi).toLowerCase()}`}>
                                            ({getBMIStatus(formData.bmi)})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="lifestyle-options mt-4">
                                <div className="option-row">
                                    <span className="option-label">Smoking:</span>
                                    <div className="option-chips">
                                        {['Current', 'Former', 'Never'].map(opt => (
                                            <button
                                                key={opt}
                                                className={`chip ${formData.smoking === opt ? 'active' : ''}`}
                                                onClick={() => handleChange('smoking', opt)}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="option-row">
                                    <span className="option-label">Diabetes:</span>
                                    <div className="option-chips">
                                        {['Yes', 'No'].map(opt => (
                                            <button
                                                key={opt}
                                                className={`chip ${formData.diabetes === opt ? 'active' : ''}`}
                                                onClick={() => handleChange('diabetes', opt)}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="option-row">
                                    <span className="option-label">Vasectomy:</span>
                                    <div className="option-chips">
                                        {['Yes', 'No'].map(opt => (
                                            <button
                                                key={opt}
                                                className={`chip ${formData.vasectomy === opt ? 'active' : ''}`}
                                                onClick={() => handleChange('vasectomy', opt)}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="step-content animate-fade-in">
                        <h2 className="step-title">VIEW 2: Step 4 (Imaging & Diagnostics)</h2>

                        <div className="form-section">
                            <h3 className="section-label">4. Imaging & Diagnostics</h3>
                            <div className="form-grid cols-2">
                                <div className="form-group">
                                    <label>Prostate Volume:</label>
                                    <div className="input-with-unit">
                                        <input
                                            type="number"
                                            value={formData.prostateVolume}
                                            onChange={(e) => handleChange('prostateVolume', e.target.value)}
                                        />
                                        <span className="unit">cm³</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>MRI Upload:</label>
                                    <div className="file-upload-area">
                                        {formData.mriFile ? (
                                            <div className="file-uploaded">
                                                <span className="file-icon">📁</span>
                                                <span className="file-name">[File Uploaded]</span>
                                            </div>
                                        ) : (
                                            <>
                                                <input
                                                    type="file"
                                                    id="mriUpload"
                                                    className="file-input"
                                                    accept=".dcm,.nii,.zip"
                                                    onChange={(e) => handleChange('mriFile', e.target.files[0])}
                                                />
                                                <label htmlFor="mriUpload" className="file-label">
                                                    <span className="upload-icon">📤</span>
                                                    <span>Click to upload MRI</span>
                                                </label>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content animate-fade-in">
                        <h2 className="step-title">VIEW 2: Step 5 (Genomics Data & Repository)</h2>

                        <div className="form-grid-custom">
                            <div className="form-section genomics-section">
                                <h3 className="section-label">5. Genomics Data & Repository</h3>
                                <label>Raw Data Upload:</label>
                                <div className="drag-drop-area">
                                    <input
                                        type="file"
                                        id="genomicUpload"
                                        className="file-input"
                                        accept=".vcf,.fastq,.bam"
                                        onChange={(e) => handleChange('genomicFile', e.target.files[0])}
                                    />
                                    <label htmlFor="genomicUpload" className="drag-drop-label">
                                        <span className="drag-icon">📂</span>
                                        <span className="drag-text">[Drag/Drop Area]</span>
                                        <span className="drag-subtext">or click to browse</span>
                                    </label>
                                </div>
                            </div>

                            <div className="system-note">
                                <h4>System Note:</h4>
                                <p>Commitment visible in ticker above. Proceed with data upload.</p>
                            </div>
                        </div>

                        <div className="consent-section">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={genomicConsent}
                                    onChange={(e) => setGenomicConsent(e.target.checked)}
                                />
                                <span className="checkbox-custom"></span>
                                <span>I confirm I understand the mandatory deposition of anonymized genomic data.</span>
                            </label>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="step-content animate-fade-in">
                        <h2 className="step-title">Step 6: Calculate SOM Score</h2>

                        <div className="summary-section">
                            <h3>Assessment Summary</h3>
                            <div className="summary-grid">
                                <div className="summary-item">
                                    <span className="summary-label">Age:</span>
                                    <span className="summary-value">{formData.age} years</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Ethnicity:</span>
                                    <span className="summary-value">{formData.ethnicity}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">PSA Level:</span>
                                    <span className="summary-value">{formData.psaLevel} ng/mL</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Family History:</span>
                                    <span className="summary-value">{formData.familyHistory}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">BMI:</span>
                                    <span className="summary-value">{formData.bmi} ({getBMIStatus(formData.bmi)})</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">DRE Finding:</span>
                                    <span className="summary-value">{formData.dre}</span>
                                </div>
                            </div>
                        </div>

                        <div className="calculate-section">
                            <button
                                className="btn btn-primary btn-lg calculate-btn"
                                onClick={calculateScore}
                                disabled={isCalculating || !genomicConsent}
                            >
                                {isCalculating ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        Calculating Score...
                                    </>
                                ) : (
                                    '6. Calculate SOM Score'
                                )}
                            </button>
                            {!genomicConsent && (
                                <p className="consent-warning">Please confirm genomic data consent in Step 4</p>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (showResults) {
        return <RiskScoreDashboard formData={formData} onBack={() => setShowResults(false)} />;
    }

    return (
        <div className="assessment-layout">
            {/* Sidebar */}
            <aside className="assessment-sidebar">
                <div className="sidebar-brand">
                    <div className="brand-icon">💙</div>
                    <h1 className="brand-title">SAVE OUR MEN</h1>
                </div>

                <div className="flow-section">
                    <h3 className="flow-title">Assessment Flow</h3>
                    <div className="step-list">
                        {steps.map((step) => (
                            <button
                                key={step.id}
                                className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                                onClick={() => setCurrentStep(step.id)}
                            >
                                <span className="step-number">{step.id}</span>
                                <span className="step-label">{step.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="assessment-main">
                {/* Header */}
                <header className="assessment-header">
                    <div className="header-left">
                        <span className="commitment-ticker">MANDATORY COMMITMENT: Genetic data will be anonymized and deposited</span>
                    </div>
                    <div className="header-right">
                        <span className="patient-info">John M. Doe, ID: SOM-98765-NGA</span>
                        <select className="language-select">
                            <option>English</option>
                            <option>French</option>
                            <option>Yoruba</option>
                        </select>
                        <span className="session-timer">Session expires in 5:00</span>
                    </div>
                </header>

                {/* Content */}
                <div className="assessment-content">
                    {renderStep()}

                    {/* Navigation */}
                    <div className="step-navigation">
                        <button
                            className="btn btn-secondary"
                            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                            disabled={currentStep === 1}
                        >
                            ← Back: {currentStep > 1 ? steps[currentStep - 2].label.split(' ')[0] : ''}
                        </button>

                        {currentStep < 5 && (
                            <button
                                className="btn btn-primary"
                                onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                            >
                                Next: {steps[currentStep].label.split(' ')[0]} →
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PractitionerAssessment;
