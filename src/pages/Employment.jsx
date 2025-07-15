import { useState  } from 'react';
import JobListings from '../components/employment/JobListings';
import CareerResources from '../components/employment/CareerResources';
import ProfessionalDevelopment from '../components/employment/ProfessionalDevelopment';

function Employment() {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Employment & Career Development</h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8 border-b">
        <button
          className={`pb-2 px-4 ${
            activeTab === 'jobs'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('jobs')}
        >
          Job Opportunities
        </button>
        <button
          className={`pb-2 px-4 ${
            activeTab === 'resources'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('resources')}
        >
          Career Resources
        </button>
        <button
          className={`pb-2 px-4 ${
            activeTab === 'development'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('development')}
        >
          Professional Development
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'jobs' && <JobListings />}
        {activeTab === 'resources' && <CareerResources />}
        {activeTab === 'development' && <ProfessionalDevelopment />}
      </div>
    </div>
  );
}

export default Employment;
