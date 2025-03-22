
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the type for our dashboard data
interface DashboardData {
  performance: number;
  tasks: {
    total: number;
    completed: number;
  };
  activity: {
    date: string;
    value: number;
  }[];
  recentTasks: {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
  }[];
  notifications: {
    id: string;
    message: string;
    time: string;
    read: boolean;
    type: 'info' | 'warning' | 'success' | 'error';
  }[];
}

// Create a context with initial empty state
interface DashboardContextType {
  data: DashboardData;
  loading: boolean;
  refreshData: () => void;
  markTaskCompleted: (id: string) => void;
  markNotificationRead: (id: string) => void;
}

const initialData: DashboardData = {
  performance: 0,
  tasks: {
    total: 0,
    completed: 0,
  },
  activity: [],
  recentTasks: [],
  notifications: [],
};

const DashboardContext = createContext<DashboardContextType>({
  data: initialData,
  loading: true,
  refreshData: () => {},
  markTaskCompleted: () => {},
  markNotificationRead: () => {},
});

// Custom hook for using the dashboard context
export const useDashboard = () => useContext(DashboardContext);

// Provider component
export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);

  // Mock data fetching
  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    const mockData: DashboardData = {
      performance: 78,
      tasks: {
        total: 24,
        completed: 18,
      },
      activity: [
        { date: '2023-10-01', value: 25 },
        { date: '2023-10-02', value: 32 },
        { date: '2023-10-03', value: 40 },
        { date: '2023-10-04', value: 35 },
        { date: '2023-10-05', value: 48 },
        { date: '2023-10-06', value: 52 },
        { date: '2023-10-07', value: 60 },
      ],
      recentTasks: [
        { id: '1', title: 'Review design proposal', completed: false, dueDate: '2023-10-12', priority: 'high' },
        { id: '2', title: 'Complete project documentation', completed: false, dueDate: '2023-10-14', priority: 'medium' },
        { id: '3', title: 'Schedule team meeting', completed: true, dueDate: '2023-10-10', priority: 'low' },
        { id: '4', title: 'Prepare presentation slides', completed: false, dueDate: '2023-10-15', priority: 'medium' },
        { id: '5', title: 'Research new technologies', completed: false, dueDate: '2023-10-18', priority: 'low' },
      ],
      notifications: [
        { id: '1', message: 'New comment on your report', time: '10 minutes ago', read: false, type: 'info' },
        { id: '2', message: 'Meeting starts in 30 minutes', time: '25 minutes ago', read: false, type: 'warning' },
        { id: '3', message: 'Task completed successfully', time: '2 hours ago', read: true, type: 'success' },
        { id: '4', message: 'System update required', time: '5 hours ago', read: false, type: 'error' },
      ],
    };
    
    setData(mockData);
    setLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Function to refresh data
  const refreshData = () => {
    fetchDashboardData();
  };

  // Function to mark a task as completed
  const markTaskCompleted = (id: string) => {
    setData(prevData => ({
      ...prevData,
      recentTasks: prevData.recentTasks.map(task => 
        task.id === id ? { ...task, completed: true } : task
      ),
      tasks: {
        ...prevData.tasks,
        completed: prevData.tasks.completed + 1,
      },
    }));
  };

  // Function to mark a notification as read
  const markNotificationRead = (id: string) => {
    setData(prevData => ({
      ...prevData,
      notifications: prevData.notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      ),
    }));
  };

  const value = {
    data,
    loading,
    refreshData,
    markTaskCompleted,
    markNotificationRead,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
