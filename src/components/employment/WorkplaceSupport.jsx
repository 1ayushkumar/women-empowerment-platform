import Card from '../shared/Card';

const resources = [
  {
    title: 'Know Your Rights',
    category: 'Legal',
    description: 'Information about workplace rights, labor laws, and anti-discrimination policies.',
    links: [
      'Employment Rights Guide',
      'Anti-harassment Policies',
      'Equal Pay Resources',
    ],
  },
  {
    title: 'Professional Development',
    category: 'Growth',
    description: 'Resources for skill development and career advancement.',
    links: [
      'Leadership Training',
      'Communication Skills',
      'Negotiation Workshops',
    ],
  },
  {
    title: 'Work-Life Balance',
    category: 'Wellness',
    description: 'Tips and resources for maintaining a healthy work-life balance.',
    links: [
      'Time Management',
      'Stress Reduction',
      'Remote Work Guide',
    ],
  },
];

const supportServices = [
  {
    title: 'Legal Consultation',
    description: 'Get professional legal advice on workplace matters.',
    availability: 'By appointment',
  },
  {
    title: 'Mental Health Support',
    description: 'Access to counseling and mental health resources.',
    availability: '24/7 helpline',
  },
  {
    title: 'Career Coaching',
    description: 'One-on-one coaching for career development.',
    availability: 'Weekly sessions',
  },
];

function WorkplaceSupport() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Workplace Support</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold">{resource.title}</h4>
                <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
                  {resource.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="space-y-2">
                <h5 className="font-medium">Available Resources:</h5>
                <ul className="list-disc list-inside text-gray-600">
                  {resource.links.map((link, idx) => (
                    <li key={idx}>{link}</li>
                  ))}
                </ul>
              </div>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Access Resources
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Support Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportServices.map((service, index) => (
            <Card key={index}>
              <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-sm text-purple-600">{service.availability}</p>
              <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Schedule Consultation
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Request Support</h3>
        <Card>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Type
              </label>
              <select className="w-full p-2 border rounded">
                <option value="">Select support type</option>
                <option value="legal">Legal Consultation</option>
                <option value="mental-health">Mental Health Support</option>
                <option value="career">Career Coaching</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Contact Method
              </label>
              <select className="w-full p-2 border rounded">
                <option value="">Select contact method</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="video">Video Call</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brief Description
              </label>
              <textarea
                className="w-full p-2 border rounded h-24"
                placeholder="Briefly describe your support needs..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Submit Request
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}

export default WorkplaceSupport;
