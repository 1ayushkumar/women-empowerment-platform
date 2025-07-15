import Card from '../shared/Card';

const fundingOpportunities = [
  {
    id: 1,
    name: 'WE Fund - Women Entrepreneurs',
    type: 'Grant',
    amount: 'Up to ₹20,00,000',
    deadline: '2024-03-31',
    eligibility: [
      'Women-owned business',
      'In operation for at least 1 year',
      'Revenue under $1M',
      'Clear growth plan'
    ],
    description: 'Non-dilutive funding for women entrepreneurs looking to scale their businesses.',
    applicationLink: 'https://www.wefund.org/apply'
  },
  {
    id: 2,
    name: 'SBA Women-Owned Small Business Program',
    type: 'Government Contract',
    amount: 'Contract-based',
    deadline: 'Rolling',
    eligibility: [
      'Women-owned small business',
      'WOSB certification',
      'Meets industry size standards',
      'US-based business'
    ],
    description: 'Federal contracting program for women-owned small businesses.',
    applicationLink: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program'
  },
  {
    id: 3,
    name: 'Tory Burch Foundation Fellows Program',
    type: 'Grant + Education',
    amount: '$5,000',
    deadline: '2024-04-15',
    eligibility: [
      'Women entrepreneur',
      'US-based business',
      'Early-stage company',
      'Demonstrated leadership'
    ],
    description: 'Year-long fellowship including grant funding, mentorship, and networking opportunities.',
    applicationLink: 'https://www.toryburchfoundation.org/fellows/'
  },
  {
    id: 4,
    name: 'Cartier Women\'s Initiative Awards',
    type: 'Award + Investment',
    amount: 'Up to $100,000',
    deadline: '2024-05-30',
    eligibility: [
      'Women-led business',
      'Early-stage startup',
      'Innovative solution',
      'Social or environmental impact'
    ],
    description: 'International business competition for women entrepreneurs making social impact.',
    applicationLink: 'https://www.cartierwomensinitiative.com/'
  },
  {
    id: 5,
    name: 'Amber Grant Foundation',
    type: 'Monthly Grant',
    amount: '$10,000',
    deadline: 'Monthly',
    eligibility: [
      'Women-owned business',
      'US or Canada based',
      'Compelling business story',
      'Clear business plan'
    ],
    description: 'Monthly grants for women entrepreneurs with additional annual award.',
    applicationLink: 'https://ambergrantsforwomen.com/apply'
  }
];

function Funding() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Funding Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fundingOpportunities.map((opportunity) => (
          <Card key={opportunity.id}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{opportunity.name}</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {opportunity.type}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-medium">Amount:</span>
                  <span className="ml-2 text-green-600">{opportunity.amount}</span>
                </div>

                <div>
                  <span className="font-medium">Deadline:</span>
                  <span className="ml-2">{opportunity.deadline}</span>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Eligibility:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {opportunity.eligibility.map((criteria, index) => (
                      <li key={index} className="text-gray-600">{criteria}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-gray-600">{opportunity.description}</p>

                <a
                  href={opportunity.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block w-full bg-purple-600 text-white text-center px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Funding;
