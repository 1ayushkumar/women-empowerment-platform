import { useState  } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  TagIcon,
  VideoCameraIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

function NetworkingEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [eventRegistrationCounts, setEventRegistrationCounts] = useState({});

  const eventTypes = [
    { id: 'all', label: 'All Events' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'conference', label: 'Conferences' },
    { id: 'meetup', label: 'Meetups' },
    { id: 'webinar', label: 'Webinars' }
  ];

  const months = [
    { id: 'all', label: 'All Months' },
    { id: '1', label: 'January' },
    { id: '2', label: 'February' },
    { id: '3', label: 'March' },
    { id: '4', label: 'April' },
    { id: '5', label: 'May' },
    { id: '6', label: 'June' },
    { id: '7', label: 'July' },
    { id: '8', label: 'August' },
    { id: '9', label: 'September' },
    { id: '10', label: 'October' },
    { id: '11', label: 'November' },
    { id: '12', label: 'December' }
  ];

  const events = [
    {
      id: 1,
      title: 'Women in Tech Conference 2024',
      type: 'conference',
      date: '2024-03-15',
      time: '09:00 AM - 05:00 PM',
      location: 'Tech Convention Center',
      address: '123 Innovation Drive, Silicon Valley',
      isVirtual: false,
      organizer: 'Women Tech Network',
      capacity: 500,
      registered: 342,
      description: 'Annual conference featuring keynote speakers, panel discussions, and networking opportunities.',
      topics: ['Technology', 'Leadership', 'Innovation'],
      speakers: [
        'Sarah Johnson - CEO, Tech Innovations',
        'Maria Garcia - CTO, Future Systems',
        'Lisa Chen - Founder, AI Solutions'
      ]
    },
    {
      id: 2,
      title: 'Digital Marketing Masterclass',
      type: 'workshop',
      date: '2024-04-10',
      time: '02:00 PM - 04:00 PM',
      location: 'Virtual',
      isVirtual: true,
      organizer: 'Marketing Experts Guild',
      capacity: 100,
      registered: 67,
      description: 'Learn advanced digital marketing strategies from industry experts.',
      topics: ['Social Media', 'SEO', 'Content Marketing'],
      speakers: [
        'Emma Wilson - Digital Marketing Consultant',
        'John Smith - Social Media Expert'
      ]
    },
    {
      id: 3,
      title: 'Startup Funding Meetup',
      type: 'meetup',
      date: '2024-03-25',
      time: '06:00 PM - 08:00 PM',
      location: 'Innovation Hub',
      address: '456 Startup Avenue, Downtown',
      isVirtual: false,
      organizer: 'Startup Network',
      capacity: 50,
      registered: 38,
      description: 'Connect with investors and learn about funding opportunities.',
      topics: ['Funding', 'Pitching', 'Networking'],
      speakers: [
        'David Brown - Venture Capitalist',
        'Rachel Lee - Angel Investor'
      ]
    },
    {
      id: 4,
      title: 'Business Growth Strategies',
      type: 'webinar',
      date: '2024-04-05',
      time: '11:00 AM - 12:30 PM',
      location: 'Virtual',
      isVirtual: true,
      organizer: 'Business Success Academy',
      capacity: 200,
      registered: 145,
      description: 'Learn proven strategies to scale your business effectively.',
      topics: ['Growth', 'Strategy', 'Management'],
      speakers: [
        'Michael Chang - Business Growth Consultant',
        'Amanda White - Operations Expert'
      ]
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesMonth = selectedMonth === 'all' || new Date(event.date).getMonth() + 1 === parseInt(selectedMonth);
    return matchesSearch && matchesType && matchesMonth;
  });

  // Helper function to get current registration count for an event
  const getCurrentRegistrationCount = (event) => {
    return eventRegistrationCounts[event.id] !== undefined
      ? eventRegistrationCounts[event.id]
      : event.registered;
  };

  const toggleRegistration = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    setRegisteredEvents(prev => {
      const newRegistered = new Set(prev);
      const isCurrentlyRegistered = newRegistered.has(eventId);

      if (isCurrentlyRegistered) {
        // Unregistering
        newRegistered.delete(eventId);
        setEventRegistrationCounts(prevCounts => ({
          ...prevCounts,
          [eventId]: getCurrentRegistrationCount(event) - 1
        }));
      } else {
        // Registering
        newRegistered.add(eventId);
        setEventRegistrationCounts(prevCounts => ({
          ...prevCounts,
          [eventId]: getCurrentRegistrationCount(event) + 1
        }));
      }
      return newRegistered;
    });
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-md space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-1">
            <select
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {eventTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>

            <select
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map(month => (
                <option key={month.id} value={month.id}>{month.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium self-start
                    ${event.isVirtual ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                  `}
                >
                  {event.isVirtual ? (
                    <VideoCameraIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <MapPinIcon className="h-3 w-3 mr-1" />
                  )}
                  {event.isVirtual ? 'Virtual' : 'In-Person'}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{event.description}</p>

              {!event.isVirtual && (
                <div className="flex items-start mb-4">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="ml-2">
                    <p className="text-gray-900 font-medium">{event.location}</p>
                    <p className="text-gray-500">{event.address}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {event.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {topic}
                  </span>
                ))}
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Featured Speakers:</h4>
                <ul className="space-y-1">
                  {event.speakers.map((speaker, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {speaker}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Registration Section - Mobile Optimized */}
              <div className="space-y-3">
                {/* Registration Count and Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      <span className="transition-all duration-300 font-medium">
                        {getCurrentRegistrationCount(event)}
                      </span>
                      {' '} / {event.capacity} registered
                    </span>
                  </div>

                  {registeredEvents.has(event.id) && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full animate-pulse self-start">
                      You're registered!
                    </span>
                  )}
                </div>

                {/* Registration Button */}
                <button
                  className={`
                    w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium
                    ${
                      registeredEvents.has(event.id)
                        ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                    }
                  `}
                  onClick={() => toggleRegistration(event.id)}
                >
                  {registeredEvents.has(event.id) ? (
                    <>
                      <CheckCircleIcon className="h-5 w-5" />
                      <span>Unregister</span>
                    </>
                  ) : (
                    <>
                      <UserGroupIcon className="h-5 w-5" />
                      <span>Register Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No events match your criteria.</p>
        </div>
      )}

      {/* Host Event Section */}
      <div className="bg-purple-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Want to Host an Event?</h3>
        <p className="text-gray-600 mb-4">
          Share your expertise and connect with other entrepreneurs by hosting your own event.
          We provide the platform and support to make your event successful.
        </p>
        <button
          className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          onClick={() => {
            // Handle event hosting
            console.log('Starting event hosting process');
          }}
        >
          Host an Event
        </button>
      </div>
    </div>
  );
}

export default NetworkingEvents;
