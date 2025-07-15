import Card from '../shared/Card';

const campaigns = [
  {
    title: 'Eco-Friendly Fashion Line',
    creator: 'Sarah Johnson',
    goal: 50000,
    raised: 32500,
    backers: 245,
    daysLeft: 15,
    category: 'Fashion',
    description: 'Launching a sustainable fashion line using recycled materials and ethical manufacturing.',
  },
  {
    title: 'Women in Tech Mentorship',
    creator: 'Tech Sisters Network',
    goal: 25000,
    raised: 18750,
    backers: 156,
    daysLeft: 20,
    category: 'Education',
    description: 'Creating a mentorship platform connecting women in tech with industry leaders.',
  },
  {
    title: 'Organic Food Co-op',
    creator: 'Maria Garcia',
    goal: 35000,
    raised: 28000,
    backers: 189,
    daysLeft: 10,
    category: 'Food',
    description: 'Starting a community-owned organic food cooperative to promote healthy eating.',
  },
];

const categories = ['All', 'Fashion', 'Education', 'Food', 'Technology', 'Arts', 'Social Impact'];

function Crowdfunding() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Crowdfunding Platform</h2>

      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-full md:w-48">
            <select className="w-full p-2 border rounded">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
            Start Campaign
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <Card key={index}>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{campaign.title}</h3>
                    <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
                      {campaign.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">by {campaign.creator}</p>
                </div>

                <p className="text-gray-600">{campaign.description}</p>

                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
                    <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{campaign.backers} backers</span>
                  <span>{campaign.daysLeft} days left</span>
                </div>

                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Back This Project
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Start Your Campaign</h3>
        <Card>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter campaign title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full p-2 border rounded">
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funding Goal
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter funding goal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Duration (days)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter campaign duration"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Description
              </label>
              <textarea
                className="w-full p-2 border rounded h-24"
                placeholder="Describe your campaign..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Image
              </label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Create Campaign
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}

export default Crowdfunding;
