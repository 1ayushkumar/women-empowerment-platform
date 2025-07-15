import { useState  } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, HeartIcon, ClipboardIcon, BellIcon } from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function PregnancyTracker() {
  const [dueDate, setDueDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState(true);

  const pregnancySymptoms = [
    'Morning Sickness', 'Fatigue', 'Food Aversions', 'Cravings',
    'Back Pain', 'Swelling', 'Heartburn', 'Mood Changes'
  ];

  const calculateWeeks = () => {
    const today = new Date();
    const conceptionDate = new Date(dueDate);
    conceptionDate.setDate(conceptionDate.getDate() - 280); // 40 weeks backwards
    const diffTime = Math.abs(today - conceptionDate);
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };

  const toggleSymptom = (symptom) => {
    setSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addAppointment = () => {
    // This would open a modal or form to add appointment details
    const newAppointment = {
      date: new Date(),
      title: 'Regular Checkup',
      doctor: 'Dr. Smith',
      notes: 'Regular prenatal checkup'
    };
    setAppointments([...appointments, newAppointment]);
  };

  const weeklyTips = {
    first: [
      'Take prenatal vitamins',
      'Schedule your first prenatal visit',
      'Avoid harmful substances'
    ],
    second: [
      'Stay hydrated',
      'Eat balanced meals',
      'Get regular exercise'
    ],
    third: [
      'Prepare for labor',
      'Pack hospital bag',
      'Attend childbirth classes'
    ]
  };

  const currentWeek = calculateWeeks();
  const trimester = currentWeek <= 13 ? 'first' : currentWeek <= 26 ? 'second' : 'third';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar and Due Date Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2 text-pink-600" />
            Pregnancy Timeline
          </h3>
          <div className="mb-6">
            <Calendar
              onChange={setDueDate}
              value={dueDate}
              className="w-full rounded-lg border shadow p-4"
            />
          </div>
          <div className="bg-pink-50 rounded-lg p-4">
            <p className="text-pink-700 font-semibold">Due Date: {dueDate.toLocaleDateString()}</p>
            <p className="text-pink-700">Week {currentWeek} of Pregnancy</p>
          </div>
        </div>

        {/* Symptoms & Tracking */}
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <HeartIcon className="h-6 w-6 mr-2 text-pink-600" />
              Symptoms Tracker
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {pregnancySymptoms.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    symptoms.includes(symptom)
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Appointments */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ClipboardIcon className="h-6 w-6 mr-2 text-pink-600" />
              Appointments
            </h3>
            <button
              onClick={addAppointment}
              className="w-full mb-4 bg-pink-100 text-pink-700 py-2 rounded-lg hover:bg-pink-200 transition-colors"
            >
              + Add Appointment
            </button>
            <div className="space-y-2">
              {appointments.map((apt, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold">{apt.title}</p>
                  <p className="text-sm text-gray-600">{apt.date.toLocaleDateString()} - {apt.doctor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Tips & Notifications */}
      <div className="mt-8 border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BellIcon className="h-6 w-6 mr-2 text-pink-600" />
            <span className="font-semibold">Pregnancy Updates</span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-pink-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="bg-pink-50 rounded-lg p-4">
          <p className="font-semibold mb-2">Weekly Tips ({trimester} trimester):</p>
          <ul className="list-disc list-inside space-y-1 text-pink-700">
            {weeklyTips[trimester].map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default PregnancyTracker;
