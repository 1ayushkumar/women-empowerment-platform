import React, { useState } from 'react';
import { UserCircleIcon, BuildingStorefrontIcon, ComputerDesktopIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BusinessTools from "./BusinessTools";
import Funding from "./Funding";
import Marketplace from "./Marketplace";
import NetworkingEvents from "./NetworkingEvents";

function Entrepreneurship() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    {
      title: 'Business Tools',
      description: 'Access essential tools and resources to start and grow your business',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      path: 'business-tools'
    },
    {
      title: 'Funding Opportunities',
      description: 'Discover grants, loans, and investment opportunities for women entrepreneurs',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: 'funding'
    },
    {
      title: 'Marketplace',
      description: 'Connect with customers and sell your products in our women-focused marketplace',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      path: 'marketplace'
    },
    {
      title: 'Networking Events',
      description: 'Join events and connect with other women entrepreneurs',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      path: 'networking',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const successStories = [
    {
      name: 'Sarah Chen',
      business: 'EcoStyle Fashion',
      icon: BuildingStorefrontIcon,
      quote: 'The funding and mentorship I received helped me turn my sustainable fashion idea into a thriving business.',
      businessIcon: BuildingStorefrontIcon,
      color: 'from-green-400 to-emerald-500',
      fullStory: `Sarah started with just a sketch and a dream of creating sustainable fashion that doesn't compromise on style. After joining our platform in January 2023, she received $15,000 in seed funding through our WE Fund program and was matched with mentor Lisa Johnson, a serial entrepreneur with 15+ years of experience. Through our business planning tools and mentorship sessions, Sarah learned how to validate her market, source sustainable materials, and build a scalable business model. Within 18 months, her eco-friendly clothing line grew from a single prototype to a $500K annual revenue business, now selling in 12 countries through our marketplace platform.`,
      timeline: [
        { date: 'Jan 2023', event: 'Joined platform with sustainable fashion concept' },
        { date: 'Mar 2023', event: 'Received $15,000 WE Fund grant' },
        { date: 'Apr 2023', event: 'Matched with mentor Lisa Johnson' },
        { date: 'May 2023', event: 'Launched first eco-friendly clothing line' },
        { date: 'Aug 2023', event: 'Expanded to international markets' },
        { date: 'Dec 2023', event: 'Reached $500K annual revenue milestone' },
        { date: 'Mar 2024', event: 'Featured in Forbes 30 Under 30' }
      ],
      achievements: ['$500K annual revenue', 'Selling in 12 countries', '50+ sustainable products', 'Forbes 30 Under 30', '10,000+ satisfied customers'],
      challenges: 'Finding reliable sustainable suppliers, managing international shipping, scaling production while maintaining quality',
      advice: 'Start small and focus on quality over quantity. The mentorship program was invaluable - don\'t be afraid to ask questions and learn from others who\'ve walked this path before.',
      platformResources: ['WE Fund Grant Program', 'Mentorship Matching', 'Business Planning Tools', 'Global Marketplace', 'Networking Events']
    },
    {
      name: 'Maria Rodriguez',
      business: 'Tech Solutions Inc',
      icon: ComputerDesktopIcon,
      quote: 'The business tools and networking events were instrumental in scaling my tech startup.',
      businessIcon: ComputerDesktopIcon,
      color: 'from-blue-400 to-indigo-500',
      fullStory: `Maria came to our platform with a revolutionary idea for AI-powered customer service solutions but lacked the business expertise to scale. Through our comprehensive business tools suite and networking events, she connected with key investors and technical co-founders. Our funding directory helped her secure $250K in Series A funding, while our mentorship program paired her with tech industry veterans. Today, Tech Solutions Inc serves over 100 enterprise clients and has grown to a team of 25 employees, with Maria recently being named Tech Entrepreneur of the Year.`,
      timeline: [
        { date: 'Feb 2023', event: 'Joined platform with AI customer service idea' },
        { date: 'Apr 2023', event: 'Attended first networking event, met co-founder' },
        { date: 'Jun 2023', event: 'Completed business accelerator program' },
        { date: 'Sep 2023', event: 'Secured $250K Series A funding' },
        { date: 'Nov 2023', event: 'Launched beta product with 10 clients' },
        { date: 'Feb 2024', event: 'Scaled to 100+ enterprise clients' },
        { date: 'May 2024', event: 'Named Tech Entrepreneur of the Year' }
      ],
      achievements: ['$250K Series A funding', '100+ enterprise clients', '25 team members', 'Tech Entrepreneur of the Year', '$2M annual recurring revenue'],
      challenges: 'Finding technical co-founders, navigating complex enterprise sales cycles, building a diverse tech team',
      advice: 'Networking is everything in tech. The connections I made through platform events led to my co-founder, first investors, and biggest clients. Don\'t underestimate the power of community.',
      platformResources: ['Networking Events', 'Business Accelerator', 'Funding Directory', 'Mentorship Program', 'Tech Community Forum']
    },
    {
      name: 'Lisa Wong',
      business: 'Organic Beauty Co',
      icon: BuildingStorefrontIcon,
      quote: 'The marketplace platform helped me reach customers globally and grow my organic beauty brand.',
      businessIcon: BuildingStorefrontIcon,
      color: 'from-pink-400 to-rose-500',
      fullStory: `Lisa started Organic Beauty Co from her kitchen, creating natural skincare products for her family. When she discovered our marketplace platform, she had just 5 products and was selling locally at farmers markets. Through our seller onboarding program, she learned digital marketing, international shipping, and customer service best practices. Our marketplace's built-in SEO and global reach helped her products gain visibility worldwide. Within two years, she's expanded to 50+ products, ships to 25 countries, and has built a loyal customer base of over 15,000 beauty enthusiasts who love her commitment to clean, organic ingredients.`,
      timeline: [
        { date: 'Mar 2023', event: 'Joined marketplace with 5 handmade products' },
        { date: 'May 2023', event: 'Completed seller onboarding program' },
        { date: 'Jul 2023', event: 'First international sale to Canada' },
        { date: 'Oct 2023', event: 'Expanded product line to 25 items' },
        { date: 'Jan 2024', event: 'Reached 10,000 customers milestone' },
        { date: 'Apr 2024', event: 'Launched in 25 countries worldwide' },
        { date: 'Jun 2024', event: 'Featured in Organic Beauty Magazine' }
      ],
      achievements: ['50+ organic beauty products', 'Shipping to 25 countries', '15,000+ loyal customers', 'Featured in Organic Beauty Magazine', '$750K annual revenue'],
      challenges: 'Learning digital marketing, managing international regulations for cosmetics, scaling production while maintaining organic standards',
      advice: 'The marketplace platform removed so many barriers for me. Focus on creating amazing products and let the platform handle the technical stuff. The global reach is incredible!',
      platformResources: ['Global Marketplace', 'Seller Onboarding', 'Digital Marketing Tools', 'International Shipping Support', 'Customer Service Training']
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empower Your Entrepreneurial Journey
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Access resources, funding, and support designed specifically for women entrepreneurs.
          </p>
          <button
            onClick={() => scrollToSection('business-tools')}
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {sections.map((section, index) => (
          <div
            key={index}
            onClick={() => scrollToSection(section.path)}
            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
          >
            <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(section.icon, { className: "w-24 h-24 text-purple-600" })}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-600">{section.description}</p>
              <div className="mt-4 text-center">
                <span className="text-purple-600 text-sm font-medium">
                  Click to explore →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        <section id="business-tools" className="scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6">Business Tools</h2>
          <BusinessTools />
        </section>

        <section id="funding" className="scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6">Funding Opportunities</h2>
          <Funding />
        </section>

        <section id="marketplace" className="scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6">Marketplace</h2>
          <Marketplace />
        </section>

        <section id="networking" className="scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6">Networking Events</h2>
          <NetworkingEvents />
        </section>
      </div>

      {/* Success Stories */}
      <section className="mt-16 bg-purple-50 rounded-3xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => {
                setSelectedStory(story);
                setShowStoryModal(true);
              }}
            >
              <div className={`h-48 bg-gradient-to-br ${story.color} flex items-center justify-center`}>
                <story.businessIcon className="w-20 h-20 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center mr-4`}>
                    <UserCircleIcon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{story.name}</h3>
                    <p className="text-purple-600">{story.business}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">&quot;{story.quote}&quot;</p>
                <div className="text-center">
                  <span className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors">
                    Click to read full story →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Story Modal */}
      {showStoryModal && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header with close button */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedStory.color} flex items-center justify-center`}>
                    <UserCircleIcon className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedStory.name}</h2>
                    <p className="text-xl text-purple-600 font-medium">{selectedStory.business}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="w-8 h-8" />
                </button>
              </div>

              {/* Full story content */}
              <div className="space-y-8">
                {/* Her Journey */}
                <section>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Her Journey</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{selectedStory.fullStory}</p>
                </section>

                {/* Timeline */}
                <section>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Timeline</h3>
                  <div className="space-y-4">
                    {selectedStory.timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-3 h-3 bg-purple-600 rounded-full mt-2"></div>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-600">{item.date}</span>
                          <p className="text-gray-700 mt-1">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Key Achievements */}
                <section>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Key Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStory.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Platform Resources Used */}
                <section>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Platform Resources Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStory.platformResources.map((resource, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {resource}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Challenges & Advice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Challenges Faced</h3>
                    <p className="text-gray-700 bg-red-50 p-4 rounded-lg">{selectedStory.challenges}</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Advice for Others</h3>
                    <blockquote className="text-gray-700 bg-blue-50 p-4 rounded-lg italic border-l-4 border-blue-500">
                      "{selectedStory.advice}"
                    </blockquote>
                  </section>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-6 text-white text-center">
                  <h3 className="text-xl font-semibold mb-2">Ready to Start Your Journey?</h3>
                  <p className="mb-4">Join thousands of women entrepreneurs who are building successful businesses with our platform.</p>
                  <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Entrepreneurship;