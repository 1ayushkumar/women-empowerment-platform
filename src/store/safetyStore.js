import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSafetyStore = create(
  persist(
    (set) => ({
      emergencyContacts: [],
      safetyAlerts: [],
      locationHistory: [],
      activeEmergency: null,
      checklist: {
        completed: [],
        pending: [
          'Set up emergency contacts',
          'Enable location sharing',
          'Review safety resources',
          'Set up emergency SMS alerts',
          'Download offline maps',
          'Save local emergency numbers'
        ]
      },
      legalResources: [
        {
          id: 1,
          title: 'Domestic Violence Help',
          type: 'Hotline',
          contact: '1-800-799-SAFE',
          available: '24/7'
        },
        {
          id: 2,
          title: 'Legal Aid Society',
          type: 'Legal Support',
          contact: '1-888-LEGAL-AID',
          available: 'Mon-Fri 9AM-5PM'
        },
        {
          id: 3,
          title: 'Women\'s Rights Organization',
          type: 'Advocacy',
          contact: '1-877-WOMEN-HELP',
          available: '24/7'
        }
      ],
      safetyTips: [
        {
          id: 1,
          category: 'Personal Safety',
          tips: [
            'Stay aware of your surroundings',
            'Keep emergency numbers easily accessible',
            'Trust your instincts',
            'Share your location with trusted contacts'
          ]
        },
        {
          id: 2,
          category: 'Digital Safety',
          tips: [
            'Use strong, unique passwords',
            'Enable two-factor authentication',
            'Be careful with personal information online',
            'Regularly update privacy settings'
          ]
        }
      ],
      addEmergencyContact: (contact) =>
        set((state) => ({
          emergencyContacts: [...state.emergencyContacts, { ...contact, id: Date.now() }]
        })),
      removeEmergencyContact: (contactId) =>
        set((state) => ({
          emergencyContacts: state.emergencyContacts.filter((c) => c.id !== contactId)
        })),
      triggerEmergencyAlert: (emergency) =>
        set((state) => ({
          activeEmergency: { ...emergency, timestamp: Date.now() },
          safetyAlerts: [
            { ...emergency, timestamp: Date.now(), id: Date.now() },
            ...state.safetyAlerts
          ]
        })),
      clearEmergencyAlert: () =>
        set({ activeEmergency: null }),
      updateLocation: (location) =>
        set((state) => ({
          locationHistory: [
            { ...location, timestamp: Date.now() },
            ...state.locationHistory.slice(0, 49)
          ]
        })),
      completeChecklistItem: (item) =>
        set((state) => ({
          checklist: {
            completed: [...state.checklist.completed, item],
            pending: state.checklist.pending.filter((i) => i !== item)
          }
        })),
      addSafetyAlert: (alert) =>
        set((state) => ({
          safetyAlerts: [{ ...alert, id: Date.now() }, ...state.safetyAlerts]
        }))
    }),
    {
      name: 'safety-storage'
    }
  )
);

export default useSafetyStore;
