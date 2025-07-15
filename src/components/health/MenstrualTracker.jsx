import { useState  } from 'react';
import { format, addDays } from 'date-fns';
import Card from '../shared/Card';

export default function MenstrualTracker() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);

  const calculateNextPeriod = () => {
    if (!lastPeriod) return null;
    const nextDate = addDays(new Date(lastPeriod), cycleLength);
    return format(nextDate, 'MMM dd, yyyy');
  };

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-6">Menstrual Cycle Tracker</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Period Start Date
          </label>
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cycle Length (days)
          </label>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
            min="21"
            max="35"
            className="w-full p-2 border rounded"
          />
        </div>

        {lastPeriod && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-medium text-purple-800">Next Period Prediction</h3>
            <p className="text-purple-600 mt-2">{calculateNextPeriod()}</p>
          </div>
        )}
      </div>
    </Card>
  );
}