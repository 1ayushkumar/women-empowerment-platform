import { useState  } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  CalendarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  FunnelIcon,
  ComputerDesktopIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const mentors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'Senior Data Scientist',
    expertise: ['Machine Learning', 'Data Science', 'Python'],
    experience: '12+ years',
    availability: 'Weekends',
    rating: 4.9,
    reviews: 245,
    color: 'from-purple-400 to-indigo-500',
    icon: ComputerDesktopIcon,
    bio: 'Leading data scientist helping women break into tech and data science.',
    achievements: ['PhD in Computer Science', 'Top AI Researcher 2023'],
    mentorshipLink: 'https://www.womenwhocode.com/mentorship'
  },
  {
    id: 2,
    name: 'Jennifer Adams',
    title: 'Engineering Manager',
    expertise: ['Software Engineering', 'Leadership', 'Career Growth'],
    experience: '15+ years',
    availability: 'Weekdays',
    rating: 4.8,
    reviews: 189,
    color: 'from-blue-400 to-cyan-500',
    icon: CogIcon,
    bio: 'Engineering leader passionate about helping women advance in tech leadership roles.',
    achievements: ['Tech Leadership Award', 'Women in Tech Mentor of the Year'],
    mentorshipLink: 'https://mentorship.womenintechnology.org'
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    title: 'Tech Lead',
    expertise: ['Software Development', 'AI/ML', 'Product Management'],
    experience: '10+ years',
    availability: 'Flexible',
    rating: 4.7,
    reviews: 156,
    color: 'from-green-400 to-emerald-500',
    icon: ChartBarIcon,
    bio: 'Tech leader specializing in AI and machine learning, committed to increasing diversity in tech.',
    achievements: ['Google Women Techmakers Scholar', 'Tech Diversity Champion 2023'],
    mentorshipLink: 'https://www.girlsintech.org/mentorship'
  }
];

const expertiseAreas = [
  'Machine Learning',
  'Data Science',
  'Python',
  'Software Engineering',
  'Leadership',
  'Career Growth',
  'Software Development',
  'AI/ML',
  'Product Management'
];

function Mentorship() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [filters, setFilters] = useState({
    expertise: [],
    availability: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMentors = mentors.filter(mentor => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        mentor.name.toLowerCase().includes(query) ||
        mentor.expertise.some(e => e.toLowerCase().includes(query)) ||
        mentor.title.toLowerCase().includes(query)
      );
    }
    if (filters.expertise.length > 0) {
      return mentor.expertise.some(e => filters.expertise.includes(e));
    }
    if (filters.availability !== 'all') {
      return mentor.availability.toLowerCase() === filters.availability;
    }
    return true;
  });

  const handleExpertiseFilter = (expertise) => {
    setFilters(prev => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter(e => e !== expertise)
        : [...prev.expertise, expertise]
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Find Your Perfect Mentor</h2>
          <p className="text-gray-600 mt-1">Connect with industry experts who can guide your journey</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
        >
          <FunnelIcon className="h-5 w-5 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search mentors by name, expertise, or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-4 rounded-lg"
        >
          <h3 className="font-medium mb-4">Filter by Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {expertiseAreas.map(expertise => (
              <button
                key={expertise}
                onClick={() => handleExpertiseFilter(expertise)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.expertise.includes(expertise)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-purple-100'
                }`}
              >
                {expertise}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-medium mb-2">Availability</h3>
            <select
              value={filters.availability}
              onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            >
              <option value="all">All</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => {
          const MentorIcon = mentor.icon;
          return (
            <motion.div
              key={mentor.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${mentor.color} flex items-center justify-center`}>
                      <MentorIcon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{mentor.name}</h3>
                      <p className="text-gray-600">{mentor.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{mentor.rating}</span>
                  </div>
                </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <BriefcaseIcon className="h-5 w-5 mr-2" />
                  <span>{mentor.experience}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>{mentor.availability}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  View Profile
                </button>
                <a
                  href={mentor.mentorshipLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Connect
                </a>
              </div>
            </div>
          </motion.div>
        );
        })}
      </div>

      {selectedMentor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Mentor Profile</h2>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <div className={`h-24 w-24 rounded-full bg-gradient-to-br ${selectedMentor.color} flex items-center justify-center`}>
                <selectedMentor.icon className="h-16 w-16 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedMentor.name}</h3>
                <p className="text-gray-600">{selectedMentor.title}</p>
                <div className="flex items-center mt-2">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-600">
                    {selectedMentor.rating} ({selectedMentor.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-6">{selectedMentor.bio}</p>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Achievements</h4>
              <ul className="list-disc list-inside text-gray-700">
                {selectedMentor.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-4">
              <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Schedule Session
              </button>
              <a
                href={selectedMentor.mentorshipLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200"
              >
                Connect
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <UserCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No mentors found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters to find more mentors.
          </p>
        </div>
      )}
    </div>
  );
}

export default Mentorship;
