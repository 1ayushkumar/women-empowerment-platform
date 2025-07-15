import { create } from 'zustand';
import {
  ComputerDesktopIcon,
  ChartBarIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';

const useMentorshipStore = create((set) => ({
  mentors: [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      expertise: ['Web Development', 'Cloud Architecture', 'Team Leadership'],
      availability: 'Weekly',
      rating: 4.8,
      mentees: 12,
      icon: ComputerDesktopIcon,
      color: 'from-blue-400 to-indigo-500',
      avatar: '👩‍💻'
    },
    {
      id: 2,
      name: 'Emily Chen',
      title: 'Product Manager',
      company: 'Innovation Labs',
      expertise: ['Product Strategy', 'UX Design', 'Agile Management'],
      availability: 'Bi-weekly',
      rating: 4.9,
      mentees: 8,
      icon: ChartBarIcon,
      color: 'from-purple-400 to-pink-500',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      title: 'Marketing Director',
      company: 'Global Brands Co.',
      expertise: ['Digital Marketing', 'Brand Strategy', 'Content Creation'],
      availability: 'Monthly',
      rating: 4.7,
      mentees: 15,
      icon: MegaphoneIcon,
      color: 'from-green-400 to-emerald-500',
      avatar: '👩‍🎨'
    }
  ],
  mentorApplications: [],
  resources: [
    {
      id: 1,
      title: 'Getting Started with Mentorship',
      type: 'Guide',
      description: 'A comprehensive guide for both mentors and mentees on how to build effective mentorship relationships.',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Mentorship Best Practices',
      type: 'Toolkit',
      description: 'Essential tools and templates for structured mentorship sessions and goal tracking.',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Career Development Framework',
      type: 'Template',
      description: 'A framework for setting and achieving career development goals through mentorship.',
      downloadUrl: '#'
    }
  ],
  addMentorApplication: (application) =>
    set((state) => ({
      mentorApplications: [...state.mentorApplications, { ...application, id: Date.now() }]
    })),
  getMentors: () => set((state) => ({ mentors: state.mentors })),
  getResources: () => set((state) => ({ resources: state.resources }))
}));

export default useMentorshipStore;
