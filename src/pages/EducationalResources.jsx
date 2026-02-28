import { useNavigate } from 'react-router-dom';
import './EducationalResources.css';

function EducationalResources() {
    const navigate = useNavigate();

    const resources = [
        {
            category: 'Understanding Prostate Cancer',
            items: [
                {
                    title: 'What is Prostate Cancer?',
                    description: 'A comprehensive guide to understanding prostate cancer, its causes, and how it develops.',
                    type: 'Article',
                    duration: '10 min read',
                    icon: '📖'
                },
                {
                    title: 'Risk Factors Explained',
                    description: 'Learn about the various risk factors including age, family history, and ethnicity.',
                    type: 'Video',
                    duration: '15 min',
                    icon: '🎬'
                },
                {
                    title: 'Early Warning Signs',
                    description: 'Recognize the symptoms and early warning signs of prostate cancer.',
                    type: 'Infographic',
                    duration: '5 min',
                    icon: '📊'
                }
            ]
        },
        {
            category: 'Screening & Diagnosis',
            items: [
                {
                    title: 'Understanding PSA Testing',
                    description: 'Everything you need to know about Prostate-Specific Antigen (PSA) blood tests.',
                    type: 'Article',
                    duration: '12 min read',
                    icon: '🔬'
                },
                {
                    title: 'Digital Rectal Exam (DRE)',
                    description: 'What to expect during a DRE and why it is an important screening tool.',
                    type: 'Video',
                    duration: '8 min',
                    icon: '🎬'
                },
                {
                    title: 'Biopsy Procedures',
                    description: 'A detailed explanation of prostate biopsy procedures and what to expect.',
                    type: 'Article',
                    duration: '15 min read',
                    icon: '📖'
                }
            ]
        },
        {
            category: 'Treatment Options',
            items: [
                {
                    title: 'Surgery: Radical Prostatectomy',
                    description: 'Understand surgical treatment options and recovery expectations.',
                    type: 'Video',
                    duration: '20 min',
                    icon: '🎬'
                },
                {
                    title: 'Radiation Therapy',
                    description: 'Learn about external beam radiation and brachytherapy treatments.',
                    type: 'Article',
                    duration: '14 min read',
                    icon: '📖'
                },
                {
                    title: 'Active Surveillance',
                    description: 'When watchful waiting may be the right approach for low-risk cancers.',
                    type: 'Infographic',
                    duration: '7 min',
                    icon: '📊'
                }
            ]
        },
        {
            category: 'Lifestyle & Support',
            items: [
                {
                    title: 'Diet & Nutrition',
                    description: 'Foods and dietary habits that may help reduce prostate cancer risk.',
                    type: 'Article',
                    duration: '10 min read',
                    icon: '🥗'
                },
                {
                    title: 'Exercise Guidelines',
                    description: 'Physical activity recommendations for prostate health.',
                    type: 'Video',
                    duration: '12 min',
                    icon: '🏃'
                },
                {
                    title: 'Mental Health Support',
                    description: 'Resources for emotional and psychological support during diagnosis and treatment.',
                    type: 'Guide',
                    duration: '8 min read',
                    icon: '💚'
                }
            ]
        }
    ];

    return (
        <div className="resources-page">
            <header className="resources-header">
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

            <div className="resources-content">
                <div className="page-header">
                    <h2>Educational Resources</h2>
                    <p>Learn about prostate cancer, screening, treatment options, and lifestyle recommendations</p>
                </div>

                <div className="categories-grid">
                    {resources.map((category, catIndex) => (
                        <div key={catIndex} className="category-section animate-slide-up" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                            <h3 className="category-title">{category.category}</h3>
                            <div className="resources-list">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="resource-item">
                                        <div className="resource-icon">{item.icon}</div>
                                        <div className="resource-info">
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                            <div className="resource-meta">
                                                <span className="resource-type">{item.type}</span>
                                                <span className="resource-duration">{item.duration}</span>
                                            </div>
                                        </div>
                                        <button className="resource-action">→</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="help-section">
                    <div className="help-card">
                        <div className="help-icon">❓</div>
                        <div className="help-content">
                            <h3>Need More Help?</h3>
                            <p>Contact our support team or speak with a healthcare professional about your questions.</p>
                            <button className="btn btn-primary">Contact Support</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationalResources;
