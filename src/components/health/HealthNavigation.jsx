import { useState, useEffect  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BriefcaseIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  {
    id: 'mental',
    title: 'Mental Health',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    stats: { users: '10K+', sessions: '50K+', rating: 4.8 }
  },
  {
    id: 'physical',
    title: 'Physical Health',
    icon: ShieldCheckIcon,
    color: 'from-purple-500 to-indigo-500',
    stats: { users: '15K+', sessions: '75K+', rating: 4.9 }
  },
  {
    id: 'safety',
    title: 'Personal Safety',
    icon: UserGroupIcon,
    color: 'from-blue-500 to-cyan-500',
    stats: { users: '8K+', sessions: '30K+', rating: 4.7 }
  },
  {
    id: 'workplace',
    title: 'Workplace Safety',
    icon: BriefcaseIcon,
    color: 'from-green-500 to-emerald-500',
    stats: { users: '12K+', sessions: '45K+', rating: 4.8 }
  },
  {
    id: 'reproductive',
    title: 'Reproductive Health',
    icon: BeakerIcon,
    color: 'from-orange-500 to-amber-500',
    stats: { users: '9K+', sessions: '40K+', rating: 4.9 }
  }
];

const HealthNavigation = ({ activeCategory, setActiveCategory }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const StatCard = ({ label, value }) => (
    <div className="text-center">
      <div className="text-2xl font-bold">
        <CountUp end={parseInt(value)} duration={2} suffix="+" />
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  return (
    <motion.nav
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 py-4">
          {/* Main Navigation */}
          <div className="flex justify-between items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative flex-shrink-0"
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <ScrollLink
                  to={item.id}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer"
                >
                  <motion.div
                    onClick={() => setActiveCategory(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex flex-col items-center p-4 rounded-xl ${
                      activeCategory === item.id
                        ? `bg-gradient-to-r ${item.color} text-white`
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">{item.title}</span>
                    
                    {/* Interactive Pill Badge */}
                    {activeCategory === item.id && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full bg-white"
                      />
                    )}
                  </motion.div>
                </ScrollLink>

                {/* Hover Card */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl p-4 z-50"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <StatCard label="Users" value={item.stats.users} />
                        <StatCard label="Sessions" value={item.stats.sessions} />
                        <div className="text-center">
                          <div className="text-2xl font-bold">{item.stats.rating}</div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                          View Details
                        </button>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.svg
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions Bar */}
          <motion.div
            variants={containerVariants}
            className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
          >
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Quick Chat</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <HeartIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Emergency Help</span>
              </motion.button>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg cursor-pointer"
              >
                <span className="text-sm font-medium">Resources</span>
                <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-1 rounded-full">
                  New
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default HealthNavigation;
