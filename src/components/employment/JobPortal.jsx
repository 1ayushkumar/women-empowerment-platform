import { useState  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon,
  ClockIcon,
  XMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const JobPortal = () => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    experience: '',
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'tech', label: 'Technology' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' },
    { id: 'business', label: 'Business' },
    { id: 'creative', label: 'Creative Arts' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'TechCorp Solutions',
      location: 'Mumbai, India',
      type: 'Full-time',
      salary: '₹6,00,000 - ₹12,00,000',
      category: 'tech',
      description: 'Looking for an experienced software developer with expertise in React and Node.js.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '3+ years of experience in web development',
        'Strong knowledge of JavaScript, React, and Node.js',
        'Experience with database design and REST APIs',
      ],
      postedDate: '2024-12-20',
      deadline: '2025-01-31',
    },
    {
      id: 2,
      title: 'Nurse Practitioner',
      company: 'City Healthcare',
      location: 'Delhi, India',
      type: 'Full-time',
      salary: '₹5,00,000 - ₹8,00,000',
      category: 'healthcare',
      description: 'Seeking a qualified nurse practitioner to join our growing healthcare team.',
      requirements: [
        'Bachelor\'s degree in Nursing',
        'Valid nursing license',
        '2+ years of clinical experience',
        'Strong patient care skills',
      ],
      postedDate: '2024-12-25',
      deadline: '2025-02-15',
    },
    {
      id: 3,
      title: 'Digital Marketing Manager',
      company: 'Creative Solutions',
      location: 'Bangalore, India',
      type: 'Remote',
      salary: '₹8,00,000 - ₹15,00,000',
      category: 'business',
      description: 'Leading digital marketing initiatives for a growing creative agency.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '5+ years of digital marketing experience',
        'Experience with SEO, SEM, and social media marketing',
        'Strong analytical and leadership skills',
      ],
      postedDate: '2024-12-28',
      deadline: '2025-02-28',
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    const newApplication = {
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      ...formData,
      status: 'pending',
      appliedDate: new Date().toISOString(),
    };
    setApplications([...applications, newApplication]);
    setShowApplicationModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
      experience: '',
    });
    alert('Application submitted successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid gap-6">
        {filteredJobs.map(job => (
          <motion.div
            key={job.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                    {job.company}
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <CurrencyRupeeIcon className="h-5 w-5 mr-2" />
                    {job.salary}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    {categories.find(c => c.id === job.category)?.label}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between">
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Posted: {new Date(job.postedDate).toLocaleDateString()}
                </div>
                <button
                  onClick={() => handleApply(job)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Apply for {selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.company}</p>
                </div>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume
                  </label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    rows="4"
                    required
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Applications Section */}
      {applications.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">My Applications</h2>
          <div className="grid gap-4">
            {applications.map((application, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                    <p className="text-gray-600">{application.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    application.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Applied on: {new Date(application.appliedDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPortal;
