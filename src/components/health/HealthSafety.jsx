import { useState  } from 'react';
import { motion } from 'framer-motion';
import HealthNavigation from './HealthNavigation';
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  ComputerDesktopIcon,
  HomeIcon,
  BriefcaseIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

function HealthSafety() {
  const [activeCategory, setActiveCategory] = useState('mental');

  const categories = {
    mental: {
      title: 'Mental Health',
      description: 'Comprehensive support for emotional and psychological well-being',
      services: [
        {
          title: 'Professional Counseling',
          description: 'Connect with licensed therapists specializing in women\'s mental health issues, trauma, anxiety, depression, and stress management.',
          icon: ChatBubbleLeftIcon,
          iconColor: 'text-blue-500',
          bgColor: 'bg-blue-50',
          features: [
            'Individual & Group Therapy',
            'Trauma-Informed Care',
            'Cultural Sensitivity',
            'Multilingual Support',
            'Flexible Scheduling'
          ],
          resources: [
            'Depression Screening Tools',
            'Anxiety Management Guides',
            'Self-Care Workbooks',
            'Mood Tracking Apps'
          ]
        },
        {
          title: 'Mental Wellness Programs',
          description: 'Holistic programs designed to enhance mental resilience and emotional intelligence.',
          icon: SparklesIcon,
          iconColor: 'text-purple-500',
          bgColor: 'bg-purple-50',
          features: [
            'Mindfulness Training',
            'Stress Reduction Workshops',
            'Art Therapy Sessions',
            'Meditation Classes',
            'Journaling Workshops'
          ],
          resources: [
            'Guided Meditation Library',
            'Stress Management Tools',
            'Creative Expression Guides',
            'Emotional Intelligence Resources'
          ]
        },
        {
          title: 'Crisis Support',
          description: 'Immediate assistance and resources for mental health emergencies.',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-red-500',
          bgColor: 'bg-red-50',
          features: [
            '24/7 Crisis Hotline',
            'Emergency Intervention',
            'Support Groups',
            'Family Counseling',
            'Recovery Planning'
          ],
          resources: [
            'Crisis Management Plans',
            'Emergency Contact Lists',
            'Support Network Building',
            'Recovery Resources'
          ]
        }
      ]
    },
    physical: {
      title: 'Physical Health',
      description: 'Comprehensive programs for maintaining optimal physical health and wellness',
      services: [
        {
          title: 'Women\'s Health Services',
          description: 'Specialized healthcare services addressing women\'s unique health needs across all life stages.',
          icon: HeartIcon,
          iconColor: 'text-pink-500',
          bgColor: 'bg-pink-50',
          features: [
            'Reproductive Health Care',
            'Preventive Screenings',
            'Hormonal Health',
            'Pregnancy Support',
            'Menopause Management'
          ],
          resources: [
            'Health Screening Guidelines',
            'Reproductive Health Guide',
            'Pregnancy Resources',
            'Menopause Support'
          ]
        },
        {
          title: 'Fitness & Exercise',
          description: 'Customized fitness programs promoting strength, flexibility, and overall wellness.',
          icon: UserGroupIcon,
          iconColor: 'text-green-500',
          bgColor: 'bg-green-50',
          features: [
            'Personal Training',
            'Group Fitness Classes',
            'Prenatal Exercise',
            'Strength Training',
            'Cardio Programs'
          ],
          resources: [
            'Exercise Video Library',
            'Workout Plans',
            'Fitness Tracking Tools',
            'Nutrition Guides'
          ]
        },
        {
          title: 'Nutrition & Wellness',
          description: 'Expert guidance on nutrition, diet, and maintaining a healthy lifestyle.',
          icon: SparklesIcon,
          iconColor: 'text-orange-500',
          bgColor: 'bg-orange-50',
          features: [
            'Nutritional Counseling',
            'Meal Planning',
            'Dietary Supplements',
            'Weight Management',
            'Eating Disorder Support'
          ],
          resources: [
            'Recipe Collections',
            'Meal Planning Tools',
            'Nutrition Calculator',
            'Shopping Guides'
          ]
        }
      ]
    },
    safety: {
      title: 'Personal Safety',
      description: 'Comprehensive resources and training for personal security and protection',
      services: [
        {
          title: 'Self-Defense Training',
          description: 'Practical self-defense techniques and strategies for personal protection.',
          icon: ShieldCheckIcon,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          features: [
            'Basic Self-Defense',
            'Advanced Techniques',
            'Situational Awareness',
            'Emergency Response',
            'Group Classes'
          ],
          resources: [
            'Training Videos',
            'Safety Guidelines',
            'Defense Techniques',
            'Emergency Protocols'
          ]
        },
        {
          title: 'Digital Safety',
          description: 'Protection strategies for online privacy and cybersecurity.',
          icon: ComputerDesktopIcon,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          features: [
            'Online Privacy',
            'Social Media Safety',
            'Cybersecurity Tools',
            'Digital Footprint Management',
            'Identity Protection'
          ],
          resources: [
            'Privacy Guides',
            'Security Tools',
            'Online Safety Tips',
            'Resource Directory'
          ]
        },
        {
          title: 'Personal Security',
          description: 'Comprehensive security measures for home, travel, and daily activities.',
          icon: HomeIcon,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          features: [
            'Home Security',
            'Travel Safety',
            'Personal Alarms',
            'Safety Planning',
            'Emergency Preparedness'
          ],
          resources: [
            'Security Checklists',
            'Travel Safety Tips',
            'Emergency Contacts',
            'Safety Products'
          ]
        }
      ]
    },
    workplace: {
      title: 'Workplace Safety',
      description: 'Resources and support for maintaining a safe and healthy work environment',
      services: [
        {
          title: 'Harassment Prevention',
          description: 'Comprehensive resources for preventing and addressing workplace harassment.',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          features: [
            'Prevention Training',
            'Reporting Systems',
            'Legal Resources',
            'Support Services',
            'Policy Development'
          ],
          resources: [
            'Rights & Policies',
            'Reporting Guidelines',
            'Legal Support',
            'Counseling Services'
          ]
        },
        {
          title: 'Professional Boundaries',
          description: 'Guidance on maintaining healthy professional relationships and boundaries.',
          icon: UserGroupIcon,
          iconColor: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          features: [
            'Boundary Setting',
            'Communication Skills',
            'Conflict Resolution',
            'Professional Ethics',
            'Support Networks'
          ],
          resources: [
            'Boundary Guidelines',
            'Communication Tools',
            'Conflict Resolution',
            'Professional Development'
          ]
        },
        {
          title: 'Remote Work Safety',
          description: 'Safety and wellness strategies for remote and hybrid work environments.',
          icon: ComputerDesktopIcon,
          iconColor: 'text-teal-600',
          bgColor: 'bg-teal-50',
          features: [
            'Ergonomic Setup',
            'Digital Security',
            'Work-Life Balance',
            'Time Management',
            'Virtual Collaboration'
          ],
          resources: [
            'Home Office Guide',
            'Digital Tools',
            'Wellness Tips',
            'Productivity Resources'
          ]
        }
      ]
    },
    reproductive: {
      title: 'Reproductive Health',
      description: 'Comprehensive care and education for reproductive health and wellness',
      services: [
        {
          title: 'Family Planning',
          description: 'Expert guidance and resources for family planning and reproductive health.',
          icon: AcademicCapIcon,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-50',
          features: [
            'Contraception Options',
            'Fertility Services',
            'Pregnancy Planning',
            'Genetic Counseling',
            'Health Screenings'
          ],
          resources: [
            'Planning Guides',
            'Healthcare Directory',
            'Educational Materials',
            'Support Services'
          ]
        },
        {
          title: 'Maternal Health',
          description: 'Comprehensive support for pregnancy, childbirth, and postpartum care.',
          icon: HeartIcon,
          iconColor: 'text-pink-600',
          bgColor: 'bg-pink-50',
          features: [
            'Prenatal Care',
            'Childbirth Education',
            'Postpartum Support',
            'Lactation Services',
            'Mental Health Care'
          ],
          resources: [
            'Pregnancy Guide',
            'Birth Planning',
            'Postpartum Care',
            'Support Groups'
          ]
        },
        {
          title: 'Sexual Health',
          description: 'Education and care for sexual health and wellness.',
          icon: ShieldCheckIcon,
          iconColor: 'text-teal-600',
          bgColor: 'bg-teal-50',
          features: [
            'STI Prevention',
            'Regular Screenings',
            'Education Programs',
            'Counseling Services',
            'Treatment Options'
          ],
          resources: [
            'Health Guidelines',
            'Testing Resources',
            'Educational Materials',
            'Support Services'
          ]
        }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation */}
      <HealthNavigation
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute -right-20 -top-20 w-96 h-96"
          >
            <svg
              className="w-full h-full text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.div>

          <div className="relative z-10 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Your Health & Safety Matter
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl opacity-90 mb-8"
            >
              Access comprehensive resources for your mental, physical, and personal well-being.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Get Emergency Help
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
              >
                Take Health Assessment
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {categories[activeCategory].services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className={`relative ${service.bgColor} h-48 flex flex-col items-center justify-center`}>
                <service.icon className={`w-16 h-16 ${service.iconColor} mb-4`} />
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Features</h4>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center"
                      >
                        <svg
                          className="w-5 h-5 text-purple-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Resources</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.resources.map((resource, resourceIndex) => (
                      <motion.button
                        key={resourceIndex}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium bg-purple-50 px-3 py-2 rounded-lg text-left"
                      >
                        {resource}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Emergency Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-red-50 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-600">Emergency Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">Crisis Hotline</h3>
              <p className="text-gray-600 mb-4">24/7 support for emergency situations</p>
              <a href="tel:1-800-123-4567" className="text-purple-600 font-semibold">
                1-800-123-4567
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">Emergency Services</h3>
              <p className="text-gray-600 mb-4">Police, ambulance, and fire services</p>
              <a href="tel:911" className="text-purple-600 font-semibold">
                911
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">Online Support</h3>
              <p className="text-gray-600 mb-4">Chat with a counselor anytime</p>
              <button className="text-purple-600 font-semibold">Start Chat</button>
            </motion.div>
          </div>
        </motion.section>

        {/* Resource Downloads */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-purple-50 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold mb-8">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Safety Guide',
                icon: '📋',
                description: 'Comprehensive safety tips and guidelines'
              },
              {
                title: 'Wellness Tracker',
                icon: '📊',
                description: 'Track your daily wellness activities'
              },
              {
                title: 'Emergency Plan',
                icon: '🚨',
                description: 'Create your personal emergency plan'
              },
              {
                title: 'Resource Directory',
                icon: '📚',
                description: 'List of local and online resources'
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 text-center shadow-md"
              >
                <span className="text-4xl mb-4 block">{resource.icon}</span>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <button className="text-purple-600 font-semibold hover:text-purple-700">
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 text-white"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="mb-6">
              Get the latest health and safety updates delivered to your inbox.
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default HealthSafety;
