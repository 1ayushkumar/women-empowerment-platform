import { useState  } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  ShoppingBagIcon,
  AcademicCapIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  VideoIcon,
  PhoneIcon,
  EnvelopeIcon,
  XMarkIcon,
  CheckBadgeIcon,
  TrophyIcon,
  FireIcon,
  SparklesIcon,
  HeartIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Card from '../shared/Card';

const mentors = [
  {
    id: 1,
    name: 'Lisa Johnson',
    title: 'Serial Entrepreneur & Angel Investor',
    expertise: ['Business Strategy', 'Fundraising', 'Scaling Startups'],
    experience: '15+ years',
    availability: 'Flexible',
    rating: 4.9,
    reviews: 178,
    color: 'from-purple-400 to-indigo-500',
    icon: BriefcaseIcon,
    location: 'San Francisco, CA',
    languages: ['English', 'Spanish'],
    sessionTypes: ['1-on-1 Video Call', 'Group Sessions', 'Email Support'],
    priceRange: 'Free - ₹5,000/session',
    responseTime: '< 24 hours',
    bio: 'Founded and scaled 3 successful startups, now helping women entrepreneurs succeed. Passionate about empowering the next generation of female leaders.',
    achievements: ['Forbes 40 Under 40', 'Tech Founder of the Year 2023', '3 Successful Exits'],
    specialties: ['Startup Strategy', 'Investor Relations', 'Team Building', 'Product-Market Fit'],
    mentorshipLink: 'https://www.micromentor.org/mentors',
    totalMentees: 89,
    successStories: 23
  },
  {
    id: 2,
    name: 'Michelle Chen',
    title: 'Venture Capitalist',
    expertise: ['Venture Capital', 'Growth Strategy', 'Tech Startups'],
    experience: '12+ years',
    availability: 'Weekends',
    rating: 4.8,
    reviews: 145,
    color: 'from-blue-400 to-cyan-500',
    icon: CurrencyDollarIcon,
    location: 'New York, NY',
    languages: ['English', 'Mandarin'],
    sessionTypes: ['1-on-1 Video Call', 'Pitch Reviews', 'Investor Introductions'],
    priceRange: '₹3,000 - ₹8,000/session',
    responseTime: '< 48 hours',
    bio: 'Partner at leading VC firm, passionate about funding women-led startups. Expert in evaluating business models and scaling strategies.',
    achievements: ['Top 50 Women in VC', '$100M+ Portfolio Manager', 'Harvard Business Review Contributor'],
    specialties: ['Fundraising', 'Due Diligence', 'Market Analysis', 'Growth Metrics'],
    mentorshipLink: 'https://www.womenventurefund.com/mentorship',
    totalMentees: 67,
    successStories: 18
  },
  {
    id: 3,
    name: 'Sarah Martinez',
    title: 'Business Growth Consultant',
    expertise: ['Business Development', 'Marketing', 'E-commerce'],
    experience: '10+ years',
    availability: 'Weekdays',
    rating: 4.7,
    reviews: 132,
    color: 'from-green-400 to-emerald-500',
    icon: ChartBarIcon,
    location: 'Austin, TX',
    languages: ['English', 'Portuguese'],
    sessionTypes: ['1-on-1 Coaching', 'Strategy Sessions', 'Marketing Audits'],
    priceRange: '₹2,000 - ₹6,000/session',
    responseTime: '< 12 hours',
    bio: 'Helped 100+ women entrepreneurs scale their businesses globally. Specializes in digital marketing and e-commerce growth strategies.',
    achievements: ['Business Growth Expert of the Year', 'Published Author', 'TEDx Speaker'],
    specialties: ['Digital Marketing', 'E-commerce', 'Customer Acquisition', 'Brand Strategy'],
    mentorshipLink: 'https://www.score.org/find-mentor',
    totalMentees: 156,
    successStories: 34
  },
  {
    id: 4,
    name: 'Dr. Priya Sharma',
    title: 'Tech Innovation Leader',
    expertise: ['Technology', 'AI/ML', 'Product Development'],
    experience: '18+ years',
    availability: 'Evenings',
    rating: 4.9,
    reviews: 203,
    color: 'from-indigo-400 to-purple-500',
    icon: ComputerDesktopIcon,
    location: 'Bangalore, India',
    languages: ['English', 'Hindi', 'Tamil'],
    sessionTypes: ['Technical Mentoring', 'Code Reviews', 'Career Guidance'],
    priceRange: '₹1,500 - ₹4,000/session',
    responseTime: '< 6 hours',
    bio: 'Former Google engineer turned entrepreneur. Leading AI innovation in healthcare and helping women break into tech leadership roles.',
    achievements: ['Google Innovation Award', 'Women in Tech Leadership Award', 'Patent Holder (12 patents)'],
    specialties: ['AI/ML', 'Product Strategy', 'Technical Leadership', 'Innovation Management'],
    mentorshipLink: 'https://www.techmentors.in/priya-sharma',
    totalMentees: 94,
    successStories: 28
  },
  {
    id: 5,
    name: 'Amanda Foster',
    title: 'Retail & Fashion Entrepreneur',
    expertise: ['Retail', 'Fashion', 'Brand Building'],
    experience: '14+ years',
    availability: 'Flexible',
    rating: 4.8,
    reviews: 167,
    color: 'from-pink-400 to-rose-500',
    icon: ShoppingBagIcon,
    location: 'London, UK',
    languages: ['English', 'French'],
    sessionTypes: ['Brand Strategy', 'Retail Consulting', 'Fashion Industry Insights'],
    priceRange: '₹2,500 - ₹7,000/session',
    responseTime: '< 24 hours',
    bio: 'Built a global fashion brand from scratch. Expert in retail operations, brand positioning, and sustainable fashion practices.',
    achievements: ['Fashion Entrepreneur of the Year', 'Sustainable Fashion Pioneer', 'Retail Innovation Award'],
    specialties: ['Brand Development', 'Retail Strategy', 'Sustainable Business', 'Global Expansion'],
    mentorshipLink: 'https://www.fashionmentors.com/amanda',
    totalMentees: 78,
    successStories: 21
  },
  {
    id: 6,
    name: 'Prof. Maria Rodriguez',
    title: 'Business Education & Strategy',
    expertise: ['Business Education', 'Strategic Planning', 'Leadership'],
    experience: '20+ years',
    availability: 'Weekdays',
    rating: 4.9,
    reviews: 234,
    color: 'from-emerald-400 to-teal-500',
    icon: AcademicCapIcon,
    location: 'Barcelona, Spain',
    languages: ['English', 'Spanish', 'Catalan'],
    sessionTypes: ['Academic Mentoring', 'Research Guidance', 'Leadership Development'],
    priceRange: 'Free - ₹3,000/session',
    responseTime: '< 48 hours',
    bio: 'Professor of Business Strategy at top European business school. Mentoring the next generation of business leaders and researchers.',
    achievements: ['Outstanding Professor Award', 'Business Strategy Research Excellence', 'Published 50+ Papers'],
    specialties: ['Strategic Planning', 'Academic Research', 'Leadership Development', 'Business Education'],
    mentorshipLink: 'https://www.academicmentors.eu/maria',
    totalMentees: 312,
    successStories: 67
  }
];

