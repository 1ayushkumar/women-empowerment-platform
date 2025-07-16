import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

function DemoAccess() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const offlineLogin = useAuthStore((state) => state.offlineLogin);

  const handleDemoAccess = async () => {
    setIsLoading(true);
    
    try {
      // Create demo user directly
      const demoUser = {
        id: 'demo-user-123',
        name: 'Demo User',
        email: 'demo@womensempowerment.com',
        membershipPlan: 'premium'
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-access-token');
      
      // Update auth store
      const authStore = useAuthStore.getState();
      authStore.login(demoUser, 'demo-access-token');
      
      toast.success('🎉 Welcome to the Demo! Explore all features freely.');
      navigate('/home');
    } catch (error) {
      console.error('Demo access error:', error);
      toast.error('Demo access failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white text-center shadow-lg">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Try the Demo</h3>
          <p className="text-green-100 text-sm">
            Explore all features of the Women's Empowerment Platform without creating an account
          </p>
        </div>
        
        <button
          onClick={handleDemoAccess}
          disabled={isLoading}
          className="w-full bg-white text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-2"></div>
              Loading Demo...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Enter Demo (No Login Required)
            </>
          )}
        </button>
        
        <div className="mt-4 text-xs text-green-100">
          ✨ Full access to all features • No registration needed • Instant access
        </div>
      </div>
    </div>
  );
}

export default DemoAccess;
