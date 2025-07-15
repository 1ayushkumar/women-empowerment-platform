import Card from '../shared/Card';

const resources = [
  {
    id: 1,
    category: 'Resume & Portfolio',
    resources: [
      {
        name: 'LinkedIn Profile Optimization',
        description: 'Learn how to create a standout LinkedIn profile that attracts recruiters.',
        link: 'https://www.linkedin.com/learning/learning-linkedin-for-career-development'
      },
      {
        name: 'Resume Builder by Novoresume',
        description: 'Professional resume templates and builder with ATS-friendly formats.',
        link: 'https://novoresume.com/'
      },
      {
        name: 'Portfolio Website Templates',
        description: 'Create a professional portfolio website to showcase your work.',
        link: 'https://www.wix.com/website/templates/html/portfolio-cv'
      }
    ]
  },
  {
    id: 2,
    category: 'Interview Preparation',
    resources: [
      {
        name: 'Glassdoor Interview Questions',
        description: 'Research company-specific interview questions and experiences.',
        link: 'https://www.glassdoor.com/Interview/index.htm'
      },
      {
        name: 'LeetCode Technical Interview Prep',
        description: 'Practice coding interview questions from top tech companies.',
        link: 'https://leetcode.com/'
      },
      {
        name: 'Big Interview',
        description: 'AI-powered interview practice and coaching platform.',
        link: 'https://biginterview.com/'
      }
    ]
  },
  {
    id: 3,
    category: 'Skill Development',
    resources: [
      {
        name: 'Coursera Professional Certificates',
        description: 'Industry-recognized certificates in various fields.',
        link: 'https://www.coursera.org/professional-certificates'
      },
      {
        name: 'Udacity Nanodegrees',
        description: 'In-depth programs co-created with industry leaders.',
        link: 'https://www.udacity.com/nanodegree'
      },
      {
        name: 'Google Career Certificates',
        description: 'Job-ready skills in high-growth fields.',
        link: 'https://grow.google/certificates'
      }
    ]
  },
  {
    id: 4,
    category: 'Networking',
    resources: [
      {
        name: 'Women in Technology International',
        description: 'Global network for women in technology careers.',
        link: 'https://witi.com/'
      },
      {
        name: 'Professional Women\'s Network',
        description: 'Connect with professional women across industries.',
        link: 'https://www.pwnglobal.net/'
      },
      {
        name: 'Meetup Professional Groups',
        description: 'Find local professional networking events.',
        link: 'https://www.meetup.com/topics/professional-networking/'
      }
    ]
  },
  {
    id: 5,
    category: 'Salary Research',
    resources: [
      {
        name: 'Salary.com',
        description: 'Research salary ranges and compensation data.',
        link: 'https://www.salary.com/'
      },
      {
        name: 'PayScale Salary Calculator',
        description: 'Get a personalized salary report based on your experience.',
        link: 'https://www.payscale.com/salary-calculator'
      },
      {
        name: 'Levels.fyi',
        description: 'Compare tech company levels and compensation.',
        link: 'https://www.levels.fyi/'
      }
    ]
  }
];

function CareerResources() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Career Development Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((category) => (
          <Card key={category.id}>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <div className="space-y-6">
                {category.resources.map((resource, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium mb-2">{resource.name}</h4>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Access Resource
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
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

export default CareerResources;
