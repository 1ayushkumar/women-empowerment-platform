import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  ClockIcon,
  ChartBarIcon,
  AcademicCapIcon,
  UserGroupIcon,
  FunnelIcon,
  PlayCircleIcon,
  LockClosedIcon,
  CheckCircleIcon,
  StarIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  UsersIcon,
  MegaphoneIcon,
  ChatBubbleLeftRightIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const courses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    category: 'STEM',
    level: 'Beginner',
    duration: '8 weeks',
    enrolled: 1250,
    rating: 4.8,
    reviews: 325,
    instructor: 'Sarah Johnson',
    progress: 0,
    icon: BookOpenIcon,
    color: 'from-blue-400 to-indigo-500',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    previewVideo: 'https://www.youtube.com/embed/PlxWf493en4',
    isAIGenerated: true,
    aiVideoDescription: 'This course preview was created using AI video generation technology, featuring a virtual instructor explaining web development concepts.',
    enrollmentLink: 'https://www.coursera.org/learn/html-css-javascript-for-web-developers',
    modules: [
      { title: 'Introduction to Web Development', duration: '45 min', completed: false },
      { title: 'HTML Fundamentals', duration: '1 hour', completed: false },
      { title: 'CSS Fundamentals', duration: '1.5 hours', completed: false },
      { title: 'JavaScript Fundamentals', duration: '1 hour', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    category: 'STEM',
    level: 'Intermediate',
    duration: '10 weeks',
    enrolled: 980,
    rating: 4.7,
    reviews: 245,
    instructor: 'Emily Chen',
    progress: 75,
    icon: ChartBarIcon,
    color: 'from-green-400 to-emerald-500',
    description: 'Master the basics of data analysis, Python programming, and statistical methods.',
    previewVideo: 'https://www.youtube.com/embed/LHBE6Q9XlzI',
    enrollmentLink: 'https://www.edx.org/learn/data-science',
    modules: [
      { title: 'Data Analysis Fundamentals', duration: '1 hour', completed: true },
      { title: 'Python Programming Fundamentals', duration: '2 hours', completed: true },
      { title: 'Statistical Methods Fundamentals', duration: '1.5 hours', completed: true },
      { title: 'Data Visualization Fundamentals', duration: '1 hour', completed: false },
    ]
  },
  {
    id: 3,
    title: 'Mobile App Development',
    category: 'STEM',
    level: 'Advanced',
    duration: '12 weeks',
    enrolled: 750,
    rating: 4.9,
    reviews: 180,
    instructor: 'Maria Garcia',
    progress: 30,
    icon: DevicePhoneMobileIcon,
    color: 'from-purple-400 to-violet-500',
    description: 'Create iOS and Android apps using React Native and modern development practices.',
    previewVideo: 'https://www.youtube.com/embed/0-S5a0eXPoc',
    enrollmentLink: 'https://www.udacity.com/course/react-nanodegree--nd019',
    modules: [
      { title: 'React Native Fundamentals', duration: '1 hour', completed: true },
      { title: 'iOS App Development Fundamentals', duration: '2 hours', completed: true },
      { title: 'Android App Development Fundamentals', duration: '1.5 hours', completed: false },
      { title: 'App Deployment Fundamentals', duration: '1 hour', completed: false },
    ]
  },
  {
    id: 4,
    title: 'Business Plan Writing',
    category: 'Business',
    level: 'Beginner',
    duration: '4 weeks',
    enrolled: 2100,
    rating: 4.6,
    reviews: 420,
    instructor: 'Lisa Wong',
    progress: 0,
    icon: BriefcaseIcon,
    color: 'from-orange-400 to-red-500',
    description: 'Learn how to create compelling business plans that attract investors.',
    enrollmentLink: 'https://www.udemy.com/course/business-plan-writing',
    modules: [
      { title: 'Business Plan Fundamentals', duration: '45 min', completed: false },
      { title: 'Market Analysis Fundamentals', duration: '1 hour', completed: false },
      { title: 'Financial Projections Fundamentals', duration: '1.5 hours', completed: false },
      { title: 'Pitching Fundamentals', duration: '1 hour', completed: false },
    ]
  },
  {
    id: 5,
    title: 'Financial Management',
    category: 'Business',
    level: 'Intermediate',
    duration: '6 weeks',
    enrolled: 1500,
    rating: 4.8,
    reviews: 300,
    instructor: 'Rachel Thompson',
    progress: 75,
    icon: CurrencyDollarIcon,
    color: 'from-yellow-400 to-amber-500',
    description: 'Master financial planning, budgeting, and investment strategies for your business.',
    enrollmentLink: 'https://www.coursera.org/specializations/financial-management',
    modules: [
      { title: 'Financial Planning Fundamentals', duration: '1 hour', completed: true },
      { title: 'Budgeting Fundamentals', duration: '2 hours', completed: true },
      { title: 'Investment Strategies Fundamentals', duration: '1.5 hours', completed: true },
      { title: 'Risk Management Fundamentals', duration: '1 hour', completed: false },
    ]
  },
  {
    id: 6,
    title: 'Leadership & Management',
    category: 'Business',
    level: 'Advanced',
    duration: '8 weeks',
    enrolled: 980,
    rating: 4.9,
    reviews: 245,
    instructor: 'Michelle Parker',
    progress: 30,
    icon: UsersIcon,
    color: 'from-teal-400 to-cyan-500',
    description: 'Develop essential leadership skills and learn effective team management strategies.',
    enrollmentLink: 'https://www.edx.org/course/leadership-management',
    modules: [
      { title: 'Leadership Fundamentals', duration: '1 hour', completed: true },
      { title: 'Team Management Fundamentals', duration: '2 hours', completed: true },
      { title: 'Communication Fundamentals', duration: '1.5 hours', completed: false },
      { title: 'Decision Making Fundamentals', duration: '1 hour', completed: false },
    ]
  },
  {
    id: 7,
    title: 'Digital Marketing Fundamentals',
    category: 'Digital Marketing',
    level: 'Beginner',
    duration: '6 weeks',
    enrolled: 3200,
    rating: 4.7,
    reviews: 560,
    instructor: 'Jessica Lee',
    progress: 0,
    icon: MegaphoneIcon,
    color: 'from-pink-400 to-rose-500',
    description: 'Learn the basics of digital marketing, including SEO, social media, and content marketing.',
    enrollmentLink: 'https://www.udemy.com/course/digital-marketing-fundamentals',
    modules: [
      { title: 'Digital Marketing Fundamentals', duration: '45 min', completed: false },
      { title: 'SEO Fundamentals', duration: '1 hour', completed: false },
      { title: 'Social Media Marketing Fundamentals', duration: '1.5 hours', completed: false },
      { title: 'Content Marketing Fundamentals', duration: '1 hour', completed: false },
    ]
  },
  {
    id: 8,
    title: 'Social Media Marketing',
    category: 'Digital Marketing',
    level: 'Intermediate',
    duration: '5 weeks',
    enrolled: 2800,
    rating: 4.8,
    reviews: 420,
    instructor: 'Amanda Wilson',
    progress: 75,
    icon: ChatBubbleLeftRightIcon,
    color: 'from-indigo-400 to-blue-500',
    description: 'Master social media marketing strategies for multiple platforms.',
    enrollmentLink: 'https://www.coursera.org/specializations/social-media-marketing',
    modules: [
      { title: 'Social Media Marketing Fundamentals', duration: '1 hour', completed: true },
      { title: 'Facebook Marketing Fundamentals', duration: '2 hours', completed: true },
      { title: 'Instagram Marketing Fundamentals', duration: '1.5 hours', completed: true },
      { title: 'Twitter Marketing Fundamentals', duration: '1 hour', completed: false },
    ]
  },
  {
    id: 9,
    title: 'Content Marketing Strategy',
    category: 'Digital Marketing',
    level: 'Advanced',
    duration: '7 weeks',
    enrolled: 1900,
    rating: 4.6,
    reviews: 380,
    instructor: 'Sophie Brown',
    progress: 30,
    icon: PencilIcon,
    color: 'from-emerald-400 to-green-500',
    description: 'Create effective content marketing strategies and compelling content.',
    enrollmentLink: 'https://www.udemy.com/course/content-marketing-strategy',
    modules: [
      { title: 'Content Marketing Fundamentals', duration: '1 hour', completed: true },
      { title: 'Content Creation Fundamentals', duration: '2 hours', completed: true },
      { title: 'Content Distribution Fundamentals', duration: '1.5 hours', completed: false },
      { title: 'Content Measurement Fundamentals', duration: '1 hour', completed: false },
    ]
  }
];

const categories = ['All', 'STEM', 'Business', 'Digital Marketing'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

function Courses({ searchQuery = '' }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    level: 'All',
    sort: 'popular'
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = courses.filter(course => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      );
    }
    return (
      (filters.category === 'All' || course.category === filters.category) &&
      (filters.level === 'All' || course.level === filters.level)
    );
  }).sort((a, b) => {
    switch (filters.sort) {
      case 'rating':
        return b.rating - a.rating;
      case 'enrolled':
        return b.enrolled - a.enrolled;
      default:
        return b.enrolled - a.enrolled;
    }
  });

  const handleStartCourse = (course) => {
    // Here you would typically integrate with your course management system
    console.log(`Starting course: ${course.title}`);
  };

  const handleVideoPreview = (course) => {
    if (course.previewVideo) {
      setSelectedVideo(course);
      setShowVideoModal(true);
    } else {
      alert('Preview video not available for this course');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Available Courses</h2>
          <p className="text-gray-600 mt-1">Expand your knowledge with our expert-led courses</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
        >
          <FunnelIcon className="h-5 w-5 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <select
              value={filters.level}
              onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sort}
              onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="enrolled">Most Enrolled</option>
            </select>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className={`relative h-48 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
              <course.icon className="w-20 h-20 text-white" />
              {course.isAIGenerated && (
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
                    🤖 AI Preview
                  </span>
                </div>
              )}
              {course.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                  {course.category}
                </span>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-600">{course.rating}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  <span>{course.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  View Details
                </button>
                {course.progress > 0 ? (
                  <button
                    onClick={() => handleVideoPreview(course)}
                    className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    title="Watch Course Preview"
                  >
                    <PlayCircleIcon className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleVideoPreview(course)}
                    className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                    title="Watch Course Preview"
                  >
                    <PlayCircleIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg max-w-3xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Course Details</h2>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className={`w-full h-48 bg-gradient-to-br ${selectedCourse.color} flex items-center justify-center rounded-lg`}>
                  <selectedCourse.icon className="w-20 h-20 text-white" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Instructor</span>
                    <span className="font-medium">{selectedCourse.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium">{selectedCourse.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Enrolled</span>
                    <span className="font-medium">{selectedCourse.enrolled.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 font-medium">
                        {selectedCourse.rating} ({selectedCourse.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Course Modules</h3>
                <div className="space-y-3">
                  {selectedCourse.modules.map((module, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {module.completed ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <LockClosedIcon className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium">{module.title}</p>
                          <p className="text-sm text-gray-500">{module.duration}</p>
                        </div>
                      </div>
                      {module.completed && (
                        <span className="text-sm text-green-500">Completed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <a
                href={selectedCourse.enrollmentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Enroll Now
              </a>
              <button
                onClick={() => setSelectedCourse(null)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters to find more courses.
          </p>
        </div>
      )}

      {/* Video Preview Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
                <div className="flex items-center space-x-2">
                  <p className="text-purple-200 text-sm">Course Preview</p>
                  {selectedVideo.isAIGenerated && (
                    <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
                      🤖 AI Generated
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setSelectedVideo(null);
                }}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Content */}
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={selectedVideo.previewVideo}
                  title={`${selectedVideo.title} Preview`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* AI Video Notice */}
              {selectedVideo.isAIGenerated && (
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">🤖</span>
                    <h4 className="font-semibold text-purple-800">AI-Generated Course Preview</h4>
                  </div>
                  <p className="text-sm text-purple-700">{selectedVideo.aiVideoDescription}</p>
                </div>
              )}

              {/* Course Info Below Video */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Course Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Instructor:</span> {selectedVideo.instructor}</p>
                    <p><span className="font-medium">Duration:</span> {selectedVideo.duration}</p>
                    <p><span className="font-medium">Level:</span> {selectedVideo.level}</p>
                    <p><span className="font-medium">Enrolled:</span> {selectedVideo.enrolled.toLocaleString()} students</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Course Description</h4>
                  <p className="text-sm text-gray-600">{selectedVideo.description}</p>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        window.open(selectedVideo.enrollmentLink, '_blank');
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;