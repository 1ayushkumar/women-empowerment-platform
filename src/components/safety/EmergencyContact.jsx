import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

function EmergencyContact({ onClose }) {
  const emergencyContacts = [
    {
      name: 'Police Emergency',
      phone: '100',
      email: 'police@emergency.com'
    },
    {
      name: 'Women Helpline',
      phone: '1091',
      email: 'help@womenhelpline.com'
    },
    {
      name: 'Ambulance',
      phone: '102',
      email: 'ambulance@emergency.com'
    }
  ];

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}?subject=Emergency%20Assistance%20Required`;
  };

  const handleMessage = (phoneNumber) => {
    window.location.href = `sms:${phoneNumber}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4"
    >
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="p-3 sm:p-4 border-b flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold">Emergency Contacts</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 sm:p-4 space-y-3"
            >
              <h3 className="font-semibold text-base sm:text-lg">{contact.name}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleCall(contact.phone)}
                  className="flex items-center justify-center p-2.5 sm:p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                  <span className="text-sm sm:text-base">Call {contact.phone}</span>
                </button>

                <button
                  onClick={() => handleMessage(contact.phone)}
                  className="flex items-center justify-center p-2.5 sm:p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <ChatBubbleLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                  <span className="text-sm sm:text-base">SMS</span>
                </button>

                <button
                  onClick={() => handleEmail(contact.email)}
                  className="flex items-center justify-center p-2.5 sm:p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                  <span className="text-sm sm:text-base">Email</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600">
            In case of emergency, please contact the nearest emergency service immediately.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default EmergencyContact;