const expertiseFilters = [
  'Business Strategy',
  'Fundraising',
  'Scaling Startups',
  'Venture Capital',
  'Growth Strategy',
  'Tech Startups',
  'Business Development',
  'Marketing',
  'E-commerce',
  'Technology',
  'AI/ML',
  'Product Development',
  'Retail',
  'Fashion',
  'Brand Building',
  'Business Education',
  'Strategic Planning',
  'Leadership'
];

const sessionTypeFilters = [
  '1-on-1 Video Call',
  'Group Sessions',
  'Email Support',
  'Pitch Reviews',
  'Technical Mentoring',
  'Strategy Sessions'
];

function Mentors() {
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [selectedSessionType, setSelectedSessionType] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState(new Set());

  // Filter and sort mentors
  const filteredMentors = mentors
    .filter(mentor => {
      const expertiseMatch = selectedExpertise === 'All' || mentor.expertise.includes(selectedExpertise);
      const sessionTypeMatch = selectedSessionType === 'All' || mentor.sessionTypes.includes(selectedSessionType);
      return expertiseMatch && sessionTypeMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'reviews':
          return b.reviews - a.reviews;
        case 'price':
          return a.priceRange.localeCompare(b.priceRange);
        default:
          return 0;
      }
    });

  const toggleFavorite = (mentorId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(mentorId)) {
      newFavorites.delete(mentorId);
    } else {
      newFavorites.add(mentorId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">🌟 Find Your Perfect Mentor</h1>
          <p className="text-purple-100 text-lg mb-6">
            Connect with experienced entrepreneurs and industry leaders who are passionate about helping women succeed in business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{mentors.length}</div>
              <div className="text-purple-200">Expert Mentors</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{mentors.reduce((sum, m) => sum + m.totalMentees, 0)}</div>
              <div className="text-purple-200">Mentees Helped</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{mentors.reduce((sum, m) => sum + m.successStories, 0)}</div>
              <div className="text-purple-200">Success Stories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Browse Mentors</h2>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="reviews">Sort by Reviews</option>
              <option value="price">Sort by Price</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
            >
              Filters
            </button>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 pt-6 space-y-4"
          >
            {/* Expertise Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedExpertise('All')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedExpertise === 'All'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {expertiseFilters.map((expertise) => (
                  <button
                    key={expertise}
                    onClick={() => setSelectedExpertise(expertise)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedExpertise === expertise
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {expertise}
                  </button>
                ))}
              </div>
            </div>

            {/* Session Type Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Session Type</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSessionType('All')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSessionType === 'All'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Types
                </button>
                {sessionTypeFilters.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedSessionType(type)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSessionType === type
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => {
          const MentorIcon = mentor.icon;
          return (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-br ${mentor.color} p-6 text-white relative`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <MentorIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{mentor.name}</h3>
                      <p className="text-white/80 text-sm">{mentor.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(mentor.id)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <HeartIcon
                      className={`w-6 h-6 ${favorites.has(mentor.id) ? 'fill-current text-red-300' : ''}`}
                    />
                  </button>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(mentor.rating) ? 'text-yellow-300' : 'text-white/30'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-white/90 text-sm">
                      {mentor.rating} ({mentor.reviews})
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-white/80 text-xs">Response Time</div>
                    <div className="text-white font-medium text-sm">{mentor.responseTime}</div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{mentor.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{mentor.location}</span>
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Session Price</span>
                    <span className="text-sm font-semibold text-purple-600">{mentor.priceRange}</span>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{mentor.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Success Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                  <div className="bg-green-50 rounded-lg p-2">
                    <div className="text-lg font-bold text-green-600">{mentor.totalMentees}</div>
                    <div className="text-xs text-green-700">Mentees</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="text-lg font-bold text-blue-600">{mentor.successStories}</div>
                    <div className="text-xs text-blue-700">Success Stories</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedMentor(mentor)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    View Profile
                  </button>
                  <a
                    href={mentor.mentorshipLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium text-center"
                  >
                    Connect
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No Results Message */}
      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <UserCircleIcon className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more mentors.</p>
        </div>
      )}

      {/* Enhanced Mentor Profile Modal */}
      {selectedMentor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMentor(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-br ${selectedMentor.color} p-8 text-white relative`}>
              <button
                onClick={() => setSelectedMentor(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <selectedMentor.icon className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedMentor.name}</h2>
                  <p className="text-white/90 text-lg mb-3">{selectedMentor.title}</p>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(selectedMentor.rating) ? 'text-yellow-300' : 'text-white/30'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-white/90">
                        {selectedMentor.rating} ({selectedMentor.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="w-4 h-4 text-white/80" />
                      <span className="text-white/90">{selectedMentor.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">{selectedMentor.experience}</div>
                  <div className="text-white/80 text-sm">Experience</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">{selectedMentor.totalMentees}</div>
                  <div className="text-white/80 text-sm">Mentees Helped</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">{selectedMentor.successStories}</div>
                  <div className="text-white/80 text-sm">Success Stories</div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
              {/* Bio Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <UserCircleIcon className="w-5 h-5 mr-2 text-purple-600" />
                  About {selectedMentor.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedMentor.bio}</p>
              </div>

              {/* Expertise & Specialties */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <SparklesIcon className="w-5 h-5 mr-2 text-purple-600" />
                    Core Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FireIcon className="w-5 h-5 mr-2 text-orange-600" />
                    Specialties
                  </h4>
                  <div className="space-y-2">
                    {selectedMentor.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <TrophyIcon className="w-5 h-5 mr-2 text-yellow-600" />
                  Achievements & Recognition
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMentor.achievements.map((achievement, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <TrophyIcon className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-800 font-medium">{achievement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Session Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Session Types</div>
                    <div className="space-y-1">
                      {selectedMentor.sessionTypes.map((type, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <VideoIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600 text-sm">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Languages</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedMentor.languages.map((language, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Availability</div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600 text-sm">{selectedMentor.availability}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Responds in {selectedMentor.responseTime}
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Session Pricing</div>
                      <div className="text-sm text-gray-600">Flexible pricing based on session type</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">{selectedMentor.priceRange}</div>
                      <div className="text-sm text-gray-500">per session</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={selectedMentor.mentorshipLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-purple-600 text-white text-center px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  <span>Connect with {selectedMentor.name}</span>
                </a>
                <button
                  onClick={() => toggleFavorite(selectedMentor.id)}
                  className={`px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2 ${
                    favorites.has(selectedMentor.id)
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <HeartIcon className={`w-5 h-5 ${favorites.has(selectedMentor.id) ? 'fill-current' : ''}`} />
                  <span>{favorites.has(selectedMentor.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Mentors;
