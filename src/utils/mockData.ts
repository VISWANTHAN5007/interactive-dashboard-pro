
// Performance data
export const performanceData = [
  { month: 'Jan', value: 55 },
  { month: 'Feb', value: 60 },
  { month: 'Mar', value: 58 },
  { month: 'Apr', value: 65 },
  { month: 'May', value: 68 },
  { month: 'Jun', value: 72 },
  { month: 'Jul', value: 75 },
  { month: 'Aug', value: 80 },
  { month: 'Sep', value: 85 },
  { month: 'Oct', value: 78 },
  { month: 'Nov', value: 82 },
  { month: 'Dec', value: 88 },
];

// Health data
export const healthData = [
  { name: 'Calories', value: 2200, goal: 2500 },
  { name: 'Steps', value: 8500, goal: 10000 },
  { name: 'Sleep', value: 7.2, goal: 8 },
  { name: 'Hydration', value: 1800, goal: 2000 },
  { name: 'Exercise', value: 45, goal: 60 },
];

// Financial data
export const financialData = {
  income: 5200,
  expenses: 3800,
  savings: 1400,
  categories: [
    { name: 'Housing', value: 1600 },
    { name: 'Food', value: 800 },
    { name: 'Transportation', value: 400 },
    { name: 'Entertainment', value: 300 },
    { name: 'Utilities', value: 350 },
    { name: 'Other', value: 350 },
  ],
  recent: [
    { id: '1', description: 'Grocery Store', amount: -120.50, date: '2023-10-08', category: 'Food' },
    { id: '2', description: 'Salary Deposit', amount: 2600.00, date: '2023-10-05', category: 'Income' },
    { id: '3', description: 'Electric Bill', amount: -85.20, date: '2023-10-03', category: 'Utilities' },
    { id: '4', description: 'Restaurant', amount: -65.80, date: '2023-10-01', category: 'Food' },
    { id: '5', description: 'Gas Station', amount: -45.30, date: '2023-09-29', category: 'Transportation' },
  ],
};

// Weather data
export const weatherData = {
  current: {
    temp: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 8,
  },
  forecast: [
    { day: 'Mon', temp: 73, condition: 'Sunny' },
    { day: 'Tue', temp: 75, condition: 'Sunny' },
    { day: 'Wed', temp: 68, condition: 'Cloudy' },
    { day: 'Thu', temp: 66, condition: 'Rainy' },
    { day: 'Fri', temp: 70, condition: 'Partly Cloudy' },
  ],
};

// Task data
export const taskData = [
  { id: '1', title: 'Review design proposal', completed: false, dueDate: '2023-10-12', priority: 'high' },
  { id: '2', title: 'Complete project documentation', completed: false, dueDate: '2023-10-14', priority: 'medium' },
  { id: '3', title: 'Schedule team meeting', completed: true, dueDate: '2023-10-10', priority: 'low' },
  { id: '4', title: 'Prepare presentation slides', completed: false, dueDate: '2023-10-15', priority: 'medium' },
  { id: '5', title: 'Research new technologies', completed: false, dueDate: '2023-10-18', priority: 'low' },
  { id: '6', title: 'Update client on progress', completed: true, dueDate: '2023-10-09', priority: 'high' },
  { id: '7', title: 'Fix bug in login flow', completed: false, dueDate: '2023-10-13', priority: 'high' },
  { id: '8', title: 'Review pull requests', completed: false, dueDate: '2023-10-16', priority: 'medium' },
];

// Team members
export const teamData = [
  { id: '1', name: 'John Doe', role: 'Product Manager', avatar: '' },
  { id: '2', name: 'Jane Smith', role: 'UI/UX Designer', avatar: '' },
  { id: '3', name: 'Robert Johnson', role: 'Frontend Developer', avatar: '' },
  { id: '4', name: 'Emily Davis', role: 'Backend Developer', avatar: '' },
  { id: '5', name: 'Michael Brown', role: 'QA Engineer', avatar: '' },
];

// Calendar events
export const calendarEvents = [
  { id: '1', title: 'Team Meeting', start: '2023-10-10T10:00:00', end: '2023-10-10T11:00:00', location: 'Conference Room A' },
  { id: '2', title: 'Project Review', start: '2023-10-12T14:00:00', end: '2023-10-12T15:30:00', location: 'Virtual' },
  { id: '3', title: 'Client Presentation', start: '2023-10-15T09:30:00', end: '2023-10-15T11:00:00', location: 'Client Office' },
  { id: '4', title: 'Design Workshop', start: '2023-10-18T13:00:00', end: '2023-10-18T16:00:00', location: 'Conference Room B' },
  { id: '5', title: 'Development Sprint Review', start: '2023-10-20T15:00:00', end: '2023-10-20T16:00:00', location: 'Virtual' },
];

// Assistant chat history
export const assistantHistory = [
  { id: '1', sender: 'user', message: 'Hello, can you help me with project status?', timestamp: '2023-10-09T09:30:00' },
  { id: '2', sender: 'assistant', message: 'Of course! The current project is 78% complete. Would you like to see more details?', timestamp: '2023-10-09T09:30:15' },
  { id: '3', sender: 'user', message: 'Yes, please show me the tasks that are still pending.', timestamp: '2023-10-09T09:30:45' },
  { id: '4', sender: 'assistant', message: 'There are 6 pending tasks. The highest priority ones are "Review design proposal" and "Fix bug in login flow", both due this week.', timestamp: '2023-10-09T09:31:00' },
];

// Notifications
export const notificationData = [
  { id: '1', message: 'New comment on your report', time: '10 minutes ago', read: false, type: 'info' },
  { id: '2', message: 'Meeting starts in 30 minutes', time: '25 minutes ago', read: false, type: 'warning' },
  { id: '3', message: 'Task completed successfully', time: '2 hours ago', read: true, type: 'success' },
  { id: '4', message: 'System update required', time: '5 hours ago', read: false, type: 'error' },
];
