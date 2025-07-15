import Card from '../shared/Card';

const healthProviders = [
  {
    category: 'Women\'s Health Clinics',
    providers: [
      {
        name: 'Women\'s Wellness Center',
        address: '123 Health St, City',
        phone: '1-800-XXX-XXXX',
        services: ['General checkups', 'Gynecology', 'Family planning'],
      },
      {
        name: 'Family Care Clinic',
        address: '456 Care Ave, City',
        phone: '1-800-XXX-XXXX',
        services: ['Prenatal care', 'Pediatrics', 'Women\'s health'],
      },
    ],
  },
  {
    category: 'Mental Health Specialists',
    providers: [
      {
        name: 'Mind & Wellness Center',
        address: '789 Wellness Rd, City',
        phone: '1-800-XXX-XXXX',
        services: ['Counseling', 'Therapy', 'Support groups'],
      },
    ],
  },
];

function HealthDirectory() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Healthcare Directory</h2>
      
      {healthProviders.map((category, index) => (
        <section key={index}>
          <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
          <div className="space-y-4">
            {category.providers.map((provider, idx) => (
              <Card key={idx}>
                <h4 className="text-lg font-semibold mb-2">{provider.name}</h4>
                <div className="space-y-2 text-gray-600">
                  <p>{provider.address}</p>
                  <p>
                    <a
                      href={`tel:${provider.phone}`}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      {provider.phone}
                    </a>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {provider.services.map((service, serviceIdx) => (
                      <span
                        key={serviceIdx}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default HealthDirectory;