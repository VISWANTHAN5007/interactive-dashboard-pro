
import React, { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Widget } from '@/components/dashboard/Widget';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { Button } from '@/components/ui/button';
import { 
  BarChart, LineChart, AreaChart, PieChart, ResponsiveContainer, 
  Bar, Line, Area, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell 
} from 'recharts';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, PlusCircle, Moon, Sun, BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon, Activity } from 'lucide-react';

// Sample data for charts
const data = [
  { name: 'Jan', value: 400, pv: 2400, amt: 2400 },
  { name: 'Feb', value: 300, pv: 1398, amt: 2210 },
  { name: 'Mar', value: 200, pv: 9800, amt: 2290 },
  { name: 'Apr', value: 278, pv: 3908, amt: 2000 },
  { name: 'May', value: 189, pv: 4800, amt: 2181 },
  { name: 'Jun', value: 239, pv: 3800, amt: 2500 },
];

const pieData = [
  { name: 'Group A', value: 400, color: '#FF6384' },
  { name: 'Group B', value: 300, color: '#36A2EB' },
  { name: 'Group C', value: 300, color: '#FFCE56' },
  { name: 'Group D', value: 200, color: '#4BC0C0' },
];

// Available widget types
const widgetTypes = [
  { id: 'bar', name: 'Bar Chart', icon: BarChart2 },
  { id: 'line', name: 'Line Chart', icon: LineChartIcon },
  { id: 'area', name: 'Area Chart', icon: Activity },
  { id: 'pie', name: 'Pie Chart', icon: PieChartIcon },
];

export default function Widgets() {
  const [widgets, setWidgets] = useState([
    { id: 'widget-1', type: 'bar', title: 'Bar Chart Widget' },
    { id: 'widget-2', type: 'line', title: 'Line Chart Widget' },
    { id: 'widget-3', type: 'area', title: 'Area Chart Widget' },
    { id: 'widget-4', type: 'pie', title: 'Pie Chart Widget' },
  ]);
  
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  
  const addWidget = (type) => {
    const newWidget = {
      id: `widget-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart Widget`
    };
    
    setWidgets([...widgets, newWidget]);
    setShowWidgetSelector(false);
  };
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setWidgets(items);
  };
  
  // Render specific chart based on widget type
  const renderChart = (type) => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };
  
  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Widgets</h1>
          <p className="text-muted-foreground">Customize your dashboard with drag-and-drop widgets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Grid className="mr-2 h-4 w-4" />
            Change Layout
          </Button>
          <Button onClick={() => setShowWidgetSelector(!showWidgetSelector)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Widget
          </Button>
        </div>
      </div>
      
      {showWidgetSelector && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in">
          {widgetTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => addWidget(type.id)}
                className="p-4 bg-card rounded-lg border border-border shadow-subtle hover:shadow-medium hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>
      )}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Widget title={widget.title} id={widget.id}>
                        <div className="p-2">
                          {renderChart(widget.type)}
                        </div>
                      </Widget>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </PageTransition>
  );
}
