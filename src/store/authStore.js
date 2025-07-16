import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      membershipPlan: 'free',

      // Actions
      login: async (userData, token) => {
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token || 'offline-token');

        set({
          user: userData,
          token: token || 'offline-token',
          isAuthenticated: true,
          membershipPlan: userData.membershipPlan || 'free',
          error: null
        });
      },

      // Offline login for demo purposes
      offlineLogin: (email, password) => {
        const demoUser = {
          id: 1,
          name: 'Demo User',
          email: email,
          membershipPlan: 'premium'
        };

        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('token', 'offline-demo-token');

        set({
          user: demoUser,
          token: 'offline-demo-token',
          isAuthenticated: true,
          membershipPlan: 'premium',
          error: null
        });

        return Promise.resolve({ user: demoUser, token: 'offline-demo-token' });
      },

      // Offline register for demo purposes
      offlineRegister: (userData) => {
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          membershipPlan: 'free'
        };

        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', 'offline-demo-token');

        set({
          user: newUser,
          token: 'offline-demo-token',
          isAuthenticated: true,
          membershipPlan: 'free',
          error: null
        });

        return Promise.resolve({ user: newUser, token: 'offline-demo-token' });
      },

      logout: async () => {
        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          membershipPlan: 'free',
          error: null
        });
      },

      updateUser: (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        set({
          user: userData,
          membershipPlan: userData.membershipPlan || 'free'
        });
      },

      updateUserPlan: (plan) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, membershipPlan: plan };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          set({
            user: updatedUser,
            membershipPlan: plan
          });
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
          try {
            // Handle demo tokens (simple strings) vs JWT tokens
            if (token.startsWith('demo-') || token === 'offline-demo-token' || token === 'demo-access-token') {
              // Demo token - always valid
              const parsedUser = JSON.parse(user);
              set({
                user: parsedUser,
                token,
                isAuthenticated: true,
                membershipPlan: parsedUser.membershipPlan || 'free',
                error: null
              });
              return;
            }

            // Check if JWT token is expired
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;

            if (tokenPayload.exp < currentTime) {
              // Token is expired, clear storage
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                membershipPlan: 'free'
              });
              return;
            }

            const parsedUser = JSON.parse(user);
            set({
              user: parsedUser,
              token,
              isAuthenticated: true,
              membershipPlan: parsedUser.membershipPlan || 'free'
            });
          } catch (error) {
            console.error('Error parsing stored user data:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              membershipPlan: 'free'
            });
          }
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        membershipPlan: state.membershipPlan
      })
    }
  )
);

export default useAuthStore;