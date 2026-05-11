import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./admin-dash-Components/admin-dashboard"
import AgentsPerTenant from './admin-dash-Components/tenantDetails/Agents';
import CallRecords from './admin-dash-Components/tenantDetails/CallRecords';
import Campaign from './admin-dash-Components/tenantDetails/Campaign';
import SessionExpired from './SessionExpired';
import { useState, useEffect } from 'react';
import Agents from "./admin-dash-Components/agents";
import CallsSessions from './admin-dash-Components/callsSessions';

function App() {
  const [sessionValid, setSessionValid] = useState(true);

  useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setSessionValid(false);
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                setSessionValid(false);
            }
        } catch {
            setSessionValid(false);
        }
    }, []);

    if (!sessionValid) return <SessionExpired />;

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}/>
        <Route path="/tenant/:id/agents" element={<AgentsPerTenant />} />
        <Route path="/tenant/:id/call-records" element={<CallRecords />} />
        <Route path="/tenant/:id/campaign" element={<Campaign />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/calls&sessions" element={<CallsSessions />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
