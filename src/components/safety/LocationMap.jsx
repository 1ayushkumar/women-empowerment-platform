import { useEffect, useState  } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMap({ onClose }) {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    // Initialize map
    const mapInstance = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ' OpenStreetMap contributors'
    }).addTo(mapInstance);
    setMap(mapInstance);

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        mapInstance.setView([latitude, longitude], 13);

        // Add user marker
        L.marker([latitude, longitude]).addTo(mapInstance)
          .bindPopup('Your Location')
          .openPopup();

        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location. Please enable location services.');
        setLoading(false);
      }
    );

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Search for locations using OpenStreetMap Nominatim API
  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('Error searching for location. Please try again.');
    }
    setSearching(false);
  };

  // Update route when destination is selected
  const selectDestination = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    // Remove previous destination marker and route if they exist
    if (routingControl) {
      map.removeControl(routingControl);
    }

    // Add destination marker
    L.marker([lat, lon]).addTo(map)
      .bindPopup(result.display_name);

    // Create new route
    const newRoutingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(lat, lon)
      ],
      lineOptions: {
        styles: [{ color: '#6366f1', weight: 4 }]
      },
      createMarker: function() { return null; }
    }).addTo(map);

    setRoutingControl(newRoutingControl);
    setSelectedDestination(result);
    setSearchResults([]);
    setSearchQuery('');

    // Fit map to show both points
    const bounds = L.latLngBounds([userLocation, [lat, lon]]);
    map.fitBounds(bounds, { padding: [50, 50] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Share Location</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Search Box */}
        <div className="p-4 border-b relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
              placeholder="Search for destination..."
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={searchLocation}
              disabled={searching}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results - Positioned relative to search box container */}
          {searchResults.length > 0 && (
            <div className="absolute left-4 right-4 z-[1000] mt-2 bg-white rounded-lg shadow-lg border max-h-48 overflow-y-auto">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => selectDestination(result)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  {result.display_name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="text-red-500 text-center p-4">{error}</div>
            </div>
          )}

          <div id="map" className="h-[60vh] w-full"></div>
        </div>

        <div className="p-4 bg-gray-50 rounded-b-lg">
          {selectedDestination ? (
            <p className="text-sm text-gray-600">
              Route calculated to: {selectedDestination.display_name}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Search for a destination to calculate the route from your current location.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default LocationMap;
