import {
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Education',
    description: 'Access quality courses and learning resources',
    icon: AcademicCapIcon,
  },
  {
    title: 'Employment',
    description: 'Find job opportunities and career guidance',
    icon: BriefcaseIcon,
  },
  {
    title: 'Health',
    description: 'Track and manage your health and wellness',
    icon: HeartIcon,
  },
  {
    title: 'Safety',
    description: 'Access safety resources and emergency support',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Community',
    description: 'Connect with like-minded women',
    icon: UserGroupIcon,
  },
  {
    title: 'Financial Support',
    description: 'Access funding and financial resources',
    icon: CurrencyDollarIcon,
  },
];

function Features() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <feature.icon className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;