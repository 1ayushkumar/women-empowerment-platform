import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';

function ProtectedRoute({ children }) {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Initialize auth state from localStorage
    const init = async () => {
      try {
        initializeAuth();
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    init();
  }, [initializeAuth]);

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // TEMPORARY: Allow access for testing (remove this in production)
  // TODO: Remove this bypass and uncomment the authentication check below

  // Redirect to login if not authenticated, preserving the intended destination
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return children;
}

export default ProtectedRoute;