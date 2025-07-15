import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const membershipPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    features: [
      'Access to Community Forum',
      'Basic Health Tracking',
      'Limited Job Listings',
      'Basic Safety Features'
    ],
    recommended: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99/month',
    features: [
      'All Basic Features',
      'Priority Mentorship Matching',
      'Advanced Health Analytics',
      'Full Job Board Access',
      'Business Tools Access',
      'Premium Learning Resources',
      'Advanced Safety Features'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$24.99/month',
    features: [
      'All Premium Features',
      'Dedicated Mentor',
      'Business Consulting',
      'Custom Analytics Dashboard',
      'Priority Support',
      'Team Collaboration Tools',
      'Custom Safety Solutions'
    ],
    recommended: false
  }
];

function Membership() {
  const navigate = useNavigate();
  const updateUserPlan = useAuthStore((state) => state.updateUserPlan);

  const handleSelectPlan = (planId) => {
    updateUserPlan(planId);
    // In a real app, this would redirect to a payment page for paid plans
    if (planId === 'basic') {
      navigate('/dashboard');
    } else {
      // Simulate payment flow - in real app, redirect to payment processor
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            Choose Your Membership Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-purple-100"
          >
            Select the plan that best fits your needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {membershipPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg shadow-xl bg-white p-8 relative ${
                plan.recommended ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.recommended && (
                <span className="absolute top-0 right-0 px-3 py-1 transform translate-x-2 -translate-y-2 bg-purple-500 text-white text-sm font-medium rounded-full">
                  Recommended
                </span>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-3xl font-bold text-purple-600">{plan.price}</p>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-purple-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`mt-8 w-full py-3 px-6 rounded-md text-white font-medium ${
                  plan.recommended
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Membership;
