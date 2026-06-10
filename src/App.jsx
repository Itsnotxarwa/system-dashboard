import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./admin-dash-Components/admin-dashboard"
import AgentsPerTenant from './admin-dash-Components/tenantDetails/Agents';
import CallRecords from './admin-dash-Components/tenantDetails/CallRecords';
import Campaign from './admin-dash-Components/tenantDetails/Campaign';
import MetricsPerTenant from './admin-dash-Components/tenantDetails/Metrics';
import SessionExpired from './SessionExpired';
import Agents from "./admin-dash-Components/agents";
import CallsSessions from './admin-dash-Components/callsSessions';
import Metrics from './admin-dash-Components/metrics';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/tenant/:id/agents" element={<ProtectedRoute><AgentsPerTenant /></ProtectedRoute>} />
        <Route path="/tenant/:id/call-records" element={<ProtectedRoute><CallRecords /></ProtectedRoute>} />
        <Route path="/tenant/:id/campaign" element={<ProtectedRoute><Campaign /></ProtectedRoute>} />
        <Route path="/tenant/:id/metrics" element={<ProtectedRoute><MetricsPerTenant /></ProtectedRoute>} />
        <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
        <Route path="/calls&sessions" element={<ProtectedRoute><CallsSessions /></ProtectedRoute>} />
        <Route path="/metrics" element={<ProtectedRoute><Metrics /></ProtectedRoute>} />
        <Route path="/session-expired" element={<ProtectedRoute><SessionExpired /></ProtectedRoute>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
