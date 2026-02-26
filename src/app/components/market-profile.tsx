import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle, Send, Camera, Upload, X, Edit, Image, Star } from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  rating: number;
}

interface ChatMessage {
  id: string;
  author: string;
  avatar: string;
  message: string;
  timestamp: string;
}

interface PersonalInfo {
  name: string;
  dob: string;
  email: string;
  phone: string;
}

interface MarketProfileProps {
  profilePhoto: string;
  setProfilePhoto: (photo: string) => void;
  bannerImage: string;
  setBannerImage: (image: string) => void;
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Home Cleaning Service',
    category: 'Services',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Plumbing Work',
    category: 'Repair',
    thumbnail: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Delivery Services',
    category: 'Transport',
    thumbnail: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Bike Repair',
    category: 'Mechanic',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.6
  },
  {
    id: '5',
    title: 'Painting & Decoration',
    category: 'Home Services',
    thumbnail: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
    rating: 4.8
  },
  {
    id: '6',
    title: 'Event Setup',
    category: 'Events',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
    rating: 4.9
  }
];

const chatMessages: ChatMessage[] = [
  {
    id: '1',
    author: 'Rajesh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    message: 'Great service! Very professional work 👍',
    timestamp: '1h ago'
  },
  {
    id: '2',
    author: 'Priya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    message: 'When are you available next week?',
    timestamp: '30m ago'
  },
  {
    id: '3',
    author: 'You',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    message: 'Available all days except Sunday',
    timestamp: 'Just now'
  }
];

export function MarketProfile({ profilePhoto, setProfilePhoto, bannerImage, setBannerImage, personalInfo, setPersonalInfo }: MarketProfileProps) {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        setIsEditingPhoto(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
        setIsEditingPhoto(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleSavePersonalInfo = () => {
    setIsEditingPersonalInfo(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Banner */}
      <div className="relative group">
        <ImageWithFallback
          src={bannerImage}
          alt="Profile banner"
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <label 
            htmlFor="banner-upload-market"
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-lg cursor-pointer shadow-lg transition-colors"
          >
            <Image className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-900">Edit Banner</span>
            <input
              type="file"
              id="banner-upload-market"
              accept="image/*"
              className="hidden"
              onChange={handleBannerUpload}
            />
          </label>
        </button>
        <div className="absolute -bottom-16 left-8">
          <button 
            onClick={() => setIsEditingPhoto(true)}
            className="relative group"
          >
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={profilePhoto} />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Edit Photo Modal */}
      {isEditingPhoto && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={() => setIsEditingPhoto(false)}
          />
          
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-white rounded-lg shadow-2xl p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Profile Photo</h3>
              <button 
                onClick={() => setIsEditingPhoto(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="mb-6">
              <Avatar className="w-32 h-32 mx-auto border-4 border-purple-600 shadow-lg mb-4">
                <AvatarImage src={profilePhoto} />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-3">
              <label 
                htmlFor="photo-upload-market"
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">Upload Photo</span>
                <input
                  type="file"
                  id="photo-upload-market"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
              
              <button className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 w-full transition-colors">
                <Camera className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">Take Photo</span>
              </button>
              
              <button 
                onClick={() => {
                  setIsEditingPhoto(false);
                  setIsEditingPersonalInfo(true);
                }}
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 w-full transition-colors"
              >
                <Edit className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">Edit Personal Info</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit Personal Info Modal */}
      {isEditingPersonalInfo && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={() => setIsEditingPersonalInfo(false)}
          />
          
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-white rounded-lg shadow-2xl p-6 w-[480px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Edit Personal Information</h3>
              <button 
                onClick={() => setIsEditingPersonalInfo(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={personalInfo.dob}
                  onChange={(e) => handlePersonalInfoChange('dob', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditingPersonalInfo(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePersonalInfo}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}

      {/* Profile Info */}
      <div className="pt-20 px-8 pb-6 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">{personalInfo.name}</h1>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 gap-1.5 mb-4">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                AI Verified: Local Service Provider
              </Badge>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  4.8 Rating (127 reviews)
                </span>
                <span>•</span>
                <span>Raipur, Chhattisgarh</span>
                <span>•</span>
                <span>Available for gigs</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                Hire Me
              </button>
              <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Services Portfolio */}
          <div className="col-span-9">
            <h2 className="text-2xl font-semibold mb-6">My Services</h2>
            
            <div className="grid grid-cols-3 gap-4 auto-rows-auto">
              {mockProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className={`bg-white border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer group ${
                    index === 1 || index === 4 ? 'row-span-2' : ''
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={project.thumbnail}
                        alt={project.title}
                        className={`w-full object-cover ${
                          index === 1 || index === 4 ? 'h-80' : 'h-48'
                        } group-hover:scale-105 transition-transform duration-300`}
                      />
                      <div className="absolute top-3 right-3 bg-white/95 px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{project.rating}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="text-white">
                          <h3 className="font-semibold mb-1">{project.title}</h3>
                          <p className="text-sm text-purple-100">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 bg-purple-50">
                          {project.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{project.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-3">
            <Card className="bg-white border-gray-200 mb-6 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Top Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Plumbing</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Electrical</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Cleaning</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Delivery</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Repair</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Painting</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Work Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Jobs Completed</span>
                      <span className="font-semibold text-purple-700">127</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Client Satisfaction</span>
                      <span className="font-semibold text-purple-700">96%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '96%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold text-purple-700">2 hrs</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-400 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 w-80 z-50">
        <Card className="bg-white border-gray-200 shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-purple-600 px-4 py-3 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-white" />
                <div>
                  <div className="font-semibold text-sm text-white">Local Workers Group</div>
                  <div className="text-xs text-purple-100">12 members online</div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-64 overflow-y-auto bg-gray-50">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback>{msg.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-gray-900">{msg.author}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 bg-white px-3 py-2 rounded-lg shadow-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <button className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
