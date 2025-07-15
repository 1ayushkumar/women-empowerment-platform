import { useState  } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ChartBarIcon, BookmarkIcon, BellIcon } from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function PeriodTracker() {
  const [cycleStartDate, setCycleStartDate] = useState(new Date());
  const [cycleEndDate, setCycleEndDate] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [mood, setMood] = useState('');
  const [notifications, setNotifications] = useState(true);

  const symptomsList = [
    'Cramps', 'Headache', 'Fatigue', 'Bloating', 'Backache',
    'Tender Breasts', 'Acne', 'Mood Swings', 'Food Cravings'
  ];

  const moodOptions = [
    { label: 'Happy', emoji: '😊' },
    { label: 'Calm', emoji: '😌' },
    { label: 'Tired', emoji: '😴' },
    { label: 'Irritated', emoji: '😤' },
    { label: 'Anxious', emoji: '😰' },
    { label: 'Sad', emoji: '😢' }
  ];

  const toggleSymptom = (symptom) => {
    setSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2 text-purple-600" />
            Track Your Cycle
          </h3>
          <div className="mb-6">
            <Calendar
              onChange={setCycleStartDate}
              value={cycleStartDate}
              className="w-full rounded-lg border shadow p-4"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Cycle Start: {cycleStartDate.toLocaleDateString()}</span>
            {cycleEndDate && <span>Cycle End: {cycleEndDate.toLocaleDateString()}</span>}
          </div>
        </div>

        {/* Symptoms & Mood Tracking */}
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ChartBarIcon className="h-6 w-6 mr-2 text-purple-600" />
              Symptoms
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {symptomsList.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    symptoms.includes(symptom)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BookmarkIcon className="h-6 w-6 mr-2 text-purple-600" />
              Mood
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {moodOptions.map(({ label, emoji }) => (
                <button
                  key={label}
                  onClick={() => setMood(label)}
                  className={`p-2 rounded-lg text-center transition-colors ${
                    mood === label
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-2xl block mb-1">{emoji}</span>
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications & Insights */}
      <div className="mt-8 border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BellIcon className="h-6 w-6 mr-2 text-purple-600" />
            <span className="font-semibold">Period Notifications</span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-sm text-purple-700">
          <p className="font-semibold mb-2">Cycle Insights:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your average cycle length: 28 days</li>
            <li>Next period expected: {new Date(cycleStartDate.getTime() + (28 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</li>
            <li>Most common symptoms: {symptoms.slice(0, 3).join(', ')}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default PeriodTracker;
