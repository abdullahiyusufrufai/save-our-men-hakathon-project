import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

// Icons
const MedicalIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="url(#gradient)" />
        <path d="M24 12v24M12 24h24" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                <stop stopColor="#0d9488" />
                <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
        </defs>
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM3 18a7 7 0 0114 0H3z" />
    </svg>
);

const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);

const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

function LoginPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState('practitioner');
    const [loginData, setLoginData] = useState({ userId: '', password: '' });
    const [registerData, setRegisterData] = useState({ licenseNumber: '', email: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            if (role === 'practitioner') {
                navigate('/assessment');
            } else {
                navigate('/patient-dashboard');
            }
        }, 1000);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            alert('Registration request submitted! Check your email for verification.');
        }, 1000);
    };

    return (
        <div className="login-container">
            <div className="login-card animate-scale-in">
                {/* Header */}
                <div className="login-header">
                    <div className="logo-container">
                        <MedicalIcon />
                        <div className="logo-text">
                            <h1 className="logo-title">SAVE OUR MEN</h1>
                            <p className="logo-subtitle">Prostate Cancer Risk Assessment Platform</p>
                        </div>
                    </div>
                </div>

                {/* Role Selection */}
                <div className="role-selection animate-slide-up stagger-1">
                    <label className="role-label">Select Your Role:</label>
                    <div className="role-buttons">
                        <button
                            className={`role-btn ${role === 'practitioner' ? 'active' : ''}`}
                            onClick={() => setRole('practitioner')}
                        >
                            <span className="role-icon">🩺</span>
                            Medical Practitioner
                        </button>
                        <button
                            className={`role-btn ${role === 'patient' ? 'active' : ''}`}
                            onClick={() => setRole('patient')}
                        >
                            <span className="role-icon">👤</span>
                            Patient
                        </button>
                    </div>
                </div>

                {/* Login Form */}
                <form className="login-form animate-slide-up stagger-2" onSubmit={handleLogin}>
                    <h2 className="form-title">
                        {role === 'practitioner'
                            ? 'Practitioner Login (Full Assessment Access)'
                            : 'Patient Login'}
                    </h2>

                    <div className="input-group">
                        <label htmlFor="userId">
                            {role === 'practitioner' ? 'User ID (License No.)' : 'Patient ID'}
                        </label>
                        <div className="input-wrapper">
                            <span className="input-icon"><UserIcon /></span>
                            <input
                                type="text"
                                id="userId"
                                placeholder={role === 'practitioner' ? 'Enter your license number' : 'Enter your patient ID'}
                                value={loginData.userId}
                                onChange={(e) => setLoginData({ ...loginData, userId: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><LockIcon /></span>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </div>
                        <a href="#" className="forgot-link">Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isLoading}>
                        {isLoading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            <>Log In ({role === 'practitioner' ? 'Practitioner' : 'Patient'})</>
                        )}
                    </button>
                </form>

                {/* Info Box */}
                <div className="info-box animate-slide-up stagger-3">
                    <div className="info-icon">🔬</div>
                    <div className="info-content">
                        <h4>Need Prostate Cancer Testing?</h4>
                        <p>
                            Get your PSA test and initial screening at an SOM partner lab closest to your location.
                            <a href="#"> Click here</a> to find a lab and schedule an appointment now.
                        </p>
                    </div>
                </div>

                {/* Registration Form (Practitioner only) */}
                {role === 'practitioner' && (
                    <form className="register-form animate-slide-up stagger-4" onSubmit={handleRegister}>
                        <h3 className="register-title">New to SAVE OUR MEN? Create Account</h3>

                        <div className="input-group">
                            <label htmlFor="licenseNumber">Medical License Number</label>
                            <input
                                type="text"
                                id="licenseNumber"
                                placeholder="Enter your medical license number"
                                value={registerData.licenseNumber}
                                onChange={(e) => setRegisterData({ ...registerData, licenseNumber: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email for Verification</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your professional email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="btn btn-secondary btn-block">
                            Register for Access
                        </button>
                    </form>
                )}

                {/* Footer */}
                <div className="login-footer animate-slide-up stagger-5">
                    <div className="compliance-badge">
                        <ShieldIcon />
                        <span>HIPAA/GDPR/NDPR Compliant</span>
                    </div>
                    <p className="warning-text">
                        **AUTHORIZED USE ONLY.** This system is HIPAA/GDPR/NDPR compliant.
                        Unauthorized access is prohibited.
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
        </div>
    );
}

export default LoginPage;
