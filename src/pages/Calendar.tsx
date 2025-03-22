
import React, { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Widget } from '@/components/dashboard/Widget';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Calendar as CalendarIcon, Clock, MapPin, Users, X } from 'lucide-react';

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  
  // Mock events data
  const events = [
    { id: 1, title: 'Team Meeting', time: '09:00 - 10:30', location: 'Conference Room A', attendees: 8 },
    { id: 2, title: 'Project Review', time: '11:00 - 12:00', location: 'Meeting Room B', attendees: 5 },
    { id: 3, title: 'Client Presentation', time: '14:00 - 15:30', location: 'Video Conference', attendees: 12 },
    { id: 4, title: 'Weekly Planning', time: '16:00 - 17:00', location: 'Main Office', attendees: 6 },
  ];
  
  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage your events</p>
        </div>
        <Button onClick={() => setShowEventForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Widget title="Calendar" id="calendar-widget">
            <div className="flex justify-center p-1">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </div>
          </Widget>
        </div>
        
        <div className="lg:col-span-2">
          <Widget title="Today's Events" id="events-widget">
            {showEventForm && (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Add New Event</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowEventForm(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="Enter event title" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-date">Date</Label>
                      <div className="flex">
                        <Input id="event-date" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="event-time">Time</Label>
                      <div className="flex">
                        <Input id="event-time" type="time" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="event-location">Location</Label>
                    <Input id="event-location" placeholder="Enter location" />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-attendees">Attendees</Label>
                    <Input id="event-attendees" placeholder="Add attendees" />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowEventForm(false)}>Cancel</Button>
                    <Button>Save Event</Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="p-4 rounded-lg border border-border hover:shadow-subtle transition-shadow"
                >
                  <h3 className="font-medium text-lg">{event.title}</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Widget>
        </div>
      </div>
    </PageTransition>
  );
}
