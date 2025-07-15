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
        localStorage.setItem('token', token);

        set({
          user: userData,
          token,
          isAuthenticated: true,
          membershipPlan: userData.membershipPlan || 'free',
          error: null
        });
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
            // Check if token is expired
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