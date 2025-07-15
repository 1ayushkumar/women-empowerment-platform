import { useState  } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  UserGroupIcon,
  GiftIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Courses from './Courses';
import Mentorship from './Mentorship';
import Scholarships from './Scholarships';
import DiscussionForum from './DiscussionForum';

function Education() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showStats, setShowStats] = useState(false);

  const tabs = [
    {
      name: 'Courses',
      icon: BookOpenIcon,
      path: '/education',
      component: Courses,
      stats: { total: 50, enrolled: 1200, completed: 800 }
    },
    {
      name: 'Mentorship',
      icon: UserGroupIcon,
      path: '/education/mentorship',
      component: Mentorship,
      stats: { mentors: 25, sessions: 450, success: '92%' }
    },
    {
      name: 'Scholarships',
      icon: GiftIcon,
      path: '/education/scholarships',
      component: Scholarships,
      stats: { available: 15, awarded: 120, total: '$250K' }
    },
    {
      name: 'Discussion Forum',
      icon: ChatBubbleLeftRightIcon,
      path: '/education/forum',
      component: DiscussionForum,
      stats: { topics: 320, posts: 1500, users: 2800 }
    }
  ];

  const getCurrentTab = () => {
    return tabs.find(tab => tab.path === location.pathname) || tabs[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <AcademicCapIcon className="h-10 w-10 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Education Hub</h1>
            <p className="text-gray-600">Empowering through knowledge and skills</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>
      </div>

      {showStats && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          {Object.entries(getCurrentTab().stats).map(([key, value]) => (
            <div key={key} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 uppercase">{key}</h3>
              <p className="mt-1 text-2xl font-semibold text-purple-600">{value}</p>
            </div>
          ))}
        </motion.div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              return (
                <button
                  key={tab.name}
                  onClick={() => navigate(tab.path)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      isActive
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon
                    className={`
                      -ml-0.5 mr-2 h-5 w-5
                      ${isActive ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                  />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <Routes>
            <Route index element={<Courses searchQuery={searchQuery} />} />
            <Route path="mentorship" element={<Mentorship />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="forum" element={<DiscussionForum />} />
          </Routes>
        </div>
      </div>
    </motion.div>
  );
}

export default Education;