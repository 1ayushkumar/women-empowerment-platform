import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import { 
  ShieldExclamationIcon,
  ScaleIcon,
  BookOpenIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline';

const resources = [
  {
    title: 'Report Abuse',
    description: 'File a confidential report about any incident',
    icon: ShieldExclamationIcon,
    link: '/safety/report',
  },
  {
    title: 'Legal Support',
    description: 'Access free legal aid and consultation',
    icon: ScaleIcon,
    link: '/safety/legal',
  },
  {
    title: 'Safety Guidelines',
    description: 'Learn about personal safety and prevention',
    icon: BookOpenIcon,
    link: '/safety/guidelines',
  },
  {
    title: 'Helpline Numbers',
    description: '24/7 emergency contact numbers',
    icon: PhoneIcon,
    link: '/safety/helpline',
  },
];

function ResourceCenter() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Link key={index} to={resource.link}>
            <Card className="hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <resource.icon className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ResourceCenter;