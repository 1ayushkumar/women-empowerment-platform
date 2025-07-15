import Card from '../shared/Card';

const programs = [
  {
    id: 1,
    name: 'Women Entrepreneurs Grow Global',
    description: 'A comprehensive program helping women entrepreneurs scale their businesses globally.',
    duration: '6 months',
    type: 'Virtual',
    benefits: [
      'Global market access strategies',
      'International business mentorship',
      'Networking opportunities',
      'Access to funding resources'
    ],
    deadline: '2024-03-31',
    applicationLink: 'https://www.womenentrepreneursgrowglobal.org/apply'
  },
  {
    id: 2,
    name: 'Goldman Sachs 10,000 Women',
    description: 'Business and management education program for women entrepreneurs.',
    duration: '3 months',
    type: 'Online',
    benefits: [
      'Business education',
      'Mentoring',
      'Networking',
      'Access to capital'
    ],
    deadline: '2024-04-15',
    applicationLink: 'https://www.goldmansachs.com/citizenship/10000women/'
  },
  {
    id: 3,
    name: 'WE Hub Incubation Program',
    description: 'First state-led incubator for women entrepreneurs.',
    duration: '12 months',
    type: 'Hybrid',
    benefits: [
      'Seed funding',
      'Mentorship',
      'Market access',
      'Infrastructure support'
    ],
    deadline: '2024-05-01',
    applicationLink: 'https://wehub.telangana.gov.in/apply'
  },
  {
    id: 4,
    name: 'Cartier Women\'s Initiative',
    description: 'International entrepreneurship program supporting women-led businesses.',
    duration: 'Annual Program',
    type: 'Global',
    benefits: [
      'Financial support up to $100,000',
      'Business coaching',
      'Global exposure',
      'Network access'
    ],
    deadline: '2024-06-30',
    applicationLink: 'https://www.cartierwomensinitiative.com/apply'
  }
];

function Programs() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Entrepreneurship Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <Card key={program.id}>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{program.name}</h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Duration:</span> {program.duration}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {program.type}
                </div>
                <div>
                  <span className="font-medium">Deadline:</span> {program.deadline}
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-600">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={program.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block w-full bg-purple-600 text-white text-center px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Programs;
