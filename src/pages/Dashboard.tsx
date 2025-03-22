
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Widget } from '@/components/dashboard/Widget';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { DashboardProvider, useDashboard } from '@/context/DashboardContext';
import { performanceData, financialData, healthData, taskData, calendarEvents } from '@/utils/mockData';
import { AreaChart, BarChart, PieChart, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, Bar, Pie, Line, Cell, Legend } from 'recharts';
import { Check, Clock, Calendar, RotateCcw, MessageSquareText, X, MoreVertical, ChevronRight, CreditCard, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

function DashboardDetailContent() {
  const { data, loading } = useDashboard();
  
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
  
  // Prepare data for the overview cards
  const overviewCards = [
    {
      title: 'Performance',
      value: `${data.performance}%`,
      trend: '+5%',
      isPositive: true,
      icon: Activity,
      description: 'from last month',
    },
    {
      title: 'Tasks Completed',
      value: data.tasks.completed,
      trend: `${Math.round((data.tasks.completed / data.tasks.total) * 100)}%`,
      isPositive: true,
      icon: Check,
      description: 'completion rate',
    },
    {
      title: 'Upcoming Deadlines',
      value: data.recentTasks.filter(t => !t.completed).length,
      trend: '2 days',
      isPositive: false,
      icon: Clock,
      description: 'next deadline',
    },
    {
      title: 'Scheduled Events',
      value: calendarEvents.length,
      trend: '2 new',
      isPositive: true,
      icon: Calendar,
      description: 'this week',
    },
  ];

  // Prepare expanded financial data
  const financialLineData = [
    { month: 'Jan', income: 4800, expenses: 3200 },
    { month: 'Feb', income: 5100, expenses: 3300 },
    { month: 'Mar', income: 4900, expenses: 3500 },
    { month: 'Apr', income: 5300, expenses: 3400 },
    { month: 'May', income: 5200, expenses: 3600 },
    { month: 'Jun', income: 5400, expenses: 3700 },
    { month: 'Jul', income: 5600, expenses: 3800 },
    { month: 'Aug', income: 5500, expenses: 3600 },
    { month: 'Sep', income: 5700, expenses: 3900 },
    { month: 'Oct', income: 5800, expenses: 3800 },
    { month: 'Nov', income: 5900, expenses: 3850 },
    { month: 'Dec', income: 6100, expenses: 4000 },
  ];
  
  // Expanded performance metrics
  const expandedPerformanceData = [
    { category: 'Productivity', score: 78, lastMonth: 72 },
    { category: 'Efficiency', score: 82, lastMonth: 75 },
    { category: 'Quality', score: 90, lastMonth: 88 },
    { category: 'Communication', score: 85, lastMonth: 80 },
    { category: 'Teamwork', score: 88, lastMonth: 85 },
  ];
  
  // Health data with more metrics
  const expandedHealthData = [
    { day: 'Mon', sleep: 7.2, calories: 2200, steps: 8500 },
    { day: 'Tue', sleep: 6.8, calories: 2100, steps: 9200 },
    { day: 'Wed', sleep: 7.5, calories: 2300, steps: 7800 },
    { day: 'Thu', sleep: 8.0, calories: 2250, steps: 10200 },
    { day: 'Fri', sleep: 7.3, calories: 2400, steps: 9500 },
    { day: 'Sat', sleep: 8.5, calories: 2500, steps: 6500 },
    { day: 'Sun', sleep: 9.0, calories: 2450, steps: 5800 },
  ];
  
  return (
    <>
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold">Detailed Dashboard</h1>
        <p className="text-muted-foreground">A comprehensive view of all your metrics and statistics.</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {overviewCards.map((card, index) => (
          <div 
            key={index} 
            className="widget card-hover animate-scale-in" 
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                </div>
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex items-center">
                <span className={`inline-flex items-center text-xs font-medium ${card.isPositive ? 'text-success' : 'text-destructive'}`}>
                  {card.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {card.trend}
                </span>
                <span className="text-xs text-muted-foreground ml-1">{card.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Financial Overview Chart */}
        <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
          <Widget title="Financial Overview - Annual" id="financial-annual">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={financialLineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    width={50}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius-md)',
                    }}
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    name="Income" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: "hsl(var(--success))" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    name="Expenses" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: "hsl(var(--destructive))" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <Wallet className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Income</span>
                </div>
                <span className="text-lg font-bold">${financialData.income}</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <CreditCard className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium">Expenses</span>
                </div>
                <span className="text-lg font-bold">${financialData.expenses}</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Net</span>
                </div>
                <span className="text-lg font-bold">${financialData.income - financialData.expenses}</span>
              </div>
            </div>
          </Widget>
        </div>
        
        {/* Performance Metrics */}
        <div className="animate-scale-in" style={{ animationDelay: '250ms' }}>
          <Widget title="Performance Metrics" id="performance-metrics">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={expandedPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  barGap={0}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="category" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    width={30}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius-md)',
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Bar 
                    dataKey="score" 
                    name="Current" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="lastMonth" 
                    name="Last Month" 
                    fill="hsl(var(--muted))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Performance Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{data.performance}%</span>
                  <span className="inline-flex items-center text-xs font-medium text-success">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    5%
                  </span>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </div>
      
      {/* Health & Wellness Section */}
      <div className="mb-8 animate-scale-in" style={{ animationDelay: '300ms' }}>
        <Widget title="Health & Wellness" id="health-wellness">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={expandedHealthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  width={40}
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="sleep" 
                  name="Sleep (hours)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="calories" 
                  name="Calories (÷1000)" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="steps" 
                  name="Steps" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-4">
            {healthData.map((item, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-sm text-muted-foreground mb-1">{item.name}</p>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(item.value / item.goal) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs whitespace-nowrap">{item.value}/{item.goal}</span>
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </div>
      
      {/* Task Management & Calendar Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-scale-in" style={{ animationDelay: '350ms' }}>
          <Widget title="Task Management" id="task-management">
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {taskData.map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                    task.completed ? 'bg-muted/30' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        task.completed 
                          ? 'bg-success text-success-foreground' 
                          : 'border border-muted-foreground/50'
                      }`}
                    >
                      {task.completed && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                          task.priority === 'high' 
                            ? 'bg-destructive/10 text-destructive' 
                            : task.priority === 'medium'
                              ? 'bg-warning/10 text-warning'
                              : 'bg-success/10 text-success'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-1 rounded-full hover:bg-muted/50 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Widget>
        </div>
        
        <div className="animate-scale-in" style={{ animationDelay: '400ms' }}>
          <Widget title="Upcoming Events" id="upcoming-events">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {calendarEvents.map((event) => (
                <div key={event.id} className="flex gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium">{
                      new Date(event.start).toLocaleDateString(undefined, { day: 'numeric' })
                    }</span>
                    <span className="text-xs text-muted-foreground">{
                      new Date(event.start).toLocaleDateString(undefined, { month: 'short' })
                    }</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{
                        new Date(event.start).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                      } - {
                        new Date(event.end).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                      }</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="self-start p-1 rounded-full hover:bg-muted/50 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Widget>
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <PageTransition>
      <DashboardProvider>
        <DashboardDetailContent />
      </DashboardProvider>
    </PageTransition>
  );
}
