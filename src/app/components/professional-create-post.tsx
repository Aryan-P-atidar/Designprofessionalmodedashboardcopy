import { useState } from 'react';
import { X, Bold, Italic, Underline, List, ListOrdered, Smile, Image, Video, FileText, BarChart3, Code, Loader2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface ProfessionalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (content: string, image?: string) => void;
  userPhoto: string;
  userName: string;
}

export function ProfessionalCreatePost({ isOpen, onClose, onPost, userPhoto, userName }: ProfessionalCreatePostProps) {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  if (!isOpen) return null;

  const handlePost = async () => {
    if (!content.trim()) return;
    
    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      onPost(content, selectedImage || undefined);
      setContent('');
      setSelectedImage(null);
      setIsPosting(false);
      onClose();
    }, 1500);
  };

  const handleImageSelect = () => {
    // Simulate image selection - in real app this would open file picker
    const imageUrl = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600';
    setSelectedImage(imageUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create a Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isPosting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={userPhoto} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900">{userName}</div>
              <div className="text-sm text-gray-500">Post to: Professional Network</div>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, projects, or professional updates..."
            className="w-full min-h-[150px] text-gray-900 placeholder-gray-400 resize-none focus:outline-none text-base leading-relaxed"
            disabled={isPosting}
          />

          {/* Image Preview */}
          {selectedImage && (
            <div className="mt-4 relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full rounded-lg object-cover max-h-64"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors"
                disabled={isPosting}
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-1 mt-4 pt-4 border-t border-gray-200">
            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 transition-colors" disabled={isPosting}>
              <Bold className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 transition-colors" disabled={isPosting}>
              <Italic className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 transition-colors" disabled={isPosting}>
              <Underline className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 transition-colors" disabled={isPosting}>
              <List className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 transition-colors" disabled={isPosting}>
              <ListOrdered className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 transition-colors" disabled={isPosting}>
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {/* Media Attachments */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleImageSelect}
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors group"
              disabled={isPosting}
            >
              <div className="p-2 group-hover:bg-purple-50 rounded-lg transition-colors">
                <Image className="w-6 h-6" />
              </div>
              <span className="text-xs">Add Media</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors group" disabled={isPosting}>
              <div className="p-2 group-hover:bg-purple-50 rounded-lg transition-colors">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-xs">Add Video</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors group" disabled={isPosting}>
              <div className="p-2 group-hover:bg-purple-50 rounded-lg transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs">Add Document</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors group" disabled={isPosting}>
              <div className="p-2 group-hover:bg-purple-50 rounded-lg transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="text-xs">Create Poll</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors group" disabled={isPosting}>
              <div className="p-2 group-hover:bg-purple-50 rounded-lg transition-colors">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-xs">Add Code</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            {content.length > 0 && `${content.length} characters`}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              disabled={isPosting}
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              disabled={!content.trim() || isPosting}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPosting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
