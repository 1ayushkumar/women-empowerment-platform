import { useState  } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  ChartBarIcon,
  FireIcon,
  BellIcon,
  ClockIcon,
  HeartIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function FitnessTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [currentGoal, setCurrentGoal] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);

  const workoutCategories = {
    'Cardio': [
      {
        name: 'Morning Jog',
        duration: '30 mins',
        calories: 300,
        intensity: 'Moderate',
        description: 'Steady-pace jogging to boost cardiovascular health'
      },
      {
        name: 'HIIT Training',
        duration: '20 mins',
        calories: 250,
        intensity: 'High',
        description: 'High-intensity interval training for maximum calorie burn'
      },
      {
        name: 'Cycling',
        duration: '45 mins',
        calories: 400,
        intensity: 'Moderate',
        description: 'Indoor or outdoor cycling for endurance'
      }
    ],
    'Strength': [
      {
        name: 'Full Body Workout',
        duration: '45 mins',
        calories: 350,
        intensity: 'High',
        description: 'Complete body strength training with weights'
      },
      {
        name: 'Core Strength',
        duration: '25 mins',
        calories: 200,
        intensity: 'Moderate',
        description: 'Focus on abdominal and core muscles'
      },
      {
        name: 'Upper Body',
        duration: '40 mins',
        calories: 300,
        intensity: 'High',
        description: 'Arms, chest, and back workout'
      }
    ],
    'Flexibility': [
      {
        name: 'Yoga Flow',
        duration: '40 mins',
        calories: 150,
        intensity: 'Low',
        description: 'Gentle yoga for flexibility and mindfulness'
      },
      {
        name: 'Stretching',
        duration: '20 mins',
        calories: 100,
        intensity: 'Low',
        description: 'Full body stretching routine'
      },
      {
        name: 'Pilates',
        duration: '35 mins',
        calories: 200,
        intensity: 'Moderate',
        description: 'Core-focused pilates workout'
      }
    ]
  };

  const fitnessGoals = [
    'Weight Loss',
    'Muscle Gain',
    'Improved Flexibility',
    'Better Endurance',
    'Stress Relief',
    'Overall Health'
  ];

  const addWorkout = (workout) => {
    setWorkouts([...workouts, { ...workout, time: new Date() }]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar and Goals */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2 text-green-600" />
            Workout Calendar
          </h3>
          <div className="mb-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full rounded-lg border shadow p-4"
            />
          </div>

          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-4 flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 mr-2 text-green-600" />
              Fitness Goals
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {fitnessGoals.map(goal => (
                <button
                  key={goal}
                  onClick={() => setCurrentGoal(goal)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    currentGoal === goal
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Workout Tracking */}
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <FireIcon className="h-6 w-6 mr-2 text-green-600" />
                Workouts
              </h3>
              <button
                onClick={() => setShowWorkoutPlan(!showWorkoutPlan)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                {showWorkoutPlan ? 'Hide Workouts' : 'Start Workout'}
              </button>
            </div>

            {showWorkoutPlan && (
              <div className="space-y-4">
                {Object.entries(workoutCategories).map(([category, exercises]) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">{category}</h4>
                    <div className="space-y-2">
                      {exercises.map((workout, index) => (
                        <button
                          key={index}
                          onClick={() => addWorkout(workout)}
                          className="w-full text-left p-3 bg-white rounded-lg hover:bg-green-50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{workout.name}</p>
                              <p className="text-sm text-gray-600">{workout.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-green-600">{workout.duration}</p>
                              <p className="text-xs text-gray-500">{workout.calories} cal</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-3">
              {workouts.map((workout, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{workout.name}</p>
                      <p className="text-sm text-gray-600">{workout.description}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {workout.duration}
                        <FireIcon className="h-4 w-4 ml-3 mr-1" />
                        {workout.calories} cal
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{workout.intensity}</p>
                      <p className="text-xs text-gray-500">
                        {workout.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Insights */}
      <div className="mt-8 border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BellIcon className="h-6 w-6 mr-2 text-green-600" />
            <span className="font-semibold">Fitness Updates</span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-green-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="font-semibold mb-2">Today's Summary:</p>
          <ul className="list-disc list-inside space-y-1 text-green-700">
            <li>Workouts Completed: {workouts.length}</li>
            <li>Total Calories Burned: {workouts.reduce((sum, workout) => sum + workout.calories, 0)}</li>
            <li>Current Goal: {currentGoal || 'Not set'}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default FitnessTracker;
