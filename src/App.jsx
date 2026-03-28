import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./admin-dash-Components/admin-dashboard"
import TenantDetails from './admin-dash-Components/tenantDetails/tenantDetails';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}/>
        <Route path='/tenants/:id' element={<TenantDetails />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
