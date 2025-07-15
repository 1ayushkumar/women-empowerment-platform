import { useState  } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  ChartBarIcon,
  BookmarkIcon,
  BellIcon,
  PlusIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function NutritionTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [showMealPlanner, setShowMealPlanner] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const healthyMealSuggestions = {
    Breakfast: [
      { name: 'Oatmeal with Berries', calories: 280, protein: '8g', fiber: '6g' },
      { name: 'Greek Yogurt Parfait', calories: 320, protein: '15g', fiber: '4g' },
      { name: 'Avocado Toast', calories: 350, protein: '12g', fiber: '8g' }
    ],
    Lunch: [
      { name: 'Quinoa Buddha Bowl', calories: 420, protein: '18g', fiber: '10g' },
      { name: 'Mediterranean Salad', calories: 380, protein: '15g', fiber: '7g' },
      { name: 'Lentil Soup', calories: 340, protein: '16g', fiber: '9g' }
    ],
    Dinner: [
      { name: 'Grilled Salmon', calories: 450, protein: '28g', fiber: '3g' },
      { name: 'Veggie Stir-Fry', calories: 380, protein: '14g', fiber: '8g' },
      { name: 'Chicken & Sweet Potato', calories: 420, protein: '25g', fiber: '6g' }
    ],
    Snacks: [
      { name: 'Mixed Nuts', calories: 180, protein: '6g', fiber: '3g' },
      { name: 'Apple & Almond Butter', calories: 200, protein: '5g', fiber: '4g' },
      { name: 'Hummus & Carrots', calories: 160, protein: '4g', fiber: '5g' }
    ]
  };

  const addMeal = (type, meal) => {
    setMeals([...meals, { ...meal, type, time: new Date() }]);
  };

  const incrementWater = () => {
    setWaterIntake(prev => Math.min(prev + 1, 12));
  };

  const decrementWater = () => {
    setWaterIntake(prev => Math.max(prev - 1, 0));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar and Water Tracking */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2 text-blue-600" />
            Meal Planning Calendar
          </h3>
          <div className="mb-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full rounded-lg border shadow p-4"
            />
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-2 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
              Water Intake Tracker
            </h4>
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={decrementWater}
                className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                -
              </button>
              <div className="flex-1 mx-4">
                <div className="h-4 bg-gray-200 rounded-full">
                  <div
                    className="h-4 bg-blue-600 rounded-full transition-all"
                    style={{ width: `${(waterIntake / 12) * 100}%` }}
                  />
                </div>
              </div>
              <button
                onClick={incrementWater}
                className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                +
              </button>
            </div>
            <p className="text-sm text-blue-700 text-center">
              {waterIntake} / 12 glasses
            </p>
          </div>
        </div>

        {/* Meal Tracking */}
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <BookmarkIcon className="h-6 w-6 mr-2 text-blue-600" />
                Today's Meals
              </h3>
              <button
                onClick={() => setShowMealPlanner(!showMealPlanner)}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Meal
              </button>
            </div>

            {showMealPlanner && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                {mealTypes.map(type => (
                  <div key={type} className="mb-4 last:mb-0">
                    <h4 className="font-semibold mb-2">{type}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {healthyMealSuggestions[type].map((meal, index) => (
                        <button
                          key={index}
                          onClick={() => addMeal(type, meal)}
                          className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium">{meal.name}</p>
                            <p className="text-sm text-gray-600">
                              {meal.calories} cal | Protein: {meal.protein} | Fiber: {meal.fiber}
                            </p>
                          </div>
                          <PlusIcon className="h-5 w-5 text-blue-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              {meals.map((meal, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-gray-600">
                        {meal.calories} cal | Protein: {meal.protein} | Fiber: {meal.fiber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">{meal.type}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {meal.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Insights */}
      <div className="mt-8 border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BellIcon className="h-6 w-6 mr-2 text-blue-600" />
            <span className="font-semibold">Nutrition Updates</span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="font-semibold mb-2">Daily Summary:</p>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            <li>Total Calories: {meals.reduce((sum, meal) => sum + meal.calories, 0)} cal</li>
            <li>Water Intake: {waterIntake} glasses</li>
            <li>Meals Logged: {meals.length}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default NutritionTracker;
