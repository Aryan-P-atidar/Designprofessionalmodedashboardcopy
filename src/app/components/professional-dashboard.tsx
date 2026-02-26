import { Home, Briefcase, MessageSquare, Bell, Search, Bookmark, MessageCircle, PlusCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProfessionalCreatePost } from './professional-create-post';
import { useState } from 'react';
import logoImage from 'figma:asset/b85553e46dc3e61311776017b919aefe2fcf1a19.png';

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
}

interface SideQuest {
  id: string;
  title: string;
  description: string;
  duration: string;
  tags: string[];
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100',
    tag: '#Hiring',
    content: 'Looking for a Senior React Developer to join our growing team. Remote-first company, competitive salary, and amazing benefits. Must have 5+ years of experience with modern React, TypeScript, and Next.js.',
    image: 'https://images.unsplash.com/photo-1646153114001-495dfb56506d?w=600',
    timestamp: '2h ago',
    replies: 12,
    bookmarks: 34
  },
  {
    id: '2',
    author: 'Alex Kumar',
    authorAvatar: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?w=100',
    tag: '#TechUpdate',
    content: 'Just shipped our new design system! Built with Tailwind CSS v4 and Radix UI. The developer experience is incredible. Check out the documentation and let me know what you think.',
    image: 'https://images.unsplash.com/photo-1637937459053-c788742455be?w=600',
    timestamp: '4h ago',
    replies: 8,
    bookmarks: 56
  },
  {
    id: '3',
    author: 'Maya Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100',
    tag: '#ProjectShowcase',
    content: 'Excited to share my latest project - a mobile-first e-commerce platform with real-time inventory tracking. Built with React Native and Firebase. The performance improvements are amazing!',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600',
    timestamp: '6h ago',
    replies: 15,
    bookmarks: 89
  }
];

const sideQuests: SideQuest[] = [
  {
    id: '1',
    title: 'Need a React Dev for the weekend',
    description: 'Quick project: Build a landing page with animations',
    duration: '2 days',
    tags: ['React', 'Framer Motion']
  },
  {
    id: '2',
    title: 'UI/UX Review Session',
    description: 'Looking for feedback on mobile app design',
    duration: '2 hours',
    tags: ['Design', 'Mobile']
  },
  {
    id: '3',
    title: 'API Integration Help',
    description: 'Need help integrating Stripe payment gateway',
    duration: '1 day',
    tags: ['Backend', 'Stripe']
  },
  {
    id: '4',
    title: 'Code Review Partner',
    description: 'Looking for someone to review my TypeScript code',
    duration: '3 hours',
    tags: ['TypeScript', 'Code Review']
  }
];

interface ProfessionalDashboardProps {
  onModeToggle: (isProfessional: boolean) => void;
  onNavigateToProfile: () => void;
  posts: Post[];
  onCreatePost: (content: string, image?: string) => void;
  userPhoto: string;
  userName: string;
  onNavigateToJobs?: () => void;
}

export function ProfessionalDashboard({ onModeToggle, onNavigateToProfile, posts, onCreatePost, userPhoto, userName, onNavigateToJobs }: ProfessionalDashboardProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handlePostCreate = (content: string, image?: string) => {
    onCreatePost(content, image);
  };

  // Combine user's posts with mock posts
  const allPosts = [...posts, ...mockPosts];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Create Post Dialog */}
      <ProfessionalCreatePost 
        isOpen={isCreatingPost}
        onClose={() => setIsCreatingPost(false)}
        onPost={handlePostCreate}
        userPhoto={userPhoto}
        userName={userName}
      />

      {/* Top Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-6">
          {/* Logo */}
          <img src={logoImage} alt="In-Folio" className="h-10 w-10 rounded-full object-cover ml-16" />
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jobs, people, or projects..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-6">
            <button className="flex flex-col items-center gap-1 text-purple-600">
              <Home className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </button>
            <button 
              onClick={onNavigateToJobs}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Briefcase className="w-6 h-6" />
              <span className="text-xs">Jobs</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs">Messages</span>
            </button>
            <button 
              onClick={() => setIsCreatingPost(true)}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
            >
              <PlusCircle className="w-6 h-6" />
              <span className="text-xs">Post</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="text-xs">Notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <Label htmlFor="mode-toggle" className="text-sm text-gray-500 cursor-pointer" onClick={() => onModeToggle(false)}>Market</Label>
            <Switch id="mode-toggle" checked onCheckedChange={(checked) => onModeToggle(checked)} />
            <Label htmlFor="mode-toggle" className="text-sm text-purple-600">Professional</Label>
          </div>
        </div>
      </nav>

      {/* Main Content - 3 Column Layout */}
      <div className="max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Center Column - Feed */}
        <main className="col-span-8">
          <div className="space-y-4">
            {allPosts.map((post) => (
              <Card key={post.id} className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{post.author}</div>
                          <div className="text-sm text-gray-500">{post.timestamp}</div>
                        </div>
                        <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                          {post.tag}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                  {/* Post Image */}
                  {post.image && (
                    <ImageWithFallback
                      src={post.image}
                      alt="Post content"
                      className="w-full rounded-lg mb-4 object-cover h-64"
                    />
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.replies} Replies</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <Bookmark className="w-5 h-5" />
                      <span className="text-sm">{post.bookmarks} Bookmarks</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Right Column - Side Quest Board */}
        <aside className="col-span-4">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4 px-2 text-gray-900">Side-Quest Board</h2>
            <div className="space-y-3">
              {sideQuests.map((quest) => (
                <Card key={quest.id} className="bg-white border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 text-gray-900">{quest.title}</h3>
                    <p className="text-xs text-gray-600 mb-3">{quest.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        {quest.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-purple-200 text-purple-700 bg-purple-50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-purple-600">{quest.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}