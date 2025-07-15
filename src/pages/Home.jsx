import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Empowering Women Through
          <span className="text-purple-600"> Opportunities</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Access resources, opportunities, and support in education, entrepreneurship, employment, and more.
        </p>
        <div className="mt-10">
          <Link
            to="/education"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-md font-medium hover:bg-purple-700 mr-4"
          >
            Explore Education
          </Link>
          <Link
            to="/employment"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-md font-medium border border-purple-600 hover:bg-purple-50"
          >
            Find Opportunities
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/education"
          className="block group"
        >
          <div className="relative rounded-lg overflow-hidden bg-white shadow-lg transform transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">Education</h3>
              <p className="mt-2 text-gray-500">Access courses, mentorship, and scholarships to advance your learning journey.</p>
            </div>
          </div>
        </Link>

        <Link
          to="/entrepreneurship"
          className="block group"
        >
          <div className="relative rounded-lg overflow-hidden bg-white shadow-lg transform transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">Entrepreneurship</h3>
              <p className="mt-2 text-gray-500">Discover resources and support to start and grow your business.</p>
            </div>
          </div>
        </Link>

        <Link
          to="/employment"
          className="block group"
        >
          <div className="relative rounded-lg overflow-hidden bg-white shadow-lg transform transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">Employment</h3>
              <p className="mt-2 text-gray-500">Find job opportunities and resources for career development.</p>
            </div>
          </div>
        </Link>

        <Link
          to="/health"
          className="block group"
        >
          <div className="relative rounded-lg overflow-hidden bg-white shadow-lg transform transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">Health</h3>
              <p className="mt-2 text-gray-500">Access resources for physical and mental well-being.</p>
            </div>
          </div>
        </Link>

        <Link
          to="/safety"
          className="block group"
        >
          <div className="relative rounded-lg overflow-hidden bg-white shadow-lg transform transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">Safety</h3>
              <p className="mt-2 text-gray-500">Find information and tools to ensure your personal safety.</p>
            </div>
          </div>
        </Link>

        <Link
          to="/finance"
          className="block group"
        >
          <div className="relative rounded-lg overflow-hidden bg-white shadow-lg transform transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">Finance</h3>
              <p className="mt-2 text-gray-500">Learn about financial management and investment opportunities.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
