'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Activity, Camera, Lock, X } from 'lucide-react';
import { showToast } from '@/lib/utils';
import { authApiDirect } from '@/lib/api';
import Image from 'next/image';

interface UserProfile {
  displayName?: string;
  avatar?: string | null;
  activityHistory?: Array<{
    action: string;
    timestamp: Date;
    details: string;
  }>;
}

export default function ProfilePage() {
  const { user, loading, isAuthenticated, refreshUser } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/auth');
      return;
    }

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, loading]);

  // Initialize profile with user data when user is available
  useEffect(() => {
    if (user && !loadingProfile) {
      setProfile(prev => ({
        ...prev,
        displayName: prev.displayName || user.displayName || '',
        avatar: prev.avatar || user.avatar || null
      }));
    }
  }, [user, loadingProfile]);

  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);
      const response = await authApiDirect.getProfile() as { profile: UserProfile };
      console.log('Profile response:', response);
      
      if (response && response.profile) {
        const userProfile = response.profile;
        setProfile({
          displayName: userProfile.displayName || user?.displayName || '',
          avatar: userProfile.avatar || user?.avatar || null,
          activityHistory: userProfile.activityHistory || []
        });
      } else {
        // Fallback to user data from auth context
        setProfile({
          displayName: user?.displayName || '',
          avatar: user?.avatar || null,
          activityHistory: []
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to user data from auth context
      setProfile({
        displayName: user?.displayName || '',
        avatar: user?.avatar || null,
        activityHistory: []
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const updateProfile = async () => {
    try {
      setSaving(true);
      
      // Only include fields that have actually changed
      const updateData: { displayName?: string; avatar?: string | null } = {};
      
      // Check if displayName has changed
      if (profile.displayName !== user?.displayName) {
        updateData.displayName = profile.displayName;
      }
      
      // Check if avatar has changed
      if (profile.avatar !== user?.avatar) {
        updateData.avatar = profile.avatar;
      }
      
      // Only make the API call if there are actual changes
      if (Object.keys(updateData).length > 0) {
        console.log('Updating profile with changes:', updateData);
        await authApiDirect.updateProfile(updateData);
        showToast.success('Profile updated successfully');
        
        // Refresh the user data to update the navigation
        await refreshUser();
      } else {
        showToast.success('No changes to save');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        
        try {
          const response = await authApiDirect.uploadImage(base64Data) as { imageUrl: string };
          setProfile(prev => ({
            ...prev,
            avatar: response.imageUrl
          }));
          showToast.success('Image uploaded successfully');
        } catch (error) {
          console.error('Error uploading image:', error);
          showToast.error('Failed to upload image');
        } finally {
          setUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      showToast.error('Failed to process image');
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setProfile(prev => ({
      ...prev,
      avatar: null
    }));
  };

  const changePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast.error('New password must be at least 6 characters long');
      return;
    }

    try {
      setChangingPassword(true);
      await authApiDirect.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      showToast.success('Password changed successfully');
      setShowPasswordDialog(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      showToast.error('Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const getRecentActivity = () => {
    return profile.activityHistory?.slice(0, 5) || [];
  };

  const formatActivityAction = (action: string) => {
    const actionMap: { [key: string]: string } = {
      'quiz_completed': 'Completed Wellness Quiz',
      'service_viewed': 'Viewed Service',
      'product_viewed': 'Viewed Product',
      'podcast_listened': 'Listened to Podcast',
      'profile_updated': 'Updated Profile',
      'login': 'Logged In',
      'logout': 'Logged Out',
      'cart_added': 'Added to Cart',
      'wishlist_added': 'Added to Wishlist'
    };
    return actionMap[action] || action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600 text-lg">
          Manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <div className="relative mx-auto w-24 h-24 mb-4">
                {profile.avatar ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                      src={profile.avatar}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-purple-600" />
                  </div>
                )}
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <CardTitle className="text-xl">{profile.displayName || user?.displayName || 'User'}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <Badge variant="secondary" className="mt-2">
                {user?.role === 'admin' ? 'Administrator' : 'Member'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member since</span>
                  <span className="text-sm font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <Separator />
                <div className="text-center">
                  <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and choose a new one.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            placeholder="Enter current password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            placeholder="Confirm new password"
                          />
                        </div>
                        <Button 
                          onClick={changePassword}
                          disabled={changingPassword}
                          className="w-full"
                        >
                          {changingPassword ? 'Changing Password...' : 'Change Password'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profile.displayName || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Enter your display name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Your recent actions and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getRecentActivity().length > 0 ? (
                  <div className="space-y-3">
                    {getRecentActivity().reverse().map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Activity className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {formatActivityAction(activity.action)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity</p>
                    <p className="text-sm text-gray-400">Your activity will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={updateProfile}
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
