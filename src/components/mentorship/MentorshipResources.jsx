import { motion } from 'framer-motion';
import useMentorshipStore from '../../store/mentorshipStore';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const MentorshipResources = () => {
  const navigate = useNavigate();
  const resources = useMentorshipStore((state) => state.resources);
  const membershipPlan = useAuthStore((state) => state.membershipPlan);

  const handleDownload = (resource) => {
    if (membershipPlan === 'basic') {
      if (window.confirm('This resource is available for Premium and Enterprise members. Would you like to upgrade your membership?')) {
        navigate('/membership');
      }
    } else {
      // In a real app, this would trigger a download
      alert(`Downloading ${resource.title}...`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Mentorship Resources</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {resource.title}
                    </h2>
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-3">
                      {resource.type}
                    </span>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Feature Notice */}
        {membershipPlan === 'basic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">
              Unlock Premium Resources
            </h3>
            <p className="mb-4">
              Upgrade to Premium or Enterprise membership to access our full library of mentorship resources.
            </p>
            <button
              onClick={() => navigate('/membership')}
              className="bg-white text-purple-600 px-6 py-2 rounded hover:bg-gray-100 transition duration-200"
            >
              Upgrade Now
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MentorshipResources;
