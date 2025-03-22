
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Widget } from '@/components/dashboard/Widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/useTheme';
import { User, Lock, Bell, Eye, Globe, Moon, Sun, PaintBucket, Save } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  
  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6 flex space-x-1 overflow-x-auto pb-2 w-full">
          <TabsTrigger value="account" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <PaintBucket className="mr-2 h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Widget title="Account Settings" id="account-settings">
            <div className="space-y-6 p-4">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/5 flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-muted overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" defaultValue="Product Manager" />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      rows={4} 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      defaultValue="Product manager with 5+ years of experience in SaaS and enterprise software."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Widget>
        </TabsContent>
        
        <TabsContent value="security">
          <Widget title="Security Settings" id="security-settings">
            <div className="space-y-6 p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                
                <div className="space-y-4">
                  <div className="p-3 rounded-md bg-muted/50 flex justify-between items-center">
                    <div>
                      <p className="font-medium">This Device</p>
                      <p className="text-sm text-muted-foreground">Last active: Just now</p>
                    </div>
                    <Button variant="outline" size="sm">Current</Button>
                  </div>
                  
                  <div className="p-3 rounded-md bg-muted/50 flex justify-between items-center">
                    <div>
                      <p className="font-medium">MacBook Pro</p>
                      <p className="text-sm text-muted-foreground">Last active: 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">Log Out</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Widget>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Widget title="Notification Settings" id="notification-settings">
            <div className="space-y-6 p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task Reminders</p>
                      <p className="text-sm text-muted-foreground">Get notified about upcoming tasks</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Meeting Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive calendar event reminders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Team Updates</p>
                      <p className="text-sm text-muted-foreground">Get updates on team activities</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sound Alerts</p>
                      <p className="text-sm text-muted-foreground">Play sound for notifications</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Widget>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Widget title="Appearance Settings" id="appearance-settings">
            <div className="space-y-6 p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 p-4 rounded-lg border ${theme === 'light' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} hover:shadow-subtle transition-all flex flex-col items-center gap-4`}
                  >
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Sun className="h-6 w-6 text-yellow-500" />
                    </div>
                    <span className="font-medium">Light Mode</span>
                  </button>
                  
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 p-4 rounded-lg border ${theme === 'dark' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} hover:shadow-subtle transition-all flex flex-col items-center gap-4`}
                  >
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Moon className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="font-medium">Dark Mode</span>
                  </button>
                  
                  <button 
                    onClick={() => setTheme('system')}
                    className={`flex-1 p-4 rounded-lg border ${theme === 'system' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} hover:shadow-subtle transition-all flex flex-col items-center gap-4`}
                  >
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-blue-500"></div>
                    </div>
                    <span className="font-medium">System Default</span>
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Display Options</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reduce Motion</p>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">High Contrast</p>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Font Size</h3>
                
                <div className="flex justify-between items-center space-x-4">
                  <span className="text-sm">A</span>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    defaultValue="1"
                    className="flex-1 h-2 bg-muted rounded-full appearance-none focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                  <span className="text-lg">A</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Widget>
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
}
