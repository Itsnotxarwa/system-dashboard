import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./admin-dash-Components/admin-dashboard"
import TenantDetails from './admin-dash-Components/tenantDetails/tenantDetails';
import AgentsList from './admin-dash-Components/agents-components/AgentsList';
import CallRecords from './admin-dash-Components/tenantDetails/CallRecords';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}/>
        <Route path='/tenants/:id' element={<TenantDetails />} />
        <Route path='/agents' element={<AgentsList />} />
        <Route path='/call-records' element={<CallRecords />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
