import { useState  } from 'react';
import { motion } from 'framer-motion';
import useMentorshipStore from '../../store/mentorshipStore';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const BrowseMentors = () => {
  const navigate = useNavigate();
  const mentors = useMentorshipStore((state) => state.mentors);
  const membershipPlan = useAuthStore((state) => state.membershipPlan);
  const [selectedExpertise, setSelectedExpertise] = useState('All');

  const allExpertise = ['All', ...new Set(mentors.flatMap(mentor => mentor.expertise))];
  
  const filteredMentors = selectedExpertise === 'All'
    ? mentors
    : mentors.filter(mentor => mentor.expertise.includes(selectedExpertise));

  const handleConnectClick = (mentorId) => {
    if (membershipPlan === 'basic') {
      // Show upgrade prompt for basic users
      if (window.confirm('This feature is available for Premium and Enterprise members. Would you like to upgrade your membership?')) {
        navigate('/membership');
      }
    } else {
      // Handle mentor connection for premium/enterprise users
      alert('Request sent! The mentor will contact you soon.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse Mentors</h1>
        <div className="relative">
          <select
            className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
          >
            {allExpertise.map(expertise => (
              <option key={expertise} value={expertise}>{expertise}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => {
          const MentorIcon = mentor.icon;
          return (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Icon Header */}
              <div className={`bg-gradient-to-br ${mentor.color} p-8 text-white text-center relative`}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
                    <MentorIcon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl mb-2">{mentor.avatar}</div>
                  <div className="text-sm text-white/80">Professional Mentor</div>
                </div>
              </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{mentor.name}</h2>
              <p className="text-gray-600">{mentor.title}</p>
              <p className="text-sm text-gray-500 mb-4">{mentor.company}</p>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-gray-600">{mentor.rating}</span>
                </div>
                <span className="text-gray-600 text-sm">{mentor.mentees} mentees</span>
              </div>

              <button
                onClick={() => handleConnectClick(mentor.id)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
              >
                Connect with {mentor.name.split(' ')[0]}
              </button>
            </div>
          </motion.div>
        );
        })}
      </div>
    </div>
  );
};

export default BrowseMentors;
