import { useState  } from 'react';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import PeriodTracker from './PeriodTracker';
import PregnancyTracker from './PregnancyTracker';
import MentalHealth from './MentalHealth';
import NutritionTracker from './NutritionTracker';
import FitnessTracker from './FitnessTracker';

function Health() {
  const [selectedCategory, setSelectedCategory] = useState('physical');
  const [activeFeature, setActiveFeature] = useState(null);

  const healthCategories = {
    physical: {
      title: 'Physical Health',
      icon: HeartIcon,
      features: [
        {
          title: 'Period Tracking',
          description: 'Track your menstrual cycle, symptoms, and get predictions.',
          component: PeriodTracker
        },
        {
          title: 'Pregnancy Care',
          description: 'Comprehensive pregnancy guidance and tracking.',
          component: PregnancyTracker
        },
        {
          title: 'Fitness Programs',
          description: 'Personalized workout plans for women.',
          component: FitnessTracker
        }
      ]
    },
    mental: {
      title: 'Mental Health',
      icon: SparklesIcon,
      features: [
        {
          title: 'Stress Management',
          description: 'Tools and techniques for managing stress.',
          component: MentalHealth
        },
        {
          title: 'Therapy Connect',
          description: 'Connect with mental health professionals.',
          component: MentalHealth
        },
        {
          title: 'Mood Tracking',
          description: 'Track your mood patterns and get insights.',
          component: MentalHealth
        }
      ]
    },
    nutrition: {
      title: 'Nutrition & Wellness',
      icon: UserGroupIcon,
      features: [
        {
          title: 'Meal Planning',
          description: 'Personalized meal plans and nutrition advice.',
          component: NutritionTracker
        },
        {
          title: 'Health Tracking',
          description: 'Track your health metrics and habits.',
          component: NutritionTracker
        },
        {
          title: 'Supplement Guide',
          description: 'Essential supplements for women\'s health.',
          component: NutritionTracker
        }
      ]
    }
  };

  const selectedCategoryData = healthCategories[selectedCategory];

  const handleFeatureClick = (feature) => {
    if (feature.component) {
      setActiveFeature(feature);
    }
  };

  if (activeFeature) {
    const FeatureComponent = activeFeature.component;
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => setActiveFeature(null)}
          className="mb-6 flex items-center text-purple-600 hover:text-purple-700"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Health Dashboard
        </button>
        <h2 className="text-2xl font-bold mb-6">{activeFeature.title}</h2>
        <FeatureComponent />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
        Health & Wellness
      </h1>

      <div className="flex justify-center space-x-4 mb-8">
        {Object.entries(healthCategories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedCategory === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{category.title}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {selectedCategoryData.features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => handleFeatureClick(feature)}
          >
            <h3 className="text-xl font-semibold mb-2 text-purple-700">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Health;