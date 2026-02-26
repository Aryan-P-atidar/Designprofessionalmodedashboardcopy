import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle, Send, Camera, Upload, X, Edit, Image } from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  platform: 'GitHub' | 'Figma' | 'Blog' | 'Website';
  thumbnail: string;
  link: string;
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

interface ProfessionalProfileProps {
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
    title: 'E-Commerce Dashboard',
    platform: 'GitHub',
    thumbnail: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400',
    link: '#'
  },
  {
    id: '2',
    title: 'Mobile App Design System',
    platform: 'Figma',
    thumbnail: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=400',
    link: '#'
  },
  {
    id: '3',
    title: 'React Performance Tips',
    platform: 'Blog',
    thumbnail: 'https://images.unsplash.com/photo-1565489030990-e211075fe11c?w=400',
    link: '#'
  },
  {
    id: '4',
    title: 'Portfolio Website v3',
    platform: 'Website',
    thumbnail: 'https://images.unsplash.com/photo-1694599048261-a1de00f0117e?w=400',
    link: '#'
  },
  {
    id: '5',
    title: 'Open Source React Library',
    platform: 'GitHub',
    thumbnail: 'https://images.unsplash.com/photo-1637937459053-c788742455be?w=400',
    link: '#'
  },
  {
    id: '6',
    title: 'SaaS Landing Page',
    platform: 'Figma',
    thumbnail: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400',
    link: '#'
  }
];

const chatMessages: ChatMessage[] = [
  {
    id: '1',
    author: 'Alex Kumar',
    avatar: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?w=100',
    message: 'Has anyone tried the new React 19 features?',
    timestamp: '2m ago'
  },
  {
    id: '2',
    author: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100',
    message: 'Yes! The new compiler is amazing 🚀',
    timestamp: '1m ago'
  },
  {
    id: '3',
    author: 'You',
    avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100',
    message: 'I wrote a blog post about it yesterday',
    timestamp: 'Just now'
  }
];

const platformLogos = {
  GitHub: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Figma: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
    </svg>
  ),
  Blog: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Website: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
};

export function ProfessionalProfile({ profilePhoto, setProfilePhoto, bannerImage, setBannerImage, personalInfo, setPersonalInfo }: ProfessionalProfileProps) {
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
        {/* Edit Banner Button */}
        <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <label 
            htmlFor="banner-upload"
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-lg cursor-pointer shadow-lg transition-colors"
          >
            <Image className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-900">Edit Banner</span>
            <input
              type="file"
              id="banner-upload"
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
              <AvatarFallback>SC</AvatarFallback>
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
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-3">
              <label 
                htmlFor="photo-upload"
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">Upload Photo</span>
                <input
                  type="file"
                  id="photo-upload"
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
                  placeholder="+1 (555) 123-4567"
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
                AI Verified: Frontend Developer
              </Badge>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>245 Connections</span>
                <span>•</span>
                <span>San Francisco, CA</span>
                <span>•</span>
                <span>Open to opportunities</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                Connect
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
          {/* Proof of Work Section */}
          <div className="col-span-9">
            <h2 className="text-2xl font-semibold mb-6">Proof of Work</h2>
            
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
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="text-white">
                          <h3 className="font-semibold mb-1">{project.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-purple-100">
                            {platformLogos[project.platform]}
                            <span>{project.platform}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {platformLogos[project.platform]}
                        <span>{project.platform}</span>
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
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">React</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">TypeScript</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Next.js</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Tailwind</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">UI/UX</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">Node.js</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Activity Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Profile Views</span>
                      <span className="font-semibold text-purple-700">1,234</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Post Impressions</span>
                      <span className="font-semibold text-purple-700">5,678</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Engagement Rate</span>
                      <span className="font-semibold text-purple-700">12.4%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-400 h-2 rounded-full" style={{width: '62%'}}></div>
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
                  <div className="font-semibold text-sm text-white">React Devs Raipur</div>
                  <div className="text-xs text-purple-100">8 members online</div>
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
