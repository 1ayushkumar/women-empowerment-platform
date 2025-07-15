import { useState  } from 'react';
import { motion } from 'framer-motion';
import useMentorshipStore from '../../store/mentorshipStore';

const MentorApplication = () => {
  const addMentorApplication = useMentorshipStore((state) => state.addMentorApplication);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    company: '',
    experience: '',
    expertise: [],
    availability: '',
    motivation: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const expertiseOptions = [
    'Web Development',
    'Cloud Architecture',
    'Team Leadership',
    'Product Strategy',
    'UX Design',
    'Agile Management',
    'Digital Marketing',
    'Brand Strategy',
    'Content Creation',
    'Data Science',
    'AI/ML',
    'Business Development'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExpertiseChange = (expertise) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter(e => e !== expertise)
        : [...prev.expertise, expertise]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMentorApplication(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to be a mentor. We'll review your application and get back to you within 3-5 business days.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Submit Another Application
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Become a Mentor</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
            <select
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select years of experience</option>
              <option value="1-3">1-3 years</option>
              <option value="4-6">4-6 years</option>
              <option value="7-10">7-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {expertiseOptions.map((expertise) => (
                <label key={expertise} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.expertise.includes(expertise)}
                    onChange={() => handleExpertiseChange(expertise)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{expertise}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              name="availability"
              required
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select availability</option>
              <option value="1-2 hours/week">1-2 hours/week</option>
              <option value="3-5 hours/week">3-5 hours/week</option>
              <option value="5+ hours/week">5+ hours/week</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why do you want to be a mentor?
            </label>
            <textarea
              name="motivation"
              required
              value={formData.motivation}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MentorApplication;
