import { Link } from 'react-router-dom';
import JobPortal from "./JobPortal";
import CareerGuidance from "./CareerGuidance";
import WorkplaceSupport from "./WorkplaceSupport";

function Employment() {
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  const features = [
    {
      title: 'Job Portal',
      description: 'Find opportunities at women-friendly workplaces',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      path: '#job-portal'
    },
    {
      title: 'Career Guidance',
      description: 'Access mentorship and skill development resources',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      path: '#career-guidance'
    },
    {
      title: 'Workplace Support',
      description: 'Get help with workplace challenges and rights',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      path: '#workplace-support'
    }
  ];

  const stats = [
    { label: 'Job Opportunities', value: '10,000+' },
    { label: 'Career Mentors', value: '500+' },
    { label: 'Companies', value: '1,000+' },
    { label: 'Success Stories', value: '5,000+' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 mb-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Career
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Discover opportunities, grow professionally, and thrive in women-friendly workplaces.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('#job-portal')}
              className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Find Jobs
            </button>
            <button
              onClick={() => scrollToSection('#career-guidance')}
              className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Get Career Advice
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => scrollToSection(feature.path)}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        <section id="job-portal">
          <h2 className="text-3xl font-bold mb-6">Job Portal</h2>
          <JobPortal />
        </section>

        <section id="career-guidance">
          <h2 className="text-3xl font-bold mb-6">Career Guidance</h2>
          <CareerGuidance />
        </section>

        <section id="workplace-support">
          <h2 className="text-3xl font-bold mb-6">Workplace Support</h2>
          <WorkplaceSupport />
        </section>
      </div>

      {/* Featured Companies */}
      <section className="mt-16 bg-purple-50 rounded-3xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Companies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'Tech Corp', color: 'from-blue-500 to-indigo-600' },
            { name: 'Innovation Inc', color: 'from-green-500 to-emerald-600' },
            { name: 'Future Systems', color: 'from-purple-500 to-violet-600' },
            { name: 'Global Solutions', color: 'from-orange-500 to-red-600' },
          ].map((company, index) => (
            <div key={index} className="bg-white rounded-lg p-6 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <div className={`bg-gradient-to-r ${company.color} text-white px-4 py-2 rounded-lg font-semibold text-center`}>
                {company.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-16 bg-purple-600 rounded-3xl p-8 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Get the latest job opportunities and career advice delivered to your inbox.</p>
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Employment;