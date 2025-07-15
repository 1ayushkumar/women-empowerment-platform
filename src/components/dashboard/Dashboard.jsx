import { useState  } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { 
  CalendarIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  BriefcaseIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const schedules = [
    { id: 1, title: 'Mentorship Session', time: '2:00 PM', date: '2024-12-16', mentor: 'Sarah Johnson' },
    { id: 2, title: 'Career Workshop', time: '10:00 AM', date: '2024-12-17', speaker: 'Michael Chen' },
    { id: 3, title: 'Entrepreneurship Seminar', time: '3:30 PM', date: '2024-12-18', host: 'Emma Williams' }
  ];

  const resources = [
    { id: 1, title: 'Business Plan Template', type: 'PDF', progress: 0 },
    { id: 2, title: 'Financial Modeling Course', type: 'Course', progress: 60 },
    { id: 3, title: 'Leadership Skills Workshop', type: 'Video', progress: 30 },
    { id: 4, title: 'Market Research Guide', type: 'PDF', progress: 85 }
  ];

  const stats = [
    { label: 'Courses Completed', value: 12 },
    { label: 'Mentorship Hours', value: 24 },
    { label: 'Resources Accessed', value: 45 },
    { label: 'Network Connections', value: 128 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 mb-8 text-white"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome back, {user?.name || 'User'}! 👋</h1>
        <p className="text-xl opacity-90">Here's what's happening in your journey.</p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
            >
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Schedule Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Upcoming Schedule</h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <motion.div
                  key={schedule.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => setSelectedSchedule(schedule)}
                >
                  <CalendarIcon className="w-10 h-10 text-purple-600 mr-4" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{schedule.title}</h3>
                    <p className="text-sm text-gray-600">
                      {schedule.date} at {schedule.time}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200">
                    Join
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resources Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Learning Progress</h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View All Resources
              </button>
            </div>
            <div className="space-y-6">
              {resources.map((resource) => (
                <div key={resource.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {resource.type === 'PDF' ? (
                        <DocumentTextIcon className="w-5 h-5 text-red-500 mr-2" />
                      ) : resource.type === 'Course' ? (
                        <BookOpenIcon className="w-5 h-5 text-blue-500 mr-2" />
                      ) : (
                        <ChartBarIcon className="w-5 h-5 text-green-500 mr-2" />
                      )}
                      <span className="font-medium">{resource.title}</span>
                    </div>
                    <span className="text-sm text-gray-600">{resource.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${resource.progress}%` }}
                      transition={{ duration: 1 }}
                      className="bg-purple-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/mentorship">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 text-center rounded-xl bg-purple-50 hover:bg-purple-100"
                >
                  <UserGroupIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Find Mentor</span>
                </motion.div>
              </Link>
              <Link to="/employment">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 text-center rounded-xl bg-pink-50 hover:bg-pink-100"
                >
                  <BriefcaseIcon className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Job Board</span>
                </motion.div>
              </Link>
              <Link to="/education">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 text-center rounded-xl bg-blue-50 hover:bg-blue-100"
                >
                  <BookOpenIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Courses</span>
                </motion.div>
              </Link>
              <Link to="/resources">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 text-center rounded-xl bg-green-50 hover:bg-green-100"
                >
                  <DocumentTextIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Resources</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Schedule Details Modal */}
          {selectedSchedule && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedSchedule.title}</h3>
                <button
                  onClick={() => setSelectedSchedule(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>{selectedSchedule.date} at {selectedSchedule.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  <span>
                    {selectedSchedule.mentor || selectedSchedule.speaker || selectedSchedule.host}
                  </span>
                </div>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  Join Session
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;