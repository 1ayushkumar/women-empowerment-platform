import { useState  } from 'react';
import Card from '../shared/Card';

const initialTopics = [
  {
    id: 1,
    title: 'Tips for Remote Learning Success',
    author: 'Sarah M.',
    date: '2024-01-15',
    replies: 12,
    content: 'Share your best practices for staying focused during online classes...',
  },
  {
    id: 2,
    title: 'Career Transition Stories',
    author: 'Michael R.',
    date: '2024-01-14',
    replies: 8,
    content: 'Looking to hear from those who successfully changed careers...',
  },
  {
    id: 3,
    title: 'Study Group for Web Development',
    author: 'Jessica L.',
    date: '2024-01-13',
    replies: 15,
    content: 'Anyone interested in forming a study group for web development?',
  },
];

function DiscussionForum() {
  const [topics, setTopics] = useState(initialTopics);
  const [newTopic, setNewTopic] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTopic.title && newTopic.content) {
      const topic = {
        id: topics.length + 1,
        ...newTopic,
        author: 'You',
        date: new Date().toISOString().split('T')[0],
        replies: 0,
      };
      setTopics([topic, ...topics]);
      setNewTopic({ title: '', content: '' });
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Discussion Forum</h2>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic Title
            </label>
            <input
              type="text"
              value={newTopic.title}
              onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Enter topic title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={newTopic.content}
              onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
              className="w-full p-2 border rounded h-24"
              placeholder="Share your thoughts..."
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Post Topic
          </button>
        </form>
      </Card>

      <div className="space-y-4">
        {topics.map((topic) => (
          <Card key={topic.id}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{topic.title}</h3>
              <span className="text-sm text-gray-500">{topic.date}</span>
            </div>
            <p className="text-gray-600 mb-4">{topic.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Posted by {topic.author}</span>
              <span>{topic.replies} replies</span>
            </div>
            <button className="mt-4 text-purple-600 hover:text-purple-700">
              View Discussion →
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DiscussionForum;
