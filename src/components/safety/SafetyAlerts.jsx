import { useState, useEffect  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSafetyStore from '../../store/safetyStore';

const SafetyAlerts = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const safetyAlerts = useSafetyStore((state) => state.safetyAlerts);
  const addSafetyAlert = useSafetyStore((state) => state.addSafetyAlert);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission().then(function(permission) {
        setShowNotification(permission === 'granted');
      });
    }
  }, []);

  const handleNewAlert = (type) => {
    const alert = {
      type,
      timestamp: new Date().toISOString(),
      location: currentLocation 
        ? `${currentLocation.latitude}, ${currentLocation.longitude}`
        : 'Location unavailable',
      status: 'active'
    };

    addSafetyAlert(alert);

    if (showNotification) {
      new Notification('Safety Alert', {
        body: `New ${type} alert created`,
        icon: '/path-to-your-icon.png' // Add your icon path
      });
    }
  };

  const alertTypes = [
    {
      type: 'Harassment',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      type: 'Unsafe Area',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      type: 'Medical',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Safety Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alertTypes.map(({ type, icon }) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNewAlert(type)}
              className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span className="text-purple-600">{icon}</span>
              <span className="font-medium">{type}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Alerts</h3>
        <AnimatePresence>
          {safetyAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-2">
                    {alert.type}
                  </span>
                  <p className="text-sm text-gray-600">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Location: {alert.location}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  alert.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {alert.status}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {safetyAlerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">No alerts to display</p>
          </motion.div>
        )}
      </div>

      {!showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-yellow-50 p-4 rounded-lg"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Notifications are disabled
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                Enable notifications to receive alerts about safety incidents in your area.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SafetyAlerts;
