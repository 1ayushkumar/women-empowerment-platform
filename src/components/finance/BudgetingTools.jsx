import { useState  } from 'react';
import Card from '../shared/Card';

function BudgetingTools() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '' });

  const addExpense = () => {
    if (newExpense.name && newExpense.amount) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ name: '', amount: '' });
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const balance = income ? Number(income) - totalExpenses : 0;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Budgeting Tools</h2>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Monthly Budget Calculator</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Income
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your monthly income"
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">Add Expense</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                className="flex-1 p-2 border rounded"
                placeholder="Expense name"
              />
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-32 p-2 border rounded"
                placeholder="Amount"
              />
              <button
                onClick={addExpense}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          </div>

          {expenses.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Expenses</h4>
              <div className="space-y-2">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex justify-between text-gray-600">
                    <span>{expense.name}</span>
                    <span>${expense.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-medium">
              <span>Total Income:</span>
              <span className="text-green-600">${income || 0}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total Expenses:</span>
              <span className="text-red-600">${totalExpenses}</span>
            </div>
            <div className="flex justify-between font-medium text-lg mt-2">
              <span>Balance:</span>
              <span className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                ${balance}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BudgetingTools;
