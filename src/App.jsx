import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./admin-dash-Components/admin-dashboard"
import TenantsDetails from './admin-dash-Components/tenantsDetails';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}/>
        <Route path='/tenants/:id' element={<TenantsDetails />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
