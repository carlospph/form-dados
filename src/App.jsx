import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeTintas from "./HomeTintas";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';  
import ProtectedRoute from './components/ProtectedRoute';  
import DetalhesTops from './pages/DetalhesTops';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeTintas />} />
        <Route path="/detalhesTops/:id" element={<DetalhesTops />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
