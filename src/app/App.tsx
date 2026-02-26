import { useState } from 'react';
import { ProfessionalDashboard } from './components/professional-dashboard';
import { LocalMarketplace } from './components/local-marketplace';
import { ProfessionalProfile } from './components/professional-profile';
import { MarketProfile } from './components/market-profile';
import { JobsDashboard } from './components/jobs-dashboard';
import { GigsMarketplace } from './components/gigs-marketplace';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ProfileDrawer } from './components/profile-drawer';
import { Menu } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  tag: string;
  content: string;
  image?: string;
  timestamp: string;
  replies: number;
  bookmarks: number;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'marketplace' | 'profile' | 'jobs' | 'gigs'>('marketplace');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profileMode, setProfileMode] = useState<'professional' | 'market'>('professional'); // Track which profile to show
  
  // Professional Mode posts state
  const [professionalPosts, setProfessionalPosts] = useState<Post[]>([]);
  
  // Market Mode posts state
  const [marketplacePosts, setMarketplacePosts] = useState<Post[]>([]);
  
  // Professional Mode profile state
  const [profProfilePhoto, setProfProfilePhoto] = useState('https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200');
  const [profBannerImage, setProfBannerImage] = useState('https://images.unsplash.com/photo-1665707888808-d44ad6ff690d?w=1200');
  const [profPersonalInfo, setProfPersonalInfo] = useState({
    name: 'Sarah Chen',
    dob: '1995-06-15',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 123-4567'
  });

  // Market Mode profile state (separate from Professional)
  const [marketProfilePhoto, setMarketProfilePhoto] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200');
  const [marketBannerImage, setMarketBannerImage] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200');
  const [marketPersonalInfo, setMarketPersonalInfo] = useState({
    name: 'Aryan Patidar',
    dob: '1998-03-22',
    email: 'aryan.patidar@example.com',
    phone: '+91 98765 43210'
  });

  // Determine which profile to use based on the current mode
  const currentMode = activeScreen === 'marketplace' || activeScreen === 'gigs' ? 'market' : 
                      activeScreen === 'profile' ? profileMode : 
                      'professional';
  const profilePhoto = currentMode === 'market' ? marketProfilePhoto : profProfilePhoto;
  const bannerImage = currentMode === 'market' ? marketBannerImage : profBannerImage;
  const personalInfo = currentMode === 'market' ? marketPersonalInfo : profPersonalInfo;
  const setProfilePhoto = currentMode === 'market' ? setMarketProfilePhoto : setProfProfilePhoto;
  const setBannerImage = currentMode === 'market' ? setMarketBannerImage : setProfBannerImage;
  const setPersonalInfo = currentMode === 'market' ? setMarketPersonalInfo : setProfPersonalInfo;

  // Handler for toggle switch - switches between Professional and Local modes
  const handleModeToggle = (isProfessional: boolean) => {
    if (isProfessional) {
      setActiveScreen('dashboard');
    } else {
      setActiveScreen('marketplace');
    }
  };

  // Handler to navigate to user profile
  const handleNavigateToProfile = () => {
    // Set the profile mode based on current screen
    if (activeScreen === 'marketplace' || activeScreen === 'gigs') {
      setProfileMode('market');
    } else {
      setProfileMode('professional');
    }
    setActiveScreen('profile');
  };

  // Handler to navigate between screens from drawer
  const handleNavigate = (screen: 'dashboard' | 'marketplace' | 'profile' | 'jobs' | 'gigs') => {
    // When navigating from drawer, set the profile mode based on current context
    if (screen === 'profile') {
      if (activeScreen === 'marketplace' || activeScreen === 'gigs') {
        setProfileMode('market');
      } else {
        setProfileMode('professional');
      }
    }
    setActiveScreen(screen);
  };

  // Handler to create a professional post
  const handleCreateProfessionalPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: `prof-${Date.now()}`,
      author: profPersonalInfo.name,
      authorAvatar: profProfilePhoto,
      tag: '#Update',
      content,
      image,
      timestamp: 'Just now',
      replies: 0,
      bookmarks: 0,
      likes: 0,
      isLiked: false,
      comments: []
    };
    setProfessionalPosts([newPost, ...professionalPosts]);
  };

  // Handler to create a marketplace post
  const handleCreateMarketplacePost = (content: string, image?: string) => {
    const newPost: Post = {
      id: `market-${Date.now()}`,
      author: marketPersonalInfo.name,
      authorAvatar: marketProfilePhoto,
      tag: '#LocalGig',
      content,
      image,
      timestamp: 'Just now',
      replies: 0,
      bookmarks: 0,
      likes: 0,
      isLiked: false,
      comments: []
    };
    setMarketplacePosts([newPost, ...marketplacePosts]);
  };

  return (
    <div className="size-full">
      {/* Profile Drawer */}
      <ProfileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        profilePhoto={profilePhoto}
        userName={personalInfo.name}
        profileMode={profileMode}
      />
      
      {/* Drawer Toggle Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed left-4 top-4 z-[85] bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Open profile menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Screen Content */}
      <div className="size-full">
        {activeScreen === 'dashboard' && (
          <ProfessionalDashboard 
            onModeToggle={handleModeToggle} 
            onNavigateToProfile={handleNavigateToProfile}
            posts={professionalPosts}
            onCreatePost={handleCreateProfessionalPost}
            userPhoto={profProfilePhoto}
            userName={profPersonalInfo.name}
            onNavigateToJobs={() => setActiveScreen('jobs')}
          />
        )}
        {activeScreen === 'marketplace' && (
          <LocalMarketplace 
            onModeToggle={handleModeToggle} 
            onNavigateToProfile={handleNavigateToProfile}
            posts={marketplacePosts}
            onCreatePost={handleCreateMarketplacePost}
            userPhoto={marketProfilePhoto}
            userName={marketPersonalInfo.name}
            onNavigateToGigs={() => setActiveScreen('gigs')}
          />
        )}
        {activeScreen === 'profile' && (
          <>
            {profileMode === 'professional' ? (
              <ProfessionalProfile 
                profilePhoto={profProfilePhoto}
                setProfilePhoto={setProfProfilePhoto}
                bannerImage={profBannerImage}
                setBannerImage={setProfBannerImage}
                personalInfo={profPersonalInfo}
                setPersonalInfo={setProfPersonalInfo}
              />
            ) : (
              <MarketProfile 
                profilePhoto={marketProfilePhoto}
                setProfilePhoto={setMarketProfilePhoto}
                bannerImage={marketBannerImage}
                setBannerImage={setMarketBannerImage}
                personalInfo={marketPersonalInfo}
                setPersonalInfo={setMarketPersonalInfo}
              />
            )}
          </>
        )}
        {activeScreen === 'jobs' && (
          <JobsDashboard 
            onModeToggle={handleModeToggle}
            onNavigateBack={() => setActiveScreen('dashboard')}
          />
        )}
        {activeScreen === 'gigs' && (
          <GigsMarketplace 
            onModeToggle={handleModeToggle}
            onNavigateBack={() => setActiveScreen('marketplace')}
          />
        )}
      </div>
    </div>
  );
}