import Card from '../shared/Card';

const programs = [
  {
    id: 1,
    title: 'Women in Tech Leadership Program',
    provider: 'Women Who Code',
    duration: '12 weeks',
    format: 'Online / Self-paced',
    price: '$999',
    topics: [
      'Leadership Skills',
      'Technical Management',
      'Team Building',
      'Strategic Planning'
    ],
    benefits: [
      'Industry mentor matching',
      'Leadership workshops',
      'Network with tech leaders',
      'Career advancement strategies'
    ],
    startDate: '2024-02-15',
    enrollmentLink: 'https://www.womenwhocode.com/leadership'
  },
  {
    id: 2,
    title: 'Professional Certificate in Project Management',
    provider: 'PMI (Project Management Institute)',
    duration: '6 months',
    format: 'Online / Instructor-led',
    price: '$699',
    topics: [
      'Project Planning',
      'Risk Management',
      'Agile Methodologies',
      'Stakeholder Management'
    ],
    benefits: [
      'PMI certification prep',
      'Real-world projects',
      'Expert instruction',
      'Professional network access'
    ],
    startDate: '2024-03-01',
    enrollmentLink: 'https://www.pmi.org/certifications'
  },
  {
    id: 3,
    title: 'Data Science Career Track',
    provider: 'Springboard',
    duration: '6 months',
    format: 'Online / Mentored',
    price: '$1,499',
    topics: [
      'Python Programming',
      'Machine Learning',
      'Data Visualization',
      'Statistical Analysis'
    ],
    benefits: [
      'Job guarantee',
      '1-on-1 mentorship',
      'Career coaching',
      'Industry projects'
    ],
    startDate: '2024-02-01',
    enrollmentLink: 'https://www.springboard.com/courses/data-science-career-track/'
  },
  {
    id: 4,
    title: 'Executive Leadership for Women',
    provider: 'Harvard Business School Online',
    duration: '8 weeks',
    format: 'Online / Cohort-based',
    price: '$1,750',
    topics: [
      'Executive Presence',
      'Strategic Decision Making',
      'Negotiation Skills',
      'Change Management'
    ],
    benefits: [
      'Harvard faculty insights',
      'Executive network',
      'Case study learning',
      'Leadership assessment'
    ],
    startDate: '2024-03-15',
    enrollmentLink: 'https://online.hbs.edu/courses/'
  }
];

function ProfessionalDevelopment() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Professional Development Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Card key={program.id}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{program.title}</h3>
                  <p className="text-purple-600">{program.provider}</p>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {program.format}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-medium">Duration:</span>
                  <span className="ml-2 text-gray-600">{program.duration}</span>
                </div>
                <div>
                  <span className="font-medium">Price:</span>
                  <span className="ml-2 text-gray-600">{program.price}</span>
                </div>
                <div>
                  <span className="font-medium">Start Date:</span>
                  <span className="ml-2 text-gray-600">{program.startDate}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Topics Covered:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {program.topics.map((topic, index) => (
                      <li key={index} className="text-gray-600">{topic}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Program Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-600">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={program.enrollmentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-purple-600 text-white text-center px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProfessionalDevelopment;
