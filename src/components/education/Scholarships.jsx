import Card from '../shared/Card';

const scholarships = [
  {
    name: 'Women in Tech Scholarship',
    amount: '$5,000',
    deadline: '2024-03-31',
    eligibility: ['Women in STEM', 'Undergraduate/Graduate', 'Min. GPA 3.0'],
    applicationLink: 'https://www.womenintechnology.org/scholarships'
  },
  {
    name: 'Grace Hopper Celebration Scholarship',
    amount: '$3,000',
    deadline: '2024-04-15',
    eligibility: ['Women in Computing', 'Full-time student', 'Demonstrated leadership'],
    applicationLink: 'https://ghc.anitab.org/scholarships'
  },
  {
    name: 'Adobe Research Women-in-Technology Scholarship',
    amount: '$10,000',
    deadline: '2024-05-01',
    eligibility: ['Women in tech/science', 'Undergraduate student', 'Creative portfolio'],
    applicationLink: 'https://research.adobe.com/scholarship'
  },
  {
    name: 'Google Women Techmakers Scholarship',
    amount: '$10,000',
    deadline: '2024-06-15',
    eligibility: ['Women in Computer Science', 'Academic excellence', 'Leadership qualities'],
    applicationLink: 'https://www.womentechmakers.com/scholars'
  },
  {
    name: 'Society of Women Engineers Scholarship',
    amount: 'Various amounts',
    deadline: '2024-05-01',
    eligibility: ['Women in Engineering', 'ABET-accredited program', 'Academic merit'],
    applicationLink: 'https://swe.org/scholarships'
  }
];

function Scholarships() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Available Scholarships</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship, index) => (
          <Card key={index}>
            <h3 className="text-xl font-semibold mb-2">{scholarship.name}</h3>
            <div className="space-y-2 text-gray-600">
              <p className="text-lg font-medium text-purple-600">{scholarship.amount}</p>
              <p><span className="font-medium">Deadline:</span> {scholarship.deadline}</p>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Eligibility:</h4>
                <ul className="list-disc list-inside">
                  {scholarship.eligibility.map((criteria, idx) => (
                    <li key={idx}>{criteria}</li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href={scholarship.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Apply Now
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Scholarships;
