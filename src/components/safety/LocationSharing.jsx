import { useState, useEffect  } from 'react';

function LocationSharing() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
      setNewContact({ name: '', phone: '' });
    }
  };

  const handleRemoveContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
  };

  const handleContactSelection = (id) => {
    setSelectedContacts(prev => 
      prev.includes(id) 
        ? prev.filter(contactId => contactId !== id)
        : [...prev, id]
    );
  };

  const handleViewLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      
      if (permissionStatus.state === 'denied') {
        setError(
          <div>
            <p>Location access is blocked. To enable:</p>
            <ol className="list-decimal list-inside mt-2">
              <li>Click the lock/info icon in your browser's address bar</li>
              <li>Find "Location" or "Site Settings"</li>
              <li>Change the permission to "Allow"</li>
              <li>Refresh the page and try again</li>
            </ol>
          </div>
        );
        setIsLoading(false);
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=17`;
            window.open(mapsUrl, '_blank');
            setIsLoading(false);
          },
          (err) => {
            let errorMessage = 'Error accessing location: ';
            switch (err.code) {
              case err.PERMISSION_DENIED:
                errorMessage += 'Please allow location access in your browser settings.';
                break;
              case err.POSITION_UNAVAILABLE:
                errorMessage += 'Location information is unavailable.';
                break;
              case err.TIMEOUT:
                errorMessage += 'Location request timed out.';
                break;
              default:
                errorMessage += err.message;
            }
            setError(errorMessage);
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        setError('Geolocation is not supported by your browser');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleShareLocation = async () => {
    if (selectedContacts.length === 0) {
      setError('Please select at least one contact to share your location with.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=17`;
            
            // Get selected contacts' details
            const selectedContactDetails = contacts.filter(contact => 
              selectedContacts.includes(contact.id)
            );

            // Create message with location
            const message = `Emergency Location Share:%0A${mapsUrl}`;
            
            // Open default SMS app for each selected contact
            selectedContactDetails.forEach(contact => {
              window.open(`sms:${contact.phone}?body=${message}`, '_blank');
            });

            setIsLoading(false);
          },
          (err) => {
            setError('Error accessing location: ' + err.message);
            setIsLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Share Your Location</h2>
            <p className="text-gray-600 mt-2">
              Add emergency contacts and share your location with them
            </p>
          </div>

          {/* Contact Management Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
            
            {/* Add Contact Form */}
            <form onSubmit={handleAddContact} className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  Add Contact
                </button>
              </div>
            </form>

            {/* Contacts List */}
            <div className="space-y-3">
              {contacts.map(contact => (
                <div key={contact.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-3 rounded-md space-y-2 sm:space-y-0">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => handleContactSelection(contact.id)}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                    <div>
                      <p className="font-medium text-sm sm:text-base">{contact.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{contact.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="text-red-600 hover:text-red-800 text-sm self-start sm:self-center"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Location Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={handleViewLocation}
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md transition-colors shadow-md ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Getting Location...' : 'View Live Location'}
            </button>

            <button
              onClick={handleShareLocation}
              disabled={isLoading || selectedContacts.length === 0}
              className={`w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-md transition-colors shadow-md ${
                isLoading || selectedContacts.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-purple-700'
              }`}
            >
              <span className="hidden sm:inline">Share Location with Contacts</span>
              <span className="sm:hidden">Share Location</span>
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md text-left">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationSharing;
