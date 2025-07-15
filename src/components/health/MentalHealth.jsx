import { useState  } from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftIcon,
  BookOpenIcon,
  HeartIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MentalHealth() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mood, setMood] = useState('');
  const [journal, setJournal] = useState('');
  const [activities, setActivities] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const moodOptions = [
    { label: 'Very Good', emoji: '😊', color: 'bg-green-500' },
    { label: 'Good', emoji: '🙂', color: 'bg-blue-500' },
    { label: 'Neutral', emoji: '😐', color: 'bg-yellow-500' },
    { label: 'Bad', emoji: '😔', color: 'bg-orange-500' },
    { label: 'Very Bad', emoji: '😢', color: 'bg-red-500' }
  ];

  const wellnessActivities = [
    'Meditation',
    'Exercise',
    'Reading',
    'Journaling',
    'Nature Walk',
    'Deep Breathing',
    'Art/Creative Work',
    'Social Connection'
  ];

  const therapists = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Anxiety & Depression',
      availability: ['Monday', 'Wednesday', 'Friday'],
      avatar: 'SJ',
      avatarColor: 'bg-blue-500'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Stress Management',
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      avatar: 'MC',
      avatarColor: 'bg-green-500'
    },
    {
      name: 'Dr. Emily Williams',
      specialty: 'Trauma & PTSD',
      availability: ['Monday', 'Thursday', 'Friday'],
      avatar: 'EW',
      avatarColor: 'bg-purple-500'
    }
  ];

  const toggleActivity = (activity) => {
    setActivities(prev => 
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mood and Activity Tracking */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <ChartBarIcon className="h-6 w-6 mr-2 text-purple-600" />
            Daily Mood & Activities
          </h3>
          <div className="mb-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full rounded-lg border shadow p-4"
            />
          </div>
          <div className="mb-6">
            <p className="text-gray-600 mb-2">How are you feeling today?</p>
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map(({ label, emoji, color }) => (
                <button
                  key={label}
                  onClick={() => setMood(label)}
                  className={`p-2 rounded-lg text-center transition-colors ${
                    mood === label
                      ? color + ' text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-2xl block mb-1">{emoji}</span>
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Activities Completed Today:</p>
            <div className="grid grid-cols-2 gap-2">
              {wellnessActivities.map(activity => (
                <button
                  key={activity}
                  onClick={() => toggleActivity(activity)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    activities.includes(activity)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Journal and Therapy */}
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpenIcon className="h-6 w-6 mr-2 text-purple-600" />
              Daily Journal
            </h3>
            <textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="Write your thoughts here..."
              className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ChatBubbleLeftIcon className="h-6 w-6 mr-2 text-purple-600" />
              Book a Session
            </h3>
            <button
              onClick={() => setShowBooking(!showBooking)}
              className="w-full mb-4 bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition-colors"
            >
              {showBooking ? 'Hide Therapists' : 'Find a Therapist'}
            </button>
            {showBooking && (
              <div className="space-y-4">
                {therapists.map((therapist, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center">
                    <div className={`w-16 h-16 rounded-full ${therapist.avatarColor} flex items-center justify-center text-white font-semibold text-lg mr-4 flex-shrink-0 border-2 border-white shadow-md`}>
                      {therapist.avatar ? (
                        <span className="select-none">{therapist.avatar}</span>
                      ) : (
                        <UserCircleIcon className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{therapist.name}</h4>
                      <p className="text-sm text-gray-600">{therapist.specialty}</p>
                      <p className="text-sm text-purple-600">
                        Available: {therapist.availability.join(', ')}
                      </p>
                      <button className="mt-2 px-4 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                        Book Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insights and Notifications */}
      <div className="mt-8 border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BellIcon className="h-6 w-6 mr-2 text-purple-600" />
            <span className="font-semibold">Mental Health Updates</span>
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
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="font-semibold mb-2">Your Wellness Insights:</p>
          <ul className="list-disc list-inside space-y-1 text-purple-700">
            <li>Most common mood: {mood || 'Not enough data'}</li>
            <li>Top activities: {activities.slice(0, 2).join(', ') || 'No activities logged'}</li>
            <li>Journal entries this week: {journal ? '1' : '0'}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default MentalHealth;