import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white relative">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Empowering Women Through Technology
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8"
          >
            Join our platform to access education, opportunities, and support for your journey
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-x-4"
          >
            <button 
              onClick={handleGetStarted}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors"
            >
              Get Started
            </button>
            <button 
              onClick={() => setShowLearnMore(true)}
              className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Learn More Modal */}
      {showLearnMore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-gray-800 rounded-xl max-w-3xl max-h-[80vh] overflow-y-auto p-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-purple-600">About Our Project</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  We are dedicated to empowering women through technology, providing a comprehensive platform that addresses various aspects of personal and professional growth.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">How We Help</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>✨ Access to quality education and skill development resources</li>
                  <li>💼 Career guidance and job opportunities</li>
                  <li>🏥 Health and wellness tracking</li>
                  <li>🛡️ Safety resources and emergency support</li>
                  <li>💰 Financial education and opportunities</li>
                  <li>👥 Community support and networking</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">FAQ</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-purple-600">Is this platform free to use?</h4>
                    <p className="text-gray-600">Yes, our basic features are free. Some premium resources may require a subscription.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600">Who can join?</h4>
                    <p className="text-gray-600">While our platform is designed for women, anyone who supports our mission is welcome to join.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600">How do I get started?</h4>
                    <p className="text-gray-600">Simply click the &quot;Get Started&quot; button to create an account and begin your journey.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600">What kind of support is available?</h4>
                    <p className="text-gray-600">We offer mentorship, community support, professional guidance, and access to various resources.</p>
                  </div>
                </div>
              </section>
            </div>

            <button 
              onClick={() => setShowLearnMore(false)}
              className="mt-8 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Hero;