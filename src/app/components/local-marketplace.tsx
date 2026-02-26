import { Home, Briefcase, MessageSquare, Bell, Search, Bookmark, MessageCircle, PlusCircle, Heart, Send } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MarketplaceCreatePost } from './marketplace-create-post';
import { useState } from 'react';
import logoImage from 'figma:asset/b85553e46dc3e61311776017b919aefe2fcf1a19.png';

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
    author: 'Rajesh Kumar',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    tag: '#Hiring',
    content: 'Need a delivery partner for my new cloud kitchen in Raipur. Good pay, flexible hours, and daily payments. Must have own vehicle and smartphone. Contact immediately!',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600',
    timestamp: '1h ago',
    replies: 8,
    bookmarks: 15,
    likes: 3,
    isLiked: false,
    comments: [
      {
        id: '1',
        author: 'Priya Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        content: 'Interested! Can you provide more details?',
        timestamp: '30 minutes ago'
      }
    ]
  },
  {
    id: '2',
    author: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    tag: '#LocalBusiness',
    content: 'Just opened my boutique in City Center! Looking for a sales assistant who knows Hindi and English. Great opportunity for freshers. Walk-in interviews this Saturday.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
    timestamp: '3h ago',
    replies: 12,
    bookmarks: 28,
    likes: 5,
    isLiked: false,
    comments: [
      {
        id: '2',
        author: 'Amit Verma',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        content: 'I can help with that. What are the requirements?',
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: '3',
    author: 'Amit Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    tag: '#QuickGig',
    content: 'Urgent requirement: Need help with loading/unloading furniture. Today 5-8 PM. ₹800 for 3 hours. Location: Sector 21, Raipur. WhatsApp me!',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
    timestamp: '5h ago',
    replies: 6,
    bookmarks: 42,
    likes: 2,
    isLiked: false,
    comments: [
      {
        id: '3',
        author: 'Rajesh Kumar',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        content: 'I can do this. How do I proceed?',
        timestamp: '4 hours ago'
      }
    ]
  }
];

const sideQuests: SideQuest[] = [
  {
    id: '1',
    title: 'Weekend Helper Needed',
    description: 'Help with garden work this Saturday morning',
    duration: '4 hours',
    tags: ['Manual Work', 'Gardening']
  },
  {
    id: '2',
    title: 'Tutor for Class 10 Math',
    description: 'Need math tuition for my son, 3 days a week',
    duration: '1 month',
    tags: ['Teaching', 'Part-time']
  },
  {
    id: '3',
    title: 'Event Staff Required',
    description: 'Wedding event support needed next weekend',
    duration: '2 days',
    tags: ['Events', 'Catering']
  },
  {
    id: '4',
    title: 'Bike Mechanic Help',
    description: 'Looking for someone to help fix my motorcycle',
    duration: '2 hours',
    tags: ['Mechanic', 'Quick Fix']
  }
];

interface LocalMarketplaceProps {
  onModeToggle: (isProfessional: boolean) => void;
  onNavigateToProfile: () => void;
  posts: Post[];
  onCreatePost: (content: string, image?: string) => void;
  userPhoto: string;
  userName: string;
  onNavigateToGigs?: () => void;
}

export function LocalMarketplace({ onModeToggle, onNavigateToProfile, posts, onCreatePost, userPhoto, userName, onNavigateToGigs }: LocalMarketplaceProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([...posts, ...mockPosts]);
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const handlePostCreate = (content: string, image?: string) => {
    onCreatePost(content, image);
  };

  // Toggle like on a post
  const handleLike = (postId: string) => {
    setAllPosts(allPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Toggle comments section visibility
  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Handle comment input change
  const handleCommentChange = (postId: string, value: string) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  // Add a comment to a post
  const handleAddComment = (postId: string) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: userName,
      authorAvatar: userPhoto,
      content: commentText,
      timestamp: 'Just now'
    };

    setAllPosts(allPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
          replies: post.replies + 1
        };
      }
      return post;
    }));

    // Clear the input
    setCommentInputs(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Create Post Dialog */}
      <MarketplaceCreatePost 
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
                placeholder="Search for local jobs, gigs, or services..."
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
              onClick={onNavigateToGigs}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Briefcase className="w-6 h-6" />
              <span className="text-xs">Gigs</span>
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
            <Label htmlFor="mode-toggle" className="text-sm text-purple-600">Market</Label>
            <Switch id="mode-toggle" onCheckedChange={(checked) => onModeToggle(checked)} />
            <Label htmlFor="mode-toggle" className="text-sm text-gray-500 cursor-pointer" onClick={() => onModeToggle(true)}>Professional</Label>
          </div>
        </div>
      </nav>

      {/* Main Content - 2 Column Layout */}
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
                    <button 
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.replies} Replies</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <Bookmark className="w-5 h-5" />
                      <span className="text-sm">{post.bookmarks} Bookmarks</span>
                    </button>
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-500' : ''}`} />
                      <span className="text-sm">{post.likes} Likes</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments[post.id] && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {post.comments.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.authorAvatar} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Add Comment Input */}
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={userPhoto} />
                          <AvatarFallback>{userName[0]}</AvatarFallback>
                        </Avatar>
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddComment(post.id);
                            }
                          }}
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                        <button 
                          onClick={() => handleAddComment(post.id)}
                          className="text-purple-600 hover:text-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!commentInputs[post.id]?.trim()}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
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