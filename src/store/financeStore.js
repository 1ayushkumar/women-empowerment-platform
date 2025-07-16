import { create } from 'zustand';
import { financeAPI, formatCurrency } from '../lib/api';
import toast from 'react-hot-toast';

const useFinanceStore = create((set, get) => ({
  // State
  transactions: [],
  savingsGoals: [],
  summary: {
    balance: { income: 0, expense: 0, balance: 0 },
    monthlySummary: null,
    goalsSummary: null
  },
  isLoading: false,
  error: null,

  // ==================== TRANSACTIONS ====================

  // Fetch transactions
  fetchTransactions: async (params = {}) => {
    set({ isLoading: true, error: null });

    try {
      // Check if we're in demo mode
      const token = localStorage.getItem('token');
      if (token && (token.startsWith('demo-') || token === 'offline-demo-token' || token === 'demo-access-token')) {
        // Return demo data
        const demoTransactions = [
          {
            id: 1,
            description: 'Salary',
            amount: 50000,
            type: 'income',
            category: 'Salary',
            date: new Date().toISOString(),
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            description: 'Groceries',
            amount: -3500,
            type: 'expense',
            category: 'Food',
            date: new Date(Date.now() - 86400000).toISOString(),
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 3,
            description: 'Rent',
            amount: -15000,
            type: 'expense',
            category: 'Housing',
            date: new Date(Date.now() - 172800000).toISOString(),
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ];

        set({
          transactions: demoTransactions,
          isLoading: false
        });
        return { transactions: demoTransactions };
      }

      const response = await financeAPI.getTransactions(params);
      set({
        transactions: response.data.transactions,
        isLoading: false
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch transactions';
      set({ error: errorMessage, isLoading: false });

      // Don't show error toast for authentication errors
      if (error.response?.status !== 401) {
        toast.error(errorMessage);
      }
      throw error;
    }
  },

  // Add new transaction
  addTransaction: async (transactionData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await financeAPI.createTransaction(transactionData);
      const newTransaction = response.data.transaction;
      
      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
        isLoading: false
      }));
      
      toast.success('Transaction added successfully');
      
      // Refresh summary
      get().fetchSummary();
      
      return newTransaction;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add transaction';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Update transaction
  updateTransaction: async (id, transactionData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await financeAPI.updateTransaction(id, transactionData);
      const updatedTransaction = response.data.transaction;
      
      set((state) => ({
        transactions: state.transactions.map(t => 
          t._id === id ? updatedTransaction : t
        ),
        isLoading: false
      }));
      
      toast.success('Transaction updated successfully');
      
      // Refresh summary
      get().fetchSummary();
      
      return updatedTransaction;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update transaction';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      await financeAPI.deleteTransaction(id);
      
      set((state) => ({
        transactions: state.transactions.filter(t => t._id !== id),
        isLoading: false
      }));
      
      toast.success('Transaction deleted successfully');
      
      // Refresh summary
      get().fetchSummary();
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete transaction';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // ==================== SAVINGS GOALS ====================

  // Fetch savings goals
  fetchSavingsGoals: async () => {
    set({ isLoading: true, error: null });

    try {
      // Check if we're in demo mode
      const token = localStorage.getItem('token');
      if (token && (token.startsWith('demo-') || token === 'offline-demo-token' || token === 'demo-access-token')) {
        // Return demo savings goals
        const demoGoals = [
          {
            id: 1,
            name: 'Emergency Fund',
            targetAmount: 50000,
            currentAmount: 15000,
            deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Building an emergency fund for unexpected expenses',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: 'Vacation Fund',
            targetAmount: 50000,
            currentAmount: 10000,
            deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Saving for a dream vacation',
            createdAt: new Date().toISOString()
          }
        ];

        set({
          savingsGoals: demoGoals,
          isLoading: false
        });
        return demoGoals;
      }

      const response = await financeAPI.getGoals();
      set({
        savingsGoals: response.data.goals,
        isLoading: false
      });
      return response.data.goals;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch savings goals';
      set({ error: errorMessage, isLoading: false });

      // Don't show error toast for authentication errors
      if (error.response?.status !== 401) {
        toast.error(errorMessage);
      }
      throw error;
    }
  },

  // Add new savings goal
  addSavingsGoal: async (goalData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await financeAPI.createGoal(goalData);
      const newGoal = response.data.goal;
      
      set((state) => ({
        savingsGoals: [...state.savingsGoals, newGoal],
        isLoading: false
      }));
      
      toast.success('Savings goal created successfully');
      
      // Refresh summary
      get().fetchSummary();
      
      return newGoal;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create savings goal';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Add contribution to savings goal
  addContribution: async (goalId, contributionData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await financeAPI.addContribution(goalId, contributionData);
      const updatedGoal = response.data.goal;
      
      set((state) => ({
        savingsGoals: state.savingsGoals.map(g => 
          g._id === goalId ? updatedGoal : g
        ),
        isLoading: false
      }));
      
      toast.success(`₹${contributionData.amount} added to ${updatedGoal.name}`);
      
      // Refresh summary
      get().fetchSummary();
      
      return updatedGoal;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add contribution';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Update savings goal
  updateSavingsGoal: async (id, goalData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await financeAPI.updateGoal(id, goalData);
      const updatedGoal = response.data.goal;
      
      set((state) => ({
        savingsGoals: state.savingsGoals.map(g => 
          g._id === id ? updatedGoal : g
        ),
        isLoading: false
      }));
      
      toast.success('Savings goal updated successfully');
      
      // Refresh summary
      get().fetchSummary();
      
      return updatedGoal;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update savings goal';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Delete savings goal
  deleteSavingsGoal: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      await financeAPI.deleteGoal(id);
      
      set((state) => ({
        savingsGoals: state.savingsGoals.filter(g => g._id !== id),
        isLoading: false
      }));
      
      toast.success('Savings goal deleted successfully');
      
      // Refresh summary
      get().fetchSummary();
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete savings goal';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // ==================== SUMMARY ====================

  // Fetch financial summary
  fetchSummary: async (params = {}) => {
    try {
      // Check if we're in demo mode
      const token = localStorage.getItem('token');
      if (token && (token.startsWith('demo-') || token === 'offline-demo-token' || token === 'demo-access-token')) {
        // Return demo summary data
        const demoSummary = {
          balance: {
            income: 50000,
            expense: 18500,
            balance: 31500
          },
          monthlySummary: {
            currentMonth: {
              income: 50000,
              expense: 18500,
              balance: 31500
            },
            previousMonth: {
              income: 48000,
              expense: 20000,
              balance: 28000
            }
          },
          goalsSummary: {
            totalGoals: 2,
            totalTarget: 100000,
            totalSaved: 25000,
            completedGoals: 0
          }
        };

        set({ summary: demoSummary });
        return demoSummary;
      }

      const response = await financeAPI.getSummary(params);
      set({
        summary: response.data
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      // Don't show error toast for authentication errors
      if (error.response?.status !== 401) {
        toast.error('Failed to fetch financial summary');
      }
    }
  },

  // ==================== UTILITY FUNCTIONS ====================

  // Get total balance
  getTotalBalance: () => {
    const { summary } = get();
    return summary.balance.balance || 0;
  },

  // Get total income
  getTotalIncome: () => {
    const { summary } = get();
    return summary.balance.income || 0;
  },

  // Get total expenses
  getTotalExpenses: () => {
    const { summary } = get();
    return summary.balance.expense || 0;
  },

  // Get transactions by type
  getTransactionsByType: (type) => {
    const { transactions } = get();
    return transactions.filter(t => t.type === type);
  },

  // Get recent transactions
  getRecentTransactions: (limit = 5) => {
    const { transactions } = get();
    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Initialize finance data
  initializeFinanceData: async () => {
    try {
      // Check if user is authenticated before making API calls
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No authentication token found, skipping finance data initialization');
        return;
      }

      await Promise.all([
        get().fetchTransactions({ limit: 50 }),
        get().fetchSavingsGoals(),
        get().fetchSummary()
      ]);
    } catch (error) {
      console.error('Failed to initialize finance data:', error);
      // Don't show error toast for authentication errors
      if (error.response?.status !== 401) {
        toast.error('Failed to load finance data');
      }
    }
  }
}));

export default useFinanceStore;
