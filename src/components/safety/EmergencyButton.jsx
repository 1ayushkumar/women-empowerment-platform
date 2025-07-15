import { useState  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSafetyStore from '../../store/safetyStore';

const EmergencyButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);
  const triggerEmergencyAlert = useSafetyStore((state) => state.triggerEmergencyAlert);
  const emergencyContacts = useSafetyStore((state) => state.emergencyContacts);
  const activeEmergency = useSafetyStore((state) => state.activeEmergency);
  const clearEmergencyAlert = useSafetyStore((state) => state.clearEmergencyAlert);

  const handlePressStart = () => {
    setIsPressed(true);
    const timer = setTimeout(() => {
      if (emergencyContacts.length === 0) {
        alert('Please add emergency contacts first!');
        setIsPressed(false);
        return;
      }
      
      triggerEmergencyAlert({
        type: 'SOS',
        message: 'Emergency assistance needed!',
        location: 'Getting location...'
      });
      
      // Simulate sending SMS and making calls
      emergencyContacts.forEach(contact => {
        console.log(`Sending emergency alert to ${contact.name}: ${contact.phone}`);
      });
      
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            triggerEmergencyAlert({
              type: 'SOS',
              message: 'Emergency assistance needed!',
              location: `${position.coords.latitude}, ${position.coords.longitude}`
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    }, 3000); // 3 seconds press to activate
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const handleClearEmergency = () => {
    clearEmergencyAlert();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {activeEmergency && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-red-100 p-4 rounded-lg mb-4 shadow-lg"
          >
            <h3 className="text-red-800 font-semibold mb-2">Emergency Alert Active</h3>
            <p className="text-red-700 text-sm mb-2">
              Location: {activeEmergency.location}
            </p>
            <button
              onClick={handleClearEmergency}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              Clear Emergency
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        animate={{
          scale: isPressed ? 0.95 : 1,
          backgroundColor: isPressed ? '#7f1d1d' : '#dc2626'
        }}
        className="w-16 h-16 rounded-full bg-red-600 text-white shadow-lg flex items-center justify-center focus:outline-none"
        whileHover={{ scale: 1.05 }}
      >
        <span className="sr-only">Emergency Button</span>
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      </motion.button>
      
      {isPressed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-20 right-0 bg-white p-3 rounded-lg shadow-lg whitespace-nowrap"
        >
          Hold for 3 seconds to activate emergency alert
        </motion.div>
      )}
    </div>
  );
};

export default EmergencyButton;