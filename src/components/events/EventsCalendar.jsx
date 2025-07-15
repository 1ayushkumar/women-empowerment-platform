import { useState  } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const events = [
  {
    id: 1,
    title: "Women in Tech Summit",
    date: new Date(2024, 1, 15),
    time: "10:00 AM - 4:00 PM",
    type: "Conference",
    format: "Virtual",
    description: "Annual summit featuring keynote speakers from leading tech companies.",
    speakers: ["Sarah Johnson - Google", "Emily Chen - Microsoft"],
    price: "Free",
    registrationLink: "https://example.com/register",
    image: "https://example.com/event-image.jpg"
  },
  {
    id: 2,
    title: "Leadership Workshop Series",
    date: new Date(2024, 1, 20),
    time: "2:00 PM - 4:00 PM",
    type: "Workshop",
    format: "Hybrid",
    description: "Interactive workshop on developing leadership skills.",
    speakers: ["Maria Garcia - Leadership Coach"],
    price: "$49",
    registrationLink: "https://example.com/register",
    image: "https://example.com/event-image.jpg"
  },
  // Add more events
];

const eventTypes = ["All", "Conference", "Workshop", "Networking", "Webinar"];

function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEventDetails, setShowEventDetails] = useState(null);

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === "All" || event.type === selectedType;
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const eventsOnSelectedDate = events.filter(event => 
    event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Virtual Events</h2>
        <p className="text-lg text-gray-600">Join our upcoming events and grow your network</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={({ date }) => {
                if (events.some(event => event.date.toDateString() === date.toDateString())) {
                  return 'has-event';
                }
              }}
              className="w-full"
            />
          </div>

          {eventsOnSelectedDate.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Events on {selectedDate.toLocaleDateString()}
              </h3>
              <ul className="space-y-4">
                {eventsOnSelectedDate.map(event => (
                  <li key={event.id} className="text-gray-700">
                    <span className="font-medium">{event.time}</span>
                    <br />
                    {event.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Events List */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search events..."
              className="flex-1 p-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="p-2 border rounded-md"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-6">
            {filteredEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <span>{event.date.toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                      {event.type}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{event.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Speakers:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {event.speakers.map((speaker, index) => (
                        <li key={index}>{speaker}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">
                      <span className="font-semibold">Format:</span> {event.format}
                      <span className="mx-2">•</span>
                      <span className="font-semibold">Price:</span> {event.price}
                    </div>
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsCalendar;
