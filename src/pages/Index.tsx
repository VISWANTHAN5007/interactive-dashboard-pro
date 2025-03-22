
import React, { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Widget } from '@/components/dashboard/Widget';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { AssistantDialog } from '@/components/assistant/AssistantDialog';
import { AreaChart, BarChart, PieChart, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, Bar, Pie, Line } from 'recharts';
import { DashboardProvider, useDashboard } from '@/context/DashboardContext';
import { Check, Clock, RotateCcw, MessageSquareText, X, MoreVertical, ChevronRight } from 'lucide-react';
import { performanceData, financialData, healthData, taskData, weatherData } from '@/utils/mockData';

function DashboardContent() {
  const { data, loading, markTaskCompleted, markNotificationRead } = useDashboard();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  
  const pieChartData = [
    { name: 'Completed', value: data.tasks.completed, fill: 'hsl(var(--success))' },
    { name: 'Remaining', value: data.tasks.total - data.tasks.completed, fill: 'hsl(var(--muted))' },
  ];
  
  const renderTaskPriority = (priority: string) => {
    switch(priority) {
      case 'high':
        return <span className="inline-block w-2 h-2 rounded-full bg-destructive"></span>;
      case 'medium':
        return <span className="inline-block w-2 h-2 rounded-full bg-warning"></span>;
      case 'low':
        return <span className="inline-block w-2 h-2 rounded-full bg-success"></span>;
      default:
        return null;
    }
  };
  
  const renderNotificationIcon = (type: string) => {
    switch(type) {
      case 'info':
        return <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info">i</div>;
      case 'warning':
        return <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center text-warning">!</div>;
      case 'success':
        return <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success"><Check className="w-4 h-4" /></div>;
      case 'error':
        return <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive"><X className="w-4 h-4" /></div>;
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your stats.</p>
        </div>
        
        <button 
          onClick={() => setIsAssistantOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <MessageSquareText className="w-5 h-5" />
          <span>Open Assistant</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Performance Card */}
        <div className="col-span-1 animate-scale-in" style={{ animationDelay: '150ms' }}>
          <div className="widget h-full">
            <div className="widget-header">
              <h3 className="text-sm font-medium">Performance</h3>
            </div>
            <div className="widget-body flex flex-col items-center justify-center p-6">
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{data.performance}%</span>
                </div>
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 45 * data.performance / 100} ${2 * Math.PI * 45 * (1 - data.performance / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm">Overall Performance</p>
            </div>
          </div>
        </div>
        
        {/* Tasks Progress Card */}
        <div className="col-span-1 animate-scale-in" style={{ animationDelay: '200ms' }}>
          <div className="widget h-full">
            <div className="widget-header">
              <h3 className="text-sm font-medium">Tasks Progress</h3>
            </div>
            <div className="widget-body flex flex-col h-[calc(100%-56px)]">
              <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">
                  {data.tasks.completed} / {data.tasks.total} completed
                </p>
                <p className="text-muted-foreground text-sm">
                  {Math.round((data.tasks.completed / data.tasks.total) * 100)}% of tasks completed
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Activity Card */}
        <div className="col-span-1 animate-scale-in" style={{ animationDelay: '250ms' }}>
          <div className="widget h-full">
            <div className="widget-header">
              <h3 className="text-sm font-medium">Recent Activity</h3>
              <button className="p-1 rounded-md hover:bg-muted/50 transition-colors">
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Refresh</span>
              </button>
            </div>
            <div className="widget-body h-[calc(100%-56px)]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.activity}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius-md)',
                    }}
                    labelFormatter={(date) => new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      <WidgetGrid>
        {/* Tasks Widget */}
        <Widget title="Recent Tasks" id="tasks-widget">
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {data.recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => !task.completed && markTaskCompleted(task.id)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.completed 
                        ? 'bg-primary text-primary-foreground' 
                        : 'border border-muted-foreground/50 hover:border-primary transition-colors'
                    }`}
                  >
                    {task.completed && <Check className="w-3 h-3" />}
                  </button>
                  <div className="flex flex-col">
                    <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      <span className="mx-1">•</span>
                      <div className="flex items-center gap-1">
                        {renderTaskPriority(task.priority)}
                        <span className="capitalize">{task.priority}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="p-1 rounded-md hover:bg-muted/50 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <button className="flex items-center justify-center w-full text-sm text-primary hover:text-primary/80 transition-colors py-1">
              <span>View All Tasks</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </Widget>
        
        {/* Financial Overview Widget */}
        <Widget title="Financial Overview" id="finance-widget">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={financialData.categories}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-muted-foreground text-xs">Income</p>
              <p className="text-lg font-medium">${financialData.income}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Expenses</p>
              <p className="text-lg font-medium">${financialData.expenses}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Savings</p>
              <p className="text-lg font-medium">${financialData.savings}</p>
            </div>
          </div>
        </Widget>
        
        {/* Health Stats Widget */}
        <Widget title="Health Stats" id="health-widget">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius-md)',
                }}
                formatter={(value, name, props) => [`${value}/${props.payload.goal}`, name]}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--accent))" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center justify-between pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">Daily Progress</p>
            <p className="text-sm font-medium">75%</p>
          </div>
        </Widget>
        
        {/* Weather Widget */}
        <Widget title="Weather" id="weather-widget">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-light mb-2">{weatherData.current.temp}°</div>
            <div className="text-muted-foreground mb-4">{weatherData.current.condition}</div>
            <div className="w-full grid grid-cols-5 gap-2 text-center">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                  <span className="text-sm font-medium">{day.temp}°</span>
                </div>
              ))}
            </div>
          </div>
        </Widget>
        
        {/* Notifications Widget */}
        <Widget title="Notifications" id="notifications-widget">
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {data.notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start gap-3 p-2 rounded-md transition-colors ${
                  notification.read ? 'opacity-60' : 'hover:bg-muted/50'
                }`}
              >
                {renderNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                {!notification.read && (
                  <button 
                    onClick={() => markNotificationRead(notification.id)}
                    className="p-1 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Mark as read</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </Widget>
        
        {/* Performance Chart Widget */}
        <Widget title="Yearly Performance" id="performance-widget">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Widget>
      </WidgetGrid>
      
      <AssistantDialog isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </>
  );
}

export default function Index() {
  return (
    <PageTransition>
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </PageTransition>
  );
}
