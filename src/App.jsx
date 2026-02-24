import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeTintas from "./HomeTintas";
import Tops from './pages/Tops';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Import the DashboardPage
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeTintas />} />
        <Route path="/tops/:id" element={<Tops />} />
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
