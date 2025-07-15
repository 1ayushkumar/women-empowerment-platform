import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const userName = localStorage.getItem('userName') || 'User';

  const services = [
    {
      title: 'Health & Safety',
      description: 'Access health resources and safety guidelines',
      path: '/health',
      icon: '🏥',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Career Guidance',
      description: 'Explore career opportunities and guidance',
      path: '/career',
      icon: '💼',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Financial Education',
      description: 'Learn about financial management',
      path: '/finance',
      icon: '💰',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Entrepreneurship',
      description: 'Start and grow your business',
      path: '/entrepreneurship',
      icon: '🚀',
      color: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">Welcome, {userName}! 👋</h1>
          <p className="text-xl opacity-90">
            Explore our services and resources designed to support your journey.
          </p>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.path}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-r ${service.color} rounded-xl p-6 text-white h-full`}
                >
                  <span className="text-4xl mb-4 block">{service.icon}</span>
                  <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                  <p className="opacity-90">{service.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 text-center rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"
            >
              Schedule Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 text-center rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100"
            >
              View Resources
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 text-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              Get Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 text-center rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
            >
              Track Progress
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
