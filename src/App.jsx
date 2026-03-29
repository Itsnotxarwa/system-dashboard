import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./admin-dash-Components/admin-dashboard"
import Agents from './admin-dash-Components/tenantDetails/Agents';
import CallRecords from './admin-dash-Components/tenantDetails/CallRecords';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}/>
        <Route path="/tenant/:id/agents" element={<Agents />} />
        <Route path="/tenant/:id/call-records" element={<CallRecords />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
