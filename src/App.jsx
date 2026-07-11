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
import ProtectedRoute from "./ProtectedRoute";
import Agent from './admin-dash-Components/agents-components/agent';
import TenantAgent from './admin-dash-Components/tenantDetails/agents-components/agent';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/tenant/:id/agents" element={<ProtectedRoute><AgentsPerTenant /></ProtectedRoute>} />
        <Route path="/tenant/:id/agents/:agentId" element={<ProtectedRoute><TenantAgent /></ProtectedRoute>} />
        <Route path="/tenant/:id/call-records" element={<ProtectedRoute><CallRecords /></ProtectedRoute>} />
        <Route path="/tenant/:id/campaign" element={<ProtectedRoute><Campaign /></ProtectedRoute>} />
        <Route path="/tenant/:id/metrics" element={<ProtectedRoute><MetricsPerTenant /></ProtectedRoute>} />
        <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
        <Route path="/calls&sessions" element={<ProtectedRoute><CallsSessions /></ProtectedRoute>} />
        <Route path="/metrics" element={<ProtectedRoute><Metrics /></ProtectedRoute>} />
        <Route path="/agent/:id" element={<ProtectedRoute><Agent /></ProtectedRoute>} />
        <Route path="/session-expired" element={<SessionExpired />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
