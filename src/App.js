import './App.css';
import Header from './components/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/home/HomePage';
import GetCertificates from './components/pages/GetCertificates';
import IssueCertificates from './components/pages/IssueCertificates';
import RevokeRequest from './components/pages/RevokeRequest';
import ShareCertificate from './components/pages/ShareCertificate';
import PendingVerify from './components/pages/PendingVerify';
import CertificateDetail from './components/pages/CertificateDetail';
import LoginPage from './components/pages/LoginPage';
import PendingRequests from './components/pages/issuer/PendingRequests';
import RevokeCertificate from './components/pages/issuer/RevokeCertificate';
import IssuerDashboard from './components/pages/issuer/IssuerDashboard';
import IssuersList from './components/pages/issuer/IssuersList';
import IssueRequest from './components/pages/IssueRequest';

function App() {
  const location = useLocation();

  return (
    <div className="App hologram-background">
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      {location.pathname !== '/login' && <Header />}
      <div className="flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issuer-dashboard" element={<IssuerDashboard />} />
          <Route path="/issuers" element={<IssuersList />} />
          <Route path="/get" element={<GetCertificates />} />
          <Route path="/issue" element={<IssueCertificates />} />
          <Route path="/revoke/:address?" element={<RevokeCertificate />} />
          <Route path="/share/:address?" element={<ShareCertificate />} />
          <Route path="/revoke-request/:address?" element={<RevokeRequest />} />
          <Route path="/issue-request" element={<IssueRequest />} />
          <Route path="/pending" element={<PendingVerify />} />
          <Route path="/requests" element={<PendingRequests />} />
          <Route path="/get/:address" element={<CertificateDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
