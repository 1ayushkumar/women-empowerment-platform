import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

function OfflineLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const adminEmails = [
    'admin@womenempowerment.com',
    'ayushkumar200326@gmail.com',
    'test@example.com',
    'testuser@example.com'
  ];

  const handleOfflineLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    if (adminEmails.includes(email)) {
      // Create temporary user for offline admin access
      const tempUser = {
        _id: 'offline-admin',
        email: email,
        profile: {
          fullName: email.split('@')[0],
          phone: '',
          location: ''
        },
        role: 'admin',
        isAdmin: true,
        membershipPlan: 'premium'
      };

      const tempToken = 'offline-admin-token-' + Date.now();

      // Use the auth store login function
      login(tempUser, tempToken);
      
      toast.success(`Welcome, ${tempUser.profile.fullName}! (Offline Admin Mode)`);
      navigate('/');
    } else {
      toast.error('Offline login only available for admin emails. Please start the backend server for regular login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Offline Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Backend server is offline. Admin emails can login in offline mode.
          </p>
        </div>
        
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p className="text-sm">
            <strong>Admin Emails:</strong>
            <br />
            • ayushkumar200326@gmail.com
            <br />
            • admin@womenempowerment.com
            <br />
            • test@example.com
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleOfflineLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password (any password works in offline mode)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign in (Offline Mode)
            </button>
          </div>
        </form>

        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <p className="text-sm">
            <strong>To enable full login:</strong>
            <br />
            1. Open Command Prompt
            <br />
            2. Navigate to: <code>cd backend</code>
            <br />
            3. Run: <code>npm start</code>
            <br />
            4. Refresh this page
          </p>
        </div>
      </div>
    </div>
  );
}

export default OfflineLogin;
