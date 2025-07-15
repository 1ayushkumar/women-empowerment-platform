import { useState  } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  UserCircleIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { UserCircleIcon as UserCircleIconSolid } from '@heroicons/react/24/solid';

const initialPosts = [
  {
    id: 1,
    title: "Breaking into Tech as a Woman: My Journey",
    author: {
      name: "Lisa Chen",
      avatar: "LC",
      avatarColor: "bg-purple-500",
      role: "Software Engineer"
    },
    category: "Career Stories",
    content: "After transitioning from marketing to software engineering, here's what I learned...",
    likes: 45,
    comments: 12,
    date: new Date(2024, 0, 15),
    tags: ["career-change", "tech", "learning"]
  },
  {
    id: 2,
    title: "Resources for Women in STEM Scholarships",
    author: {
      name: "Maria Rodriguez",
      avatar: "MR",
      avatarColor: "bg-pink-500",
      role: "Education Consultant"
    },
    category: "Education",
    content: "Comprehensive list of STEM scholarships available for women in 2024...",
    likes: 67,
    comments: 23,
    date: new Date(2024, 0, 14),
    tags: ["scholarships", "STEM", "education"]
  },
  {
    id: 3,
    title: "Work-Life Balance Tips for Working Mothers",
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
      avatarColor: "bg-green-500",
      role: "Project Manager"
    },
    category: "Work-Life Balance",
    content: "Balancing career and motherhood is challenging but achievable. Here are strategies that worked for me...",
    likes: 89,
    comments: 34,
    date: new Date(2024, 0, 12),
    tags: ["work-life-balance", "motherhood", "career"]
  },
  {
    id: 4,
    title: "Networking Events for Women in Leadership",
    author: {
      name: "Dr. Amanda Wilson",
      avatar: "AW",
      avatarColor: "bg-indigo-500",
      role: "CEO"
    },
    category: "Leadership",
    content: "Building professional networks is crucial for career advancement. Here's a list of upcoming events...",
    likes: 52,
    comments: 18,
    date: new Date(2024, 0, 10),
    tags: ["networking", "leadership", "events"]
  },
  {
    id: 5,
    title: "Coding Bootcamp Experience: From Zero to Developer",
    author: {
      name: "Jessica Lee",
      avatar: "JL",
      avatarColor: "bg-teal-500",
      role: "Full Stack Developer"
    },
    category: "Tech Talks",
    content: "My journey through a 12-week coding bootcamp and landing my first developer job...",
    likes: 73,
    comments: 29,
    date: new Date(2024, 0, 8),
    tags: ["coding", "bootcamp", "career-change", "tech"]
  }
];

const categories = [
  "All",
  "Career Stories",
  "Education",
  "Tech Talks",
  "Work-Life Balance",
  "Mentorship",
  "Leadership"
];

// Avatar component for consistent display
const Avatar = ({ author }) => {
  if (!author) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold text-sm mr-4 flex-shrink-0">
        <UserCircleIconSolid className="w-8 h-8 text-white" />
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColors = [
    'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500',
    'bg-indigo-500', 'bg-teal-500', 'bg-red-500', 'bg-yellow-500'
  ];

  const getColorForName = (name) => {
    if (!name) return 'bg-gray-400';
    const index = name.length % avatarColors.length;
    return avatarColors[index];
  };

  const initials = author.avatar || getInitials(author.name);
  const color = author.avatarColor || getColorForName(author.name);

  return (
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white font-semibold text-sm mr-4 flex-shrink-0 border-2 border-white shadow-md`}>
      {initials && initials.length > 0 ? (
        <span className="select-none">{initials}</span>
      ) : (
        <UserCircleIconSolid className="w-8 h-8 text-white" />
      )}
    </div>
  );
};

function CommunityForum() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "", tags: "" });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  // Debug: Log posts to console
  console.log('Posts:', posts);
  console.log('Filtered posts:', posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }));

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleNewPost = (e) => {
    e.preventDefault();
    const post = {
      id: posts.length + 1,
      ...newPost,
      author: {
        name: "Current User", // Replace with actual user data
        avatar: "CU",
        avatarColor: "bg-blue-500",
        role: "Community Member"
      },
      likes: 0,
      comments: 0,
      date: new Date(),
      tags: newPost.tags.split(",").map(tag => tag.trim())
    };
    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "", tags: "" });
    setShowNewPostForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Forum</h2>
        <p className="text-lg text-gray-600">Share your experiences and learn from others</p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          className="flex-1 p-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          onClick={() => setShowNewPostForm(true)}
        >
          New Post
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white p-6 rounded-lg shadow-lg"
        >
          <form onSubmit={handleNewPost}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Post title"
                className="w-full p-2 border rounded-md"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Post content"
                className="w-full p-2 border rounded-md h-32"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <select
                className="w-full p-2 border rounded-md"
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                required
              >
                <option value="">Select category</option>
                {categories.filter(c => c !== "All").map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                className="w-full p-2 border rounded-md"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowNewPostForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Post
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <UserCircleIconSolid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No posts found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or category filter</p>
          </div>
        ) : (
          filteredPosts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Avatar author={post.author} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <div className="text-sm text-gray-600">
                    <span>{post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author.role}</span>
                    <span className="mx-2">•</span>
                    <span>{format(post.date, 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{post.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                    <HeartIcon className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                    <ChatBubbleLeftIcon className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <span className="text-purple-600 font-medium">{post.category}</span>
              </div>
            </div>
          </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommunityForum;
