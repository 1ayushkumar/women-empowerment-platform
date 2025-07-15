import { useState  } from 'react';
import Card from '../shared/Card';

const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Google',
    location: 'Remote / Multiple Locations',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '$120,000 - $180,000',
    skills: ['JavaScript', 'React', 'Node.js', 'Cloud Platforms'],
    description: 'Join Google\'s engineering team to build next-generation web applications.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Experience with modern JavaScript frameworks',
      'Strong problem-solving skills',
      'Experience with cloud platforms'
    ],
    postedDate: '2024-01-10',
    applicationLink: 'https://careers.google.com/jobs/results'
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'Microsoft',
    location: 'Hybrid / Multiple Locations',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '$110,000 - $160,000',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Analysis'],
    description: 'Work on cutting-edge machine learning projects at Microsoft.',
    requirements: [
      'Master\'s degree in Data Science, Statistics, or related field',
      'Strong programming skills in Python',
      'Experience with ML frameworks',
      'Knowledge of statistical modeling'
    ],
    postedDate: '2024-01-12',
    applicationLink: 'https://careers.microsoft.com/professionals/us/en/search-results'
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'Amazon',
    location: 'On-site / Seattle',
    type: 'Full-time',
    experience: '4-6 years',
    salary: '$130,000 - $190,000',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Leadership'],
    description: 'Lead product development initiatives at Amazon.',
    requirements: [
      'Bachelor\'s degree required, MBA preferred',
      'Experience in product management',
      'Strong analytical and leadership skills',
      'Technical background preferred'
    ],
    postedDate: '2024-01-15',
    applicationLink: 'https://www.amazon.jobs/en/search'
  },
  {
    id: 4,
    title: 'UX Designer',
    company: 'Apple',
    location: 'Hybrid / Cupertino',
    type: 'Full-time',
    experience: '2-5 years',
    salary: '$100,000 - $150,000',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    description: 'Design intuitive and beautiful user experiences for Apple products.',
    requirements: [
      'Bachelor\'s degree in Design or related field',
      'Strong portfolio of design work',
      'Experience with design tools',
      'Understanding of user-centered design'
    ],
    postedDate: '2024-01-14',
    applicationLink: 'https://www.apple.com/careers/us/'
  }
];

const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Remote'];
const experienceLevels = ['All Levels', 'Entry Level', '1-3 years', '3-5 years', '5+ years'];

function JobListings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedExperience, setSelectedExperience] = useState('All Levels');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All Types' || job.type === selectedType;
    const matchesExperience = selectedExperience === 'All Levels' || job.experience.includes(selectedExperience);
    
    return matchesSearch && matchesType && matchesExperience;
  });

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Find Your Next Opportunity</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search jobs by title, company, or keywords..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-lg text-purple-600">{job.company}</p>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {job.type}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Location:</span>
                  <span className="ml-2 text-gray-600">{job.location}</span>
                </div>
                <div>
                  <span className="font-medium">Experience:</span>
                  <span className="ml-2 text-gray-600">{job.experience}</span>
                </div>
                <div>
                  <span className="font-medium">Salary:</span>
                  <span className="ml-2 text-gray-600">{job.salary}</span>
                </div>
                <div>
                  <span className="font-medium">Posted:</span>
                  <span className="ml-2 text-gray-600">{job.postedDate}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-gray-600">{job.description}</p>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-purple-600 text-white text-center px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </Card>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No jobs match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobListings;
