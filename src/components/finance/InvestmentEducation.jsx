import Card from '../shared/Card';

const investmentTopics = [
  {
    title: 'Investment Basics',
    level: 'Beginner',
    modules: [
      'Understanding Stocks and Bonds',
      'Risk Management',
      'Portfolio Diversification',
    ],
    duration: '2 hours',
  },
  {
    title: 'Retirement Planning',
    level: 'Intermediate',
    modules: [
      'Retirement Account Types',
      'Investment Strategies',
      'Social Security Benefits',
    ],
    duration: '3 hours',
  },
  {
    title: 'Advanced Trading',
    level: 'Advanced',
    modules: [
      'Technical Analysis',
      'Market Psychology',
      'Trading Strategies',
    ],
    duration: '4 hours',
  },
];

const marketUpdates = [
  {
    title: 'Market Overview',
    content: 'Stay updated with the latest market trends and analysis.',
    type: 'Live Updates',
  },
  {
    title: 'Investment News',
    content: 'Daily digest of important investment news and insights.',
    type: 'Daily Digest',
  },
];

function InvestmentEducation() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Investment Education</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Learning Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentTopics.map((topic, index) => (
            <Card key={index}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold">{topic.title}</h4>
                <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
                  {topic.level}
                </span>
              </div>
              <div className="space-y-3">
                <p><span className="font-medium">Duration:</span> {topic.duration}</p>
                <div>
                  <h5 className="font-medium mb-2">Modules:</h5>
                  <ul className="list-disc list-inside text-gray-600">
                    {topic.modules.map((module, idx) => (
                      <li key={idx}>{module}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Start Learning
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Market Updates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketUpdates.map((update, index) => (
            <Card key={index}>
              <h4 className="text-lg font-semibold mb-2">{update.title}</h4>
              <p className="text-gray-600 mb-2">{update.content}</p>
              <span className="text-sm text-purple-600">{update.type}</span>
              <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                View Updates
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Investment Calculator</h3>
        <Card>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Investment
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Contribution
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Return Rate (%)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter percentage"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Calculate Returns
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}

export default InvestmentEducation;
