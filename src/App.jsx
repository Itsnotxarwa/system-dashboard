import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./admin-dash-Components/admin-dashboard"
import AgentsPerTenant from './admin-dash-Components/tenantDetails/Agents';
import CallRecords from './admin-dash-Components/tenantDetails/CallRecords';
import Campaign from './admin-dash-Components/tenantDetails/Campaign';
import MetricsPerTenant from './admin-dash-Components/tenantDetails/Metrics';
import Agents from "./admin-dash-Components/agents";
import CallsSessions from './admin-dash-Components/callsSessions';
import Metrics from './admin-dash-Components/metrics';

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}/>
        <Route path="/tenant/:id/agents" element={<AgentsPerTenant />} />
        <Route path="/tenant/:id/call-records" element={<CallRecords />} />
        <Route path="/tenant/:id/campaign" element={<Campaign />} />
        <Route path="/tenant/:id/metrics" element={<MetricsPerTenant />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/calls&sessions" element={<CallsSessions />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
