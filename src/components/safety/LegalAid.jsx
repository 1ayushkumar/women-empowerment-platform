import Card from '../shared/Card';

const legalResources = [
  {
    title: 'Legal Aid Organizations',
    description: 'Free or low-cost legal services for women',
    contacts: [
      { name: 'Women\'s Legal Aid', phone: '1-800-XXX-XXXX' },
      { name: 'Legal Rights Center', phone: '1-800-XXX-XXXX' },
    ],
  },
  {
    title: 'Pro Bono Lawyers',
    description: 'Volunteer lawyers offering free legal consultation',
    contacts: [
      { name: 'Pro Bono Network', phone: '1-800-XXX-XXXX' },
      { name: 'Legal Volunteers', phone: '1-800-XXX-XXXX' },
    ],
  },
];

function LegalAid() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Legal Resources</h2>
      
      {legalResources.map((resource, index) => (
        <Card key={index}>
          <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
          <p className="text-gray-600 mb-4">{resource.description}</p>
          <div className="space-y-2">
            {resource.contacts.map((contact, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{contact.name}</span>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default LegalAid;