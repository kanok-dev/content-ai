'use client'

import { useState } from 'react'
import { User, Mail, Bell, Shield, CreditCard, Key, Globe, Moon, Sun, Laptop, Save, Camera, Trash2, LogOut, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [usageAlerts, setUsageAlerts] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    plan: 'Free',
    joinedAt: '2024-01-01'
  }

  return (
    <div className='space-y-6 max-w-4xl'>
      {/* Page Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Settings</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue='profile' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-4 lg:w-auto lg:inline-grid'>
          <TabsTrigger value='profile' className='gap-2'>
            <User className='h-4 w-4' />
            <span className='hidden sm:inline'>Profile</span>
          </TabsTrigger>
          <TabsTrigger value='notifications' className='gap-2'>
            <Bell className='h-4 w-4' />
            <span className='hidden sm:inline'>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value='appearance' className='gap-2'>
            <Sun className='h-4 w-4' />
            <span className='hidden sm:inline'>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value='security' className='gap-2'>
            <Shield className='h-4 w-4' />
            <span className='hidden sm:inline'>Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value='profile' className='space-y-6'>
          {/* Avatar Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center gap-6'>
              <Avatar className='h-24 w-24'>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className='text-2xl bg-blue-100 text-blue-600'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='space-y-2'>
                <Button variant='outline' size='sm'>
                  <Camera className='mr-2 h-4 w-4' />
                  Upload New Picture
                </Button>
                <p className='text-xs text-gray-500'>JPG, PNG or GIF. Max size 5MB.</p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input id='firstName' defaultValue='John' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input id='lastName' defaultValue='Doe' />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <div className='flex gap-2'>
                  <Input id='email' type='email' defaultValue={user.email} className='flex-1' />
                  <Badge variant='secondary' className='shrink-0 self-center'>
                    Verified
                  </Badge>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='company'>Company (Optional)</Label>
                <Input id='company' placeholder='Your company name' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='timezone'>Timezone</Label>
                <Select defaultValue='utc-8'>
                  <SelectTrigger>
                    <Globe className='mr-2 h-4 w-4' />
                    <SelectValue placeholder='Select timezone' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='utc-12'>UTC-12:00</SelectItem>
                    <SelectItem value='utc-8'>UTC-08:00 (Pacific Time)</SelectItem>
                    <SelectItem value='utc-5'>UTC-05:00 (Eastern Time)</SelectItem>
                    <SelectItem value='utc'>UTC+00:00 (GMT)</SelectItem>
                    <SelectItem value='utc+1'>UTC+01:00 (Central European)</SelectItem>
                    <SelectItem value='utc+8'>UTC+08:00 (Singapore)</SelectItem>
                    <SelectItem value='utc+9'>UTC+09:00 (Japan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className='border-t pt-6'>
              <Button>
                <Save className='mr-2 h-4 w-4' />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          {/* Subscription Info */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='flex items-center gap-4'>
                  <div className='rounded-full bg-gray-100 p-3 dark:bg-gray-800'>
                    <CreditCard className='h-5 w-5 text-gray-600 dark:text-gray-400' />
                  </div>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>{user.plan} Plan</p>
                    <p className='text-sm text-gray-500'>Member since {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <Button variant='outline'>Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value='notifications' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you want to receive</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Product Updates</Label>
                  <p className='text-sm text-gray-500'>Get notified about new features and improvements</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Marketing Emails</Label>
                  <p className='text-sm text-gray-500'>Receive tips, tutorials, and promotional content</p>
                </div>
                <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Usage Alerts</Label>
                  <p className='text-sm text-gray-500'>Get notified when your credits are running low</p>
                </div>
                <Switch checked={usageAlerts} onCheckedChange={setUsageAlerts} />
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Weekly Report</Label>
                  <p className='text-sm text-gray-500'>Weekly summary of your content generation activity</p>
                </div>
                <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value='appearance' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Select your preferred theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 sm:grid-cols-3'>
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      theme === t ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className={`rounded-full p-3 ${theme === t ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {t === 'light' && <Sun className={`h-5 w-5 ${theme === t ? 'text-blue-600' : 'text-gray-600'}`} />}
                      {t === 'dark' && <Moon className={`h-5 w-5 ${theme === t ? 'text-blue-400' : 'text-gray-400'}`} />}
                      {t === 'system' && <Laptop className={`h-5 w-5 ${theme === t ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />}
                    </div>
                    <span className={`text-sm font-medium capitalize ${theme === t ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{t}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Set your language and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Language</Label>
                <Select defaultValue='en'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>English</SelectItem>
                    <SelectItem value='es'>Español</SelectItem>
                    <SelectItem value='fr'>Français</SelectItem>
                    <SelectItem value='de'>Deutsch</SelectItem>
                    <SelectItem value='pt'>Português</SelectItem>
                    <SelectItem value='ja'>日本語</SelectItem>
                    <SelectItem value='zh'>中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label>Date Format</Label>
                <Select defaultValue='mdy'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select format' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='mdy'>MM/DD/YYYY</SelectItem>
                    <SelectItem value='dmy'>DD/MM/YYYY</SelectItem>
                    <SelectItem value='ymd'>YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value='security' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='currentPassword'>Current Password</Label>
                <Input id='currentPassword' type='password' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='newPassword'>New Password</Label>
                <Input id='newPassword' type='password' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <Input id='confirmPassword' type='password' />
              </div>
            </CardContent>
            <CardFooter className='border-t pt-6'>
              <Button>
                <Key className='mr-2 h-4 w-4' />
                Update Password
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='flex items-center gap-4'>
                  <div className='rounded-full bg-gray-100 p-3 dark:bg-gray-800'>
                    <Shield className='h-5 w-5 text-gray-600 dark:text-gray-400' />
                  </div>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>Two-Factor Authentication</p>
                    <p className='text-sm text-gray-500'>Not enabled</p>
                  </div>
                </div>
                <Button variant='outline'>Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active sessions across devices</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='flex items-center gap-4'>
                  <div className='rounded-full bg-green-100 p-2 dark:bg-green-900'>
                    <Laptop className='h-4 w-4 text-green-600 dark:text-green-400' />
                  </div>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>MacBook Pro • Chrome</p>
                    <p className='text-sm text-gray-500'>San Francisco, CA • Current session</p>
                  </div>
                </div>
                <Badge variant='secondary' className='bg-green-100 text-green-700'>
                  Active
                </Badge>
              </div>
            </CardContent>
            <CardFooter className='border-t pt-6'>
              <Button variant='outline' className='text-red-600 hover:bg-red-50 hover:text-red-700'>
                <LogOut className='mr-2 h-4 w-4' />
                Sign Out All Devices
              </Button>
            </CardFooter>
          </Card>

          {/* Danger Zone */}
          <Card className='border-red-200 dark:border-red-900'>
            <CardHeader>
              <CardTitle className='text-red-600'>Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20'>
                <div className='flex items-center gap-4'>
                  <AlertTriangle className='h-5 w-5 text-red-600' />
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>Delete Account</p>
                    <p className='text-sm text-gray-500'>Permanently delete your account and all data</p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='destructive'>
                      <Trash2 className='mr-2 h-4 w-4' />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers, including:
                        <ul className='mt-2 list-disc pl-4 space-y-1'>
                          <li>All your generated content history</li>
                          <li>Your remaining credits</li>
                          <li>Your subscription and billing information</li>
                          <li>Your account settings and preferences</li>
                        </ul>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant='outline'>Cancel</Button>
                      <Button variant='destructive'>Yes, Delete My Account</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
