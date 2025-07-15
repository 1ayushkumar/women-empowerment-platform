import Card from '../shared/Card';

const resources = [
  {
    id: 1,
    category: 'Business Planning',
    resources: [
      {
        name: 'SCORE Business Plan Template',
        description: 'Free business plan template and guide from SCORE mentors.',
        link: 'https://www.score.org/resource/business-plan-template-startups'
      },
      {
        name: 'SBA Business Guide',
        description: 'Comprehensive guide to starting and growing a business.',
        link: 'https://www.sba.gov/business-guide'
      }
    ]
  },
  {
    id: 2,
    category: 'Financial Resources',
    resources: [
      {
        name: 'Grants.gov',
        description: 'Federal grants database for businesses.',
        link: 'https://www.grants.gov/web/grants/search-grants.html'
      },
      {
        name: 'IFundWomen',
        description: 'Funding platform specifically for women entrepreneurs.',
        link: 'https://ifundwomen.com/grants'
      }
    ]
  },
  {
    id: 3,
    category: 'Networking',
    resources: [
      {
        name: 'Women&apos;s Business Enterprise National Council',
        description: 'Largest certifier of women-owned businesses.',
        link: 'https://www.wbenc.org/networking'
      },
      {
        name: 'National Association of Women Business Owners',
        description: 'Community and resources for women business owners.',
        link: 'https://www.nawbo.org'
      }
    ]
  },
  {
    id: 4,
    category: 'Legal Resources',
    resources: [
      {
        name: 'Legal Zoom Small Business Center',
        description: 'Legal resources and services for small businesses.',
        link: 'https://www.legalzoom.com/business'
      },
      {
        name: 'SBA Legal Requirements Guide',
        description: 'Guide to legal requirements for small businesses.',
        link: 'https://www.sba.gov/business-guide/launch-your-business/register-your-business'
      }
    ]
  }
];

function Resources() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Entrepreneurship Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((category) => (
          <Card key={category.id}>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <div className="space-y-4">
                {category.resources.map((resource, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium mb-2">{resource.name}</h4>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Access Resource →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Resources;
