import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import AuthModal from './auth/AuthModal';

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Close dropdown when clicking outside and handle mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Function to check if a link is active
  const isActiveLink = (path) => {
    return location.pathname.startsWith(path);
  };

  // Function to get link classes with active state
  const getLinkClasses = (path) => {
    const baseClasses = "text-xs whitespace-nowrap px-2 py-1.5 rounded-md transition-colors duration-200 font-medium";
    const activeClasses = "bg-purple-800 text-white font-semibold";
    const inactiveClasses = "hover:text-purple-200 hover:bg-purple-600";

    return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
  };

  // Function to get mobile link classes with active state
  const getMobileLinkClasses = (path) => {
    const baseClasses = "block text-sm px-4 py-2 transition-colors duration-200";
    const activeClasses = "bg-purple-800 text-white font-semibold";
    const inactiveClasses = "hover:bg-purple-600";

    return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setShowUserDropdown(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowUserDropdown(false);
    }, 150); // Small delay to prevent accidental closing
  };

  return (
    <nav className="bg-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="text-lg font-bold">
              Women&apos;s Empowerment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-purple-200 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1 lg:ml-4">
            <div className="flex items-center justify-start gap-x-1 flex-1 px-2 overflow-x-auto scrollbar-hide">
              {isAuthenticated && (
                <>
                  <Link to="/home" className={getLinkClasses('/home')}>
                    Home
                  </Link>
                  <Link to="/education" className={getLinkClasses('/education')}>
                    Education
                  </Link>
                  <Link to="/entrepreneurship" className={getLinkClasses('/entrepreneurship')}>
                    Entrepreneurship
                  </Link>
                  <Link to="/employment" className={getLinkClasses('/employment')}>
                    Employment
                  </Link>
                  <Link to="/health" className={getLinkClasses('/health')}>
                    Health
                  </Link>
                  <Link to="/safety" className={getLinkClasses('/safety')}>
                    Safety
                  </Link>
                  <Link to="/finance" className={getLinkClasses('/finance')}>
                    Finance
                  </Link>
                  <Link to="/mentorship" className={getLinkClasses('/mentorship')}>
                    Mentorship
                  </Link>
                  <Link to="/community" className={getLinkClasses('/community')}>
                    Community
                  </Link>
                  <Link to="/events" className={getLinkClasses('/events')}>
                    Events
                  </Link>
                </>
              )}
            </div>

            {/* Auth Section */}
            <div className="flex items-center shrink-0 ml-4">
              {isAuthenticated ? (
                <div
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-1 text-xs hover:text-purple-200 py-1.5 px-2 rounded-md hover:bg-purple-600 transition-colors duration-150"
                  >
                    <span className="truncate max-w-[100px]">{user?.email}</span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showUserDropdown && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <span className="block truncate font-medium">{user?.email}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-150 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-xs bg-white text-purple-700 px-2 py-1.5 rounded-md hover:bg-purple-100 transition-colors duration-150"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="text-xs bg-purple-600 text-white px-2 py-1.5 rounded-md hover:bg-purple-500 border border-white transition-colors duration-150"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
              onClick={handleMobileNavClick}
            ></div>
            <div className="lg:hidden py-2 space-y-1 animate-in slide-in-from-top-2 duration-200 relative z-50 bg-purple-700">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 border-b border-purple-600">
                  <div className="flex items-center">
                    <span className="text-sm text-purple-200 truncate">{user?.email}</span>
                  </div>
                </div>
                <Link to="/home" className={getMobileLinkClasses('/home')} onClick={handleMobileNavClick}>
                  Home
                </Link>
                <Link to="/education" className={getMobileLinkClasses('/education')} onClick={handleMobileNavClick}>
                  Education
                </Link>
                <Link to="/entrepreneurship" className={getMobileLinkClasses('/entrepreneurship')} onClick={handleMobileNavClick}>
                  Entrepreneurship
                </Link>
                <Link to="/employment" className={getMobileLinkClasses('/employment')} onClick={handleMobileNavClick}>
                  Employment
                </Link>
                <Link to="/health" className={getMobileLinkClasses('/health')} onClick={handleMobileNavClick}>
                  Health
                </Link>
                <Link to="/safety" className={getMobileLinkClasses('/safety')} onClick={handleMobileNavClick}>
                  Safety
                </Link>
                <Link to="/finance" className={getMobileLinkClasses('/finance')} onClick={handleMobileNavClick}>
                  Finance
                </Link>
                <Link to="/mentorship" className={getMobileLinkClasses('/mentorship')} onClick={handleMobileNavClick}>
                  Mentorship
                </Link>
                <Link to="/community" className={getMobileLinkClasses('/community')} onClick={handleMobileNavClick}>
                  Community
                </Link>
                <Link to="/events" className={getMobileLinkClasses('/events')} onClick={handleMobileNavClick}>
                  Events
                </Link>
                <div className="px-4 py-2 border-t border-purple-600 mt-2">
                  <button
                    onClick={() => {
                      handleMobileNavClick();
                      handleLogout();
                    }}
                    className="w-full text-sm bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-purple-100 transition-colors duration-150"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2 space-y-2">
                <button
                  onClick={() => {
                    handleMobileNavClick();
                    openAuthModal('login');
                  }}
                  className="block w-full text-sm bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-purple-100 text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleMobileNavClick();
                    openAuthModal('register');
                  }}
                  className="block w-full text-sm bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 border border-white text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
          </>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </nav>
  );
}

export default Navbar;