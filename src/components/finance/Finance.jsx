import { useState, useEffect } from 'react';
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  PlusIcon,
  MinusIcon,
  EyeIcon,
  EyeSlashIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  HomeIcon,
  AcademicCapIcon,
  HeartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import useFinanceStore from '../../store/financeStore';
import useAuthStore from '../../store/authStore';
import { formatCurrency, formatDate } from '../../lib/api';

function Finance() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);

  // Auth state
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Finance store
  const {
    transactions,
    savingsGoals,
    summary,
    isLoading,
    error,
    fetchTransactions,
    fetchSavingsGoals,
    fetchSummary,
    addTransaction,
    addSavingsGoal,
    addContribution,
    initializeFinanceData,
    getTotalBalance,
    getTotalIncome,
    getTotalExpenses,
    getRecentTransactions
  } = useFinanceStore();

  // Initialize data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      initializeFinanceData();
    }
  }, [isAuthenticated, initializeFinanceData]);

  // Form states for adding transactions and goals
  const [transactionForm, setTransactionForm] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [goalForm, setGoalForm] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: 'other',
    description: ''
  });

  // Helper functions
  const getIconForCategory = (category) => {
    if (!category) return CurrencyDollarIcon;

    const iconMap = {
      'Groceries': ShoppingCartIcon,
      'Rent': HomeIcon,
      'Transportation': CreditCardIcon,
      'Education': AcademicCapIcon,
      'Healthcare': HeartIcon,
      'Entertainment': CalendarIcon,
      'Utilities': BanknotesIcon,
      'Salary': BanknotesIcon,
      'Freelance': BanknotesIcon,
      'Investment': ChartBarIcon
    };
    return iconMap[category] || CurrencyDollarIcon;
  };

  // Categories for transactions
  const expenseCategories = [
    { name: 'Groceries', icon: ShoppingCartIcon },
    { name: 'Rent', icon: HomeIcon },
    { name: 'Transportation', icon: CreditCardIcon },
    { name: 'Education', icon: AcademicCapIcon },
    { name: 'Healthcare', icon: HeartIcon },
    { name: 'Entertainment', icon: CalendarIcon },
    { name: 'Utilities', icon: BanknotesIcon },
    { name: 'Other', icon: CurrencyDollarIcon }
  ];

  const incomeCategories = [
    { name: 'Salary', icon: BanknotesIcon },
    { name: 'Freelance', icon: BanknotesIcon },
    { name: 'Investment', icon: ChartBarIcon },
    { name: 'Business', icon: CurrencyDollarIcon },
    { name: 'Other', icon: CurrencyDollarIcon }
  ];

  // Form handlers
  const handleAddTransaction = async (e) => {
    e.preventDefault();

    if (!transactionForm.category || !transactionForm.amount) {
      return;
    }

    try {
      await addTransaction({
        type: transactionForm.type,
        category: transactionForm.category,
        amount: parseFloat(transactionForm.amount),
        description: transactionForm.description,
        date: transactionForm.date
      });

      // Reset form
      setTransactionForm({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });

      setShowAddTransaction(false);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();

    if (!goalForm.name || !goalForm.targetAmount || !goalForm.deadline) {
      return;
    }

    try {
      await addSavingsGoal({
        name: goalForm.name,
        targetAmount: parseFloat(goalForm.targetAmount),
        deadline: goalForm.deadline,
        category: goalForm.category,
        description: goalForm.description
      });

      // Reset form
      setGoalForm({
        name: '',
        targetAmount: '',
        deadline: '',
        category: 'other',
        description: ''
      });

      setShowAddGoal(false);
    } catch (error) {
      console.error('Failed to add goal:', error);
    }
  };

  const handleContribution = async (goalId, amount) => {
    try {
      await addContribution(goalId, { amount: parseFloat(amount) });
    } catch (error) {
      console.error('Failed to add contribution:', error);
    }
  };

  // Calculate financial metrics from real data
  const calculateMetrics = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth &&
             transactionDate.getFullYear() === currentYear;
    });

    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlySavings = monthlyIncome - monthlyExpenses;

    // Category breakdown
    const expensesByCategory = {};
    monthlyTransactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
      });

    return {
      monthlyIncome,
      monthlyExpenses,
      monthlySavings,
      expensesByCategory
    };
  };

  const metrics = calculateMetrics();

  // Show loading state if data is being fetched
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to access your finance dashboard.</p>
        </div>
      </div>
    );
  }

  // Get current balance from store
  const currentBalance = getTotalBalance();
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const recentTransactions = getRecentTransactions(5);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'transactions', name: 'Transactions', icon: CurrencyDollarIcon },
    { id: 'budget', name: 'Budget', icon: ArchiveBoxIcon },
    { id: 'goals', name: 'Savings Goals', icon: ArrowUpIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                <span className="hidden sm:inline">💰 Personal Finance Tracker</span>
                <span className="sm:hidden">💰 Finance Tracker</span>
              </h1>
              <p className="text-purple-100 text-sm sm:text-base">Take control of your financial future</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end space-x-2 mb-2">
                <span className="text-purple-200 text-sm sm:text-base">Total Balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeSlashIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              <div className="text-xl sm:text-3xl font-bold">
                {showBalance ? formatCurrency(currentBalance) : '••••••'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{(metrics.monthlyIncome || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <ArrowUpIcon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                      ₹{(metrics.monthlyExpenses || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <ArrowDownIcon className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Savings</p>
                    <p className={`text-2xl font-bold ${(metrics.monthlySavings || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{(metrics.monthlySavings || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${metrics.monthlySavings >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <ArchiveBoxIcon className={`w-6 h-6 ${metrics.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Savings Rate</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {metrics.monthlyIncome > 0 ? ((metrics.monthlySavings / metrics.monthlyIncome) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <ChartBarIcon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions & Savings Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Recent Transactions */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                      <p className="text-gray-500 mt-2">Loading transactions...</p>
                    </div>
                  ) : recentTransactions.length > 0 ? (
                    recentTransactions.map((transaction) => {
                      const TransactionIcon = getIconForCategory(transaction.category);
                      if (!TransactionIcon) return null;

                      return (
                        <div key={transaction._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                              <TransactionIcon className={`w-4 h-4 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.category}</p>
                              <p className="text-sm text-gray-500">{transaction.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </p>
                            <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <CurrencyDollarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No transactions yet</p>
                      <button
                        onClick={() => setShowAddTransaction(true)}
                        className="mt-2 text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Add your first transaction
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Savings Goals */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Savings Goals</h3>
                  <button
                    onClick={() => setActiveTab('goals')}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {savingsGoals.slice(0, 3).map((goal) => {
                    const progress = ((goal.current || 0) / (goal.target || 1)) * 100;
                    return (
                      <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{goal.name}</h4>
                          <span className="text-sm text-gray-500">
                            ₹{(goal.current || 0).toLocaleString('en-IN')} / ₹{(goal.target || 0).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`bg-gradient-to-r ${goal.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{progress.toFixed(1)}% complete</span>
                          <span className="text-gray-500">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Add Transaction Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Transactions</h2>
              <button
                onClick={() => setShowAddTransaction(true)}
                className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add Transaction</span>
              </button>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">All Transactions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {transactions.map((transaction) => {
                  const TransactionIcon = getIconForCategory(transaction.category);
                  if (!TransactionIcon) return null;

                  return (
                    <div key={transaction._id || transaction.id} className="px-3 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className={`p-2 sm:p-3 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <TransactionIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{transaction.category}</h4>
                            <p className="text-xs sm:text-sm text-gray-500">{transaction.description}</p>
                            <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right">
                          <p className={`text-base sm:text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}₹{(transaction.amount || 0).toLocaleString('en-IN')}
                          </p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Budget Overview</h2>

            {/* Budget Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(metrics.expensesByCategory).map(([category, amount]) => {
                const budget = 25000; // Default budget per category in INR
                const percentage = (amount / budget) * 100;

                return (
                  <div key={category} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{category}</h3>
                      <span className="text-sm text-gray-500">
                        ₹{(amount || 0).toLocaleString('en-IN')} / ₹{(budget || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${
                        percentage > 100 ? 'text-red-600' : percentage > 80 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {percentage.toFixed(1)}% used
                      </span>
                      <span className="text-gray-500">
                        ₹{((budget || 0) - (amount || 0)).toLocaleString('en-IN')} left
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            {/* Add Goal Button */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Savings Goals</h2>
              <button
                onClick={() => setShowAddGoal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Goal</span>
              </button>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savingsGoals.map((goal) => {
                const progress = ((goal.current || 0) / (goal.target || 1)) * 100;
                const remaining = (goal.target || 0) - (goal.current || 0);

                return (
                  <div key={goal.id} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.name}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div
                          className={`bg-gradient-to-r ${goal.color} h-3 rounded-full transition-all duration-300`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-semibold">₹{(goal.current || 0).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-semibold">₹{(goal.target || 0).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Remaining:</span>
                        <span className="font-semibold text-purple-600">₹{(remaining || 0).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deadline:</span>
                        <span className="font-semibold">{new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition-colors font-medium">
                        Add Money
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Financial Analytics</h2>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart - Spending by Category */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending Distribution</h3>
                <div className="flex items-center justify-center">
                  {metrics.monthlyExpenses > 0 ? (
                    <div className="relative">
                      <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                        {(() => {
                          const categories = Object.entries(metrics.expensesByCategory);
                          const total = metrics.monthlyExpenses;
                          let currentAngle = 0;
                          const colors = [
                            '#8B5CF6', '#EC4899', '#10B981', '#F59E0B',
                            '#EF4444', '#3B82F6', '#6366F1', '#84CC16'
                          ];

                          return categories.map(([category, amount], index) => {
                            const percentage = (amount / total) * 100;
                            const angle = (amount / total) * 360;
                            const startAngle = currentAngle;
                            const endAngle = currentAngle + angle;

                            const startAngleRad = (startAngle * Math.PI) / 180;
                            const endAngleRad = (endAngle * Math.PI) / 180;

                            const largeArcFlag = angle > 180 ? 1 : 0;

                            const x1 = 100 + 80 * Math.cos(startAngleRad);
                            const y1 = 100 + 80 * Math.sin(startAngleRad);
                            const x2 = 100 + 80 * Math.cos(endAngleRad);
                            const y2 = 100 + 80 * Math.sin(endAngleRad);

                            const pathData = [
                              `M 100 100`,
                              `L ${x1} ${y1}`,
                              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                              'Z'
                            ].join(' ');

                            currentAngle += angle;

                            return (
                              <path
                                key={category}
                                d={pathData}
                                fill={colors[index % colors.length]}
                                stroke="white"
                                strokeWidth="2"
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                              />
                            );
                          });
                        })()}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">Total</div>
                          <div className="text-sm text-gray-600">₹{(metrics.monthlyExpenses || 0).toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <p>No expense data available</p>
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {Object.entries(metrics.expensesByCategory).map(([category, amount], index) => {
                    const colors = [
                      '#8B5CF6', '#EC4899', '#10B981', '#F59E0B',
                      '#EF4444', '#3B82F6', '#6366F1', '#84CC16'
                    ];
                    const percentage = (amount / metrics.monthlyExpenses) * 100;

                    return (
                      <div key={category} className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors[index % colors.length] }}
                        ></div>
                        <span className="text-xs text-gray-700 truncate">
                          {category} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bar Chart - Income vs Expenses */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Income vs Expenses</h3>
                <div className="space-y-4">
                  {/* Income Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Monthly Income</span>
                      <span className="text-sm font-semibold text-green-600">
                        ₹{(metrics.monthlyIncome || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, ((metrics.monthlyIncome || 0) / Math.max((metrics.monthlyIncome || 0), (metrics.monthlyExpenses || 0), 1)) * 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Expenses Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Monthly Expenses</span>
                      <span className="text-sm font-semibold text-red-600">
                        ₹{(metrics.monthlyExpenses || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-red-500 h-4 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, ((metrics.monthlyExpenses || 0) / Math.max((metrics.monthlyIncome || 0), (metrics.monthlyExpenses || 0), 1)) * 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Savings Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Monthly Savings</span>
                      <span className={`text-sm font-semibold ${(metrics.monthlySavings || 0) >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                        ₹{(metrics.monthlySavings || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${
                          (metrics.monthlySavings || 0) >= 0 ? 'bg-purple-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min(100, Math.abs(metrics.monthlySavings || 0) / Math.max((metrics.monthlyIncome || 0), (metrics.monthlyExpenses || 0), 1) * 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Financial Health Score */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Score</h3>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#8B5CF6"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - (metrics.monthlyIncome > 0 ? Math.min(100, Math.round((metrics.monthlySavings / metrics.monthlyIncome) * 100 + 50)) : 50) / 100)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-purple-600">
                        {metrics.monthlyIncome > 0 ? Math.min(100, Math.round((metrics.monthlySavings / metrics.monthlyIncome) * 100 + 50)) : 50}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">Out of 100</p>
                  <div className="space-y-2 text-sm text-left">
                    <div className="flex justify-between">
                      <span>Savings Rate:</span>
                      <span className="font-semibold">
                        {metrics.monthlyIncome > 0 ? ((metrics.monthlySavings / metrics.monthlyIncome) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency Fund:</span>
                      <span className="font-semibold">
                        {savingsGoals.find(g => g.name === 'Emergency Fund')?.current || 0 > 150000 ? 'Good' : 'Needs Work'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Debt-to-Income:</span>
                      <span className="font-semibold">Low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Goals Progress */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Goals Progress</h3>
                <div className="space-y-4">
                  {savingsGoals.slice(0, 3).map((goal) => {
                    const progress = (goal.current / goal.target) * 100;
                    return (
                      <div key={goal.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{goal.name}</span>
                          <span className="text-xs text-gray-500">{progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${goal.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Trend */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Income Growth</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">+12.5%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">Expense Control</span>
                    </div>
                    <span className="text-sm font-semibold text-red-600">-3.2%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">Savings Rate</span>
                    </div>
                    <span className="text-sm font-semibold text-purple-600">
                      {metrics.monthlyIncome > 0 ? ((metrics.monthlySavings / metrics.monthlyIncome) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Add Transaction</h3>
              <button
                onClick={() => setShowAddTransaction(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setTransactionForm({...transactionForm, type: 'income'})}
                    className={`flex-1 py-2 px-4 rounded-lg border ${
                      transactionForm.type === 'income'
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-gray-50 border-gray-300 text-gray-700'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransactionForm({...transactionForm, type: 'expense'})}
                    className={`flex-1 py-2 px-4 rounded-lg border ${
                      transactionForm.type === 'expense'
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-gray-50 border-gray-300 text-gray-700'
                    }`}
                  >
                    Expense
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={transactionForm.category}
                  onChange={(e) => setTransactionForm({...transactionForm, category: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select Category</option>
                  {(transactionForm.type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={transactionForm.amount}
                  onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={transactionForm.description}
                  onChange={(e) => setTransactionForm({...transactionForm, description: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Transaction description"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={transactionForm.date}
                  onChange={(e) => setTransactionForm({...transactionForm, date: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTransaction(false)}
                  className="w-full sm:flex-1 py-2.5 sm:py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-2.5 sm:py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Savings Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Savings Goal</h3>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="space-y-4">
              {/* Goal Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                <input
                  type="text"
                  value={goalForm.name}
                  onChange={(e) => setGoalForm({...goalForm, name: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., Emergency Fund, Vacation"
                />
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={goalForm.targetAmount}
                  onChange={(e) => setGoalForm({...goalForm, targetAmount: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={goalForm.deadline}
                  onChange={(e) => setGoalForm({...goalForm, deadline: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Finance;