import { useState  } from 'react';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  UserGroupIcon,
  VideoCameraIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const CareerGuidance = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    topic: '',
    message: '',
  });

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Tech Leadership Coach',
      expertise: ['Career Transitions', 'Leadership Development', 'Tech Industry'],
      experience: '15+ years',
      rating: 4.9,
      reviews: 128,
      avatar: 'SJ',
      avatarColor: 'bg-blue-500',
      availability: ['Monday', 'Wednesday', 'Friday'],
    },
    {
      id: 2,
      name: 'Prof. Maria Garcia',
      title: 'Business Strategy Consultant',
      expertise: ['Entrepreneurship', 'Business Planning', 'Marketing'],
      experience: '12+ years',
      rating: 4.8,
      reviews: 95,
      avatar: 'MG',
      avatarColor: 'bg-purple-500',
      availability: ['Tuesday', 'Thursday', 'Saturday'],
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      title: 'Healthcare Career Advisor',
      expertise: ['Healthcare Management', 'Clinical Leadership', 'Career Planning'],
      experience: '10+ years',
      rating: 4.7,
      reviews: 82,
      avatar: 'EC',
      avatarColor: 'bg-teal-500',
      availability: ['Monday', 'Tuesday', 'Thursday'],
    },
  ];

  const workshops = [
    {
      id: 1,
      title: 'Leadership Skills for Women in Tech',
      instructor: 'Dr. Sarah Johnson',
      date: '2025-01-15',
      time: '10:00 AM - 12:00 PM',
      type: 'Online',
      capacity: 30,
      enrolled: 18,
    },
    {
      id: 2,
      title: 'Building Your Personal Brand',
      instructor: 'Prof. Maria Garcia',
      date: '2025-01-20',
      time: '2:00 PM - 4:00 PM',
      type: 'Online',
      capacity: 25,
      enrolled: 20,
    },
    {
      id: 3,
      title: 'Negotiation Skills Workshop',
      instructor: 'Dr. Emily Chen',
      date: '2025-01-25',
      time: '11:00 AM - 1:00 PM',
      type: 'Online',
      capacity: 35,
      enrolled: 25,
    },
  ];

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    alert(`Session booked with ${selectedMentor.name} for ${bookingData.date} at ${bookingData.time}`);
    setShowBookingForm(false);
    setBookingData({
      date: '',
      time: '',
      topic: '',
      message: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkshopEnroll = (workshop) => {
    // Here you would typically handle workshop enrollment
    alert(`Successfully enrolled in "${workshop.title}" workshop!`);
  };

  return (
    <div className="space-y-12">
      {/* Mentors Section */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Career Mentors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map(mentor => (
            <motion.div
              key={mentor.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`h-16 w-16 rounded-full ${mentor.avatarColor} flex items-center justify-center mr-4 border-2 border-white shadow-md`}>
                    {mentor.avatar ? (
                      <span className="text-white font-semibold text-lg select-none">{mentor.avatar}</span>
                    ) : (
                      <UserCircleIcon className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{mentor.name}</h4>
                    <p className="text-gray-600">{mentor.title}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    {mentor.experience} experience
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <AcademicCapIcon className="h-5 w-5 mr-2" />
                    {mentor.expertise.join(', ')}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <span className="font-semibold text-purple-600">{mentor.rating}</span>
                    <span className="text-gray-500"> ({mentor.reviews} reviews)</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Available: {mentor.availability.join(', ')}
                  </div>
                </div>
                <button
                  onClick={() => handleBookSession(mentor)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Book Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workshops Section */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Upcoming Workshops</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map(workshop => (
            <motion.div
              key={workshop.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2">{workshop.title}</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    {workshop.instructor}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {new Date(workshop.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    {workshop.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <VideoCameraIcon className="h-5 w-5 mr-2" />
                    {workshop.type}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">
                    {workshop.enrolled} / {workshop.capacity} spots filled
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(workshop.enrolled / workshop.capacity) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleWorkshopEnroll(workshop)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  disabled={workshop.enrolled >= workshop.capacity}
                >
                  {workshop.enrolled >= workshop.capacity ? 'Fully Booked' : 'Enroll Now'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Book a Session</h2>
                <p className="text-gray-600">with {selectedMentor.name}</p>
              </div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={bookingData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={bookingData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic for Discussion
                </label>
                <input
                  type="text"
                  name="topic"
                  required
                  value={bookingData.topic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={bookingData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Book Session
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;
