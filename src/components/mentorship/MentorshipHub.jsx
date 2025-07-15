import { useState  } from 'react';
import { motion } from 'framer-motion';
import BrowseMentors from './BrowseMentors';
import MentorApplication from './MentorApplication';
import MentorshipResources from './MentorshipResources';

const MentorshipHub = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'browse':
        return <BrowseMentors />;
      case 'apply':
        return <MentorApplication />;
      case 'resources':
        return <MentorshipResources />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mentorship Programs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4">Find a Mentor</h2>
              <p className="text-gray-600 mb-4">
                Connect with experienced professionals who can guide you in your career journey.
              </p>
              <button
                onClick={() => setActiveComponent('browse')}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
              >
                Browse Mentors
              </button>
            </motion.div>

            {/* Become a Mentor Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4">Become a Mentor</h2>
              <p className="text-gray-600 mb-4">
                Share your knowledge and experience to help others grow professionally.
              </p>
              <button
                onClick={() => setActiveComponent('apply')}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
              >
                Apply as Mentor
              </button>
            </motion.div>

            {/* Resources Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4">Mentorship Resources</h2>
              <p className="text-gray-600 mb-4">
                Access guides, tools, and materials to make the most of your mentorship journey.
              </p>
              <button
                onClick={() => setActiveComponent('resources')}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
              >
                View Resources
              </button>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {activeComponent && (
        <button
          onClick={() => setActiveComponent(null)}
          className="mb-6 flex items-center text-purple-600 hover:text-purple-700"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Mentorship Hub
        </button>
      )}
      
      {!activeComponent && (
        <h1 className="text-3xl font-bold mb-6">Mentorship Hub</h1>
      )}
      
      {renderComponent()}
    </div>
  );
};

export default MentorshipHub;
