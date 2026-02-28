import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/PatientDashboard';
import PractitionerAssessment from './pages/PractitionerAssessment';
import AssessmentHistory from './pages/AssessmentHistory';
import EducationalResources from './pages/EducationalResources';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/assessment" element={<PractitionerAssessment />} />
        <Route path="/assessment-history" element={<AssessmentHistory />} />
        <Route path="/resources" element={<EducationalResources />} />
      </Routes>
    </Router>
  );
}

export default App;
