import { useState, useEffect  } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  BellIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import EmergencyContacts from './EmergencyContacts';
import SafetyChecklist from './SafetyChecklist';
import SafetyAlerts from './SafetyAlerts';
import LocationSharing from './LocationSharing';

function Safety() {
  const [activeTab, setActiveTab] = useState('alerts');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set active tab based on URL if present
    const tabFromUrl = location.pathname.split('/').pop();
    if (tabFromUrl && ['alerts', 'contacts', 'location', 'checklist'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [location]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/safety/${tabId}`);
  };

  const tabs = [
    {
      id: 'alerts',
      name: 'Safety Alerts',
      icon: BellIcon,
      component: SafetyAlerts
    },
    {
      id: 'contacts',
      name: 'Emergency Contacts',
      icon: UserGroupIcon,
      component: EmergencyContacts
    },
    {
      id: 'location',
      name: 'Share Location',
      icon: ClockIcon,
      component: LocationSharing
    },
    {
      id: 'checklist',
      name: 'Safety Checklist',
      icon: ClipboardDocumentCheckIcon,
      component: SafetyChecklist
    }
  ];

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-3 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
              <ShieldCheckIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2" />
              <span className="hidden sm:inline">Safety Center</span>
              <span className="sm:hidden">Safety</span>
            </h1>
          </div>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap gap-2 sm:gap-0 sm:space-x-8 overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      group inline-flex items-center py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap
                      ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        -ml-0.5 mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5
                        ${
                          activeTab === tab.id
                            ? 'text-blue-500'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }
                      `}
                    />
                    <span className="hidden sm:inline">{tab.name}</span>
                    <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-6">
            {tabs.map(tab => {
              const Component = tab.component;
              return (
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Component />
                  </motion.div>
                )
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Safety;