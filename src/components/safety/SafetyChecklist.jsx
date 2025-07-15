import { useState  } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  BellAlertIcon,
  ClipboardDocumentCheckIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

const SafetyChecklist = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const emergencyContacts = [
    { name: 'Police', number: '100' },
    { name: 'Women Helpline', number: '1091' },
    { name: 'Ambulance', number: '102' },
    { name: 'Domestic Violence Helpline', number: '181' },
  ];

  const safetyTips = [
    {
      id: 1,
      title: 'Stay Alert',
      description: 'Always be aware of your surroundings and trust your instincts.',
      icon: BellAlertIcon,
      details: [
        'Avoid distractions like headphones in unfamiliar places',
        'Walk confidently and stay in well-lit areas',
        'Keep your phone charged and easily accessible',
        'Have emergency numbers on speed dial'
      ]
    },
    {
      id: 2,
      title: 'Share Location',
      description: 'Keep trusted contacts informed about your whereabouts.',
      icon: MapPinIcon,
      details: [
        'Share your live location with trusted contacts',
        'Inform someone about your travel plans',
        'Use location sharing apps',
        'Update your contacts when plans change'
      ]
    },
    {
      id: 3,
      title: 'Emergency Preparedness',
      description: 'Have a plan ready for emergency situations.',
      icon: ExclamationTriangleIcon,
      details: [
        'Save emergency contacts on speed dial',
        'Know the safe spots in your area',
        'Keep a personal safety device handy',
        'Learn basic self-defense techniques'
      ]
    }
  ];

  const checklistItems = [
    {
      id: 1,
      text: 'Save emergency numbers',
      icon: PhoneIcon,
    },
    {
      id: 2,
      text: 'Share location with trusted contacts',
      icon: MapPinIcon,
    },
    {
      id: 3,
      text: 'Enable emergency SOS on phone',
      icon: ExclamationTriangleIcon,
    },
    {
      id: 4,
      text: 'Review safety guidelines',
      icon: ClipboardDocumentCheckIcon,
    },
  ];

  const handleEmergencyCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleShareLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            
            if (navigator.share) {
              navigator.share({
                title: 'My Current Location',
                text: 'Here is my current location',
                url: mapsUrl
              });
            } else {
              navigator.clipboard.writeText(mapsUrl).then(() => {
                alert('Location link copied to clipboard!');
              });
            }
          },
          (error) => {
            alert('Error getting location: ' + error.message);
          }
        );
      } else {
        alert('Geolocation is not supported by your browser');
      }
    } catch (error) {
      console.error('Error sharing location:', error);
      alert('Error sharing location. Please try again.');
    }
  };

  const handleCheckItem = (id) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleShowTip = (tip) => {
    setSelectedTip(tip);
    setShowTipsModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Emergency Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 rounded-xl p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
          <ExclamationTriangleIcon className="h-8 w-8 mr-2" />
          Emergency Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts.map((contact) => (
            <motion.button
              key={contact.number}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleEmergencyCall(contact.number)}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-between"
            >
              <div className="flex items-center">
                <PhoneIcon className="h-6 w-6 text-red-600 mr-2" />
                <div>
                  <div className="font-semibold text-gray-900">{contact.name}</div>
                  <div className="text-red-600">{contact.number}</div>
                </div>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Safety Checklist Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 mb-8 shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <ShieldCheckIcon className="h-8 w-8 mr-2 text-purple-600" />
          Safety Checklist
        </h2>
        <div className="space-y-4">
          {checklistItems.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center space-x-4"
              whileHover={{ x: 10 }}
            >
              <input
                type="checkbox"
                checked={checkedItems.has(item.id)}
                onChange={() => handleCheckItem(item.id)}
                className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <item.icon className="h-6 w-6 text-purple-600" />
              <span className="text-gray-700">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Safety Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {safetyTips.map((tip) => (
          <motion.div
            key={tip.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center mb-4">
              <tip.icon className="h-8 w-8 text-purple-600 mr-2" />
              <h3 className="text-xl font-semibold">{tip.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{tip.description}</p>
            <button
              onClick={() => handleShowTip(tip)}
              className="text-purple-600 font-semibold hover:text-purple-800 flex items-center"
            >
              Learn More
              <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-1" />
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Location Sharing Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center"
      >
        <button
          onClick={handleShareLocation}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
        >
          <MapPinIcon className="h-6 w-6 mr-2" />
          Share My Location
        </button>
      </motion.div>

      {/* Safety Tips Modal */}
      {showTipsModal && selectedTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <selectedTip.icon className="h-8 w-8 text-purple-600 mr-2" />
                <h2 className="text-2xl font-bold">{selectedTip.title}</h2>
              </div>
              <button
                onClick={() => setShowTipsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedTip.description}</p>
            <ul className="space-y-2">
              {selectedTip.details.map((detail, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mr-2"></div>
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SafetyChecklist;
