
import React, { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Widget } from '@/components/dashboard/Widget';
import { performanceData, financialData } from '@/utils/mockData';
import { AreaChart, BarChart, PieChart, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, Bar, Pie, Line, Cell, Legend, ComposedChart, Scatter } from 'recharts';
import { Calendar, Filter, Download, RotateCcw, ChevronDown } from 'lucide-react';

const timeRanges = ['This Week', 'This Month', 'This Quarter', 'This Year', 'All Time'];

export default function Analytics() {
  const [activeRange, setActiveRange] = useState('This Month');
  
  // Enhanced performance data with more metrics
  const enhancedPerformanceData = [
    { month: 'Jan', performance: 55, goal: 60, industry: 50 },
    { month: 'Feb', performance: 60, goal: 62, industry: 51 },
    { month: 'Mar', performance: 58, goal: 64, industry: 52 },
    { month: 'Apr', performance: 65, goal: 66, industry: 54 },
    { month: 'May', performance: 68, goal: 68, industry: 56 },
    { month: 'Jun', performance: 72, goal: 70, industry: 58 },
    { month: 'Jul', performance: 75, goal: 72, industry: 60 },
    { month: 'Aug', performance: 80, goal: 74, industry: 62 },
    { month: 'Sep', performance: 85, goal: 76, industry: 64 },
    { month: 'Oct', performance: 78, goal: 78, industry: 66 },
    { month: 'Nov', performance: 82, goal: 80, industry: 68 },
    { month: 'Dec', performance: 88, goal: 82, industry: 70 },
  ];
  
  // Data for scatter plot
  const scatterData = [
    { x: 10, y: 30, z: 200 },
    { x: 30, y: 50, z: 100 },
    { x: 45, y: 20, z: 150 },
    { x: 50, y: 10, z: 50 },
    { x: 70, y: 30, z: 100 },
    { x: 80, y: 50, z: 200 },
    { x: 90, y: 70, z: 250 },
    { x: 100, y: 90, z: 300 },
    { x: 110, y: 55, z: 150 },
    { x: 120, y: 70, z: 200 },
  ];
  
  // Enhanced financial data with trends
  const financialTrendData = [
    { month: 'Jan 2023', income: 4800, expenses: 3200, savings: 1600 },
    { month: 'Feb 2023', income: 5100, expenses: 3300, savings: 1800 },
    { month: 'Mar 2023', income: 4900, expenses: 3500, savings: 1400 },
    { month: 'Apr 2023', income: 5300, expenses: 3400, savings: 1900 },
    { month: 'May 2023', income: 5200, expenses: 3600, savings: 1600 },
    { month: 'Jun 2023', income: 5400, expenses: 3700, savings: 1700 },
    { month: 'Jul 2023', income: 5600, expenses: 3800, savings: 1800 },
    { month: 'Aug 2023', income: 5500, expenses: 3600, savings: 1900 },
    { month: 'Sep 2023', income: 5700, expenses: 3900, savings: 1800 },
    { month: 'Oct 2023', income: 5800, expenses: 3800, savings: 2000 },
    { month: 'Nov 2023', income: 5900, expenses: 3850, savings: 2050 },
    { month: 'Dec 2023', income: 6100, expenses: 4000, savings: 2100 },
  ];
  
  // Productivity data by hour
  const productivityByHourData = [
    { hour: '8 AM', productivity: 70 },
    { hour: '9 AM', productivity: 85 },
    { hour: '10 AM', productivity: 90 },
    { hour: '11 AM', productivity: 95 },
    { hour: '12 PM', productivity: 75 },
    { hour: '1 PM', productivity: 65 },
    { hour: '2 PM', productivity: 80 },
    { hour: '3 PM', productivity: 85 },
    { hour: '4 PM', productivity: 80 },
    { hour: '5 PM', productivity: 75 },
  ];
  
  // Task completion data
  const taskCompletionData = [
    { name: 'Completed', value: 75 },
    { name: 'In Progress', value: 15 },
    { name: 'Not Started', value: 10 },
  ];
  
  const COLORS = ['hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--muted))'];
  
  return (
    <PageTransition>
      <div className="mb-8 animate-slide-up">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Detailed statistics and performance metrics</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md hover:bg-muted/50 transition-colors">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{activeRange}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {/* Time range dropdown could be added here */}
            </div>
            
            <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md hover:bg-muted/50 transition-colors">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filter</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md hover:bg-muted/50 transition-colors">
              <Download className="h-4 w-4" />
              <span className="text-sm">Export</span>
            </button>
            
            <button className="p-2 bg-card border border-border rounded-md hover:bg-muted/50 transition-colors">
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trends */}
        <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
          <Widget title="Performance Trends" id="performance-trends">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={enhancedPerformanceData}
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
                    width={35}
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
                  <Area 
                    type="monotone" 
                    dataKey="industry" 
                    name="Industry Avg" 
                    fill="hsl(var(--muted))" 
                    stroke="hsl(var(--muted-foreground))" 
                    fillOpacity={0.3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="goal" 
                    name="Goal" 
                    stroke="hsl(var(--warning))" 
                    strokeDasharray="5 5"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    name="Your Performance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Widget>
        </div>
        
        {/* Financial Analysis */}
        <div className="animate-scale-in" style={{ animationDelay: '150ms' }}>
          <Widget title="Financial Analysis" id="financial-analysis">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={financialTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    width={40}
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
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    name="Income" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    name="Expenses" 
                    stackId="2"
                    stroke="hsl(var(--destructive))" 
                    fill="hsl(var(--destructive))" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    name="Savings" 
                    stackId="3"
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success))" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Widget>
        </div>
      </div>
      
      {/* Secondary Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Productivity by Hour */}
        <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
          <Widget title="Productivity by Hour" id="productivity-hour">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productivityByHourData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="hour" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    width={35}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius-md)',
                    }}
                    formatter={(value) => [`${value}%`, 'Productivity']}
                  />
                  <Bar 
                    dataKey="productivity" 
                    name="Productivity" 
                    radius={[4, 4, 0, 0]}
                  >
                    {
                      productivityByHourData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.productivity >= 85 ? 'hsl(var(--success))' : 
                                entry.productivity >= 70 ? 'hsl(var(--primary))' : 
                                'hsl(var(--muted))'}
                        />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Widget>
        </div>
        
        {/* Task Completion Status */}
        <div className="animate-scale-in" style={{ animationDelay: '250ms' }}>
          <Widget title="Task Completion Status" id="task-completion">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskCompletionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {taskCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius-md)',
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Widget>
        </div>
        
        {/* Activity Distribution */}
        <div className="animate-scale-in" style={{ animationDelay: '300ms' }}>
          <Widget title="Activity Distribution" id="activity-distribution">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 10, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Engagement" 
                    unit="%" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Time" 
                    unit="min" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius-md)',
                    }}
                    formatter={(value, name) => [value + (name === 'Engagement' ? '%' : 'min'), name]}
                  />
                  <Scatter 
                    name="Activities" 
                    data={scatterData} 
                    fill="hsl(var(--primary))"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Widget>
        </div>
      </div>
      
      {/* Detailed Analysis Section */}
      <div className="animate-scale-in" style={{ animationDelay: '350ms' }}>
        <Widget title="Expense Categories Breakdown" id="expense-categories">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={financialData.categories}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                layout="vertical"
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
                <XAxis 
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis 
                  type="category"
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius-md)',
                  }}
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  name="Amount"
                  radius={[0, 4, 4, 0]}
                >
                  {financialData.categories.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`hsl(${200 + index * 5}, 70%, 50%)`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Widget>
      </div>
    </PageTransition>
  );
}
