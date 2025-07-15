import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Home from './components/home/Home';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Education from './components/education/Education';
import Entrepreneurship from './components/entrepreneurship/Entrepreneurship';
import Employment from './components/employment/Employment';
import Health from './components/health/Health';
import Safety from './components/safety/Safety';
import Finance from './components/finance/Finance';
import MentorshipHub from './components/mentorship/MentorshipHub';
import CommunityForum from './components/community/CommunityForum';
import EventsCalendar from './components/events/EventsCalendar';
import useAuthStore from './store/authStore';
import Membership from './components/auth/Membership';
import Dashboard from './components/dashboard/Dashboard';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <main>
                  <Hero />
                  <Features />
                </main>
              </>
            } />

            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/home" replace /> : (
                <>
                  <Navbar />
                  <div className="container mx-auto px-4">
                    <LoginForm />
                    <div className="text-center mt-4">
                      <p className="text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="text-purple-600 hover:text-purple-700">
                          Register here
                        </Link>
                      </p>
                    </div>
                  </div>
                </>
              )
            } />

            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/home" replace /> : (
                <>
                  <Navbar />
                  <div className="container mx-auto px-4">
                    <RegisterForm />
                    <div className="text-center mt-4">
                      <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-purple-600 hover:text-purple-700">
                          Login here
                        </Link>
                      </p>
                    </div>
                  </div>
                </>
              )
            } />
            <Route path="/membership" element={<Membership />} />

            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </ProtectedRoute>
            } />

            <Route path="/education/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Education />
                </>
              </ProtectedRoute>
            } />

            <Route path="/entrepreneurship/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Entrepreneurship />
                </>
              </ProtectedRoute>
            } />

            <Route path="/employment/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Employment />
                </>
              </ProtectedRoute>
            } />

            <Route path="/health/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Health />
                </>
              </ProtectedRoute>
            } />

            <Route path="/safety/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Safety />
                </>
              </ProtectedRoute>
            } />

            <Route path="/finance" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Finance />
                </>
              </ProtectedRoute>
            } />

            {/* New Feature Routes */}
            <Route path="/mentorship/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <MentorshipHub />
                </>
              </ProtectedRoute>
            } />

            <Route path="/community/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <CommunityForum />
                </>
              </ProtectedRoute>
            } />

            <Route path="/events/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <EventsCalendar />
                </>
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            } />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;