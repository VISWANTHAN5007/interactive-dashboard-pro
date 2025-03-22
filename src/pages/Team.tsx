
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Widget } from '@/components/dashboard/Widget';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Mail, Phone, Calendar, Link2, MoreHorizontal } from 'lucide-react';

// Mock team members data
const teamMembers = [
  {
    id: 1,
    name: 'Olivia Martinez',
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'olivia.martinez@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    department: 'Product',
  },
  {
    id: 2,
    name: 'Ethan Wilson',
    role: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    email: 'ethan.wilson@example.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    department: 'Engineering',
  },
  {
    id: 3,
    name: 'Isabella Johnson',
    role: 'UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    email: 'isabella.johnson@example.com',
    phone: '+1 (555) 345-6789',
    status: 'active',
    department: 'Design',
  },
  {
    id: 4,
    name: 'William Thompson',
    role: 'Backend Developer',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    email: 'william.thompson@example.com',
    phone: '+1 (555) 456-7890',
    status: 'away',
    department: 'Engineering',
  },
  {
    id: 5,
    name: 'Sophia Lee',
    role: 'Marketing Specialist',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    email: 'sophia.lee@example.com',
    phone: '+1 (555) 567-8901',
    status: 'active',
    department: 'Marketing',
  },
  {
    id: 6,
    name: 'James Brown',
    role: 'Data Analyst',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    email: 'james.brown@example.com',
    phone: '+1 (555) 678-9012',
    status: 'offline',
    department: 'Analytics',
  },
];

// Departments for filtering
const departments = ['All', 'Product', 'Engineering', 'Design', 'Marketing', 'Analytics'];

export default function Team() {
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Filter team members based on selected department and search query
  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesDepartment = filter === 'All' || member.department === filter;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });
  
  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage your team members and collaborators</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-72">
          <Widget title="Departments" id="team-departments">
            <div className="space-y-1 p-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    filter === dept
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </Widget>
        </div>
        
        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTeamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-card rounded-lg border border-border shadow-subtle overflow-hidden hover:shadow-medium transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="relative">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div 
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                            member.status === 'active' ? 'bg-success' : 
                            member.status === 'away' ? 'bg-warning' : 'bg-muted-foreground'
                          }`}
                        ></div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-lg">{member.name}</h3>
                        <p className="text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-2 h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link2 className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
