import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import PortfolioBuilder from './pages/dashboard/PortfolioBuilder';
import CaseStudyBuilder from './pages/dashboard/CaseStudyBuilder';
import AnalyticsDashboard from './pages/dashboard/AnalyticsDashboard';
import PortfolioView from './pages/public/PortfolioView';
import NotFound from './pages/public/NotFound';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/:username" element={<PortfolioView />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/dashboard/portfolio" element={
                <PrivateRoute>
                  <PortfolioBuilder />
                </PrivateRoute>
              } />
              <Route path="/dashboard/case-studies" element={
                <PrivateRoute>
                  <CaseStudyBuilder />
                </PrivateRoute>
              } />
              <Route path="/dashboard/analytics" element={
                <PrivateRoute>
                  <AnalyticsDashboard />
                </PrivateRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;