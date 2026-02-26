import { useState } from 'react';
import { X, ChevronRight, Settings, Eye, Gamepad2, Bookmark, Users, Shield, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeScreen: 'dashboard' | 'marketplace' | 'profile';
  onNavigate: (screen: 'dashboard' | 'marketplace' | 'profile') => void;
  profilePhoto: string;
  userName: string;
  profileMode: 'professional' | 'market';
}

export function ProfileDrawer({ isOpen, onClose, activeScreen, onNavigate, profilePhoto, userName, profileMode }: ProfileDrawerProps) {
  const handleNavigation = (screen: 'dashboard' | 'marketplace' | 'profile') => {
    onNavigate(screen);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[90] transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-[95] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="p-4 border-b border-gray-200">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200">
            {/* Profile Picture */}
            <button 
              onClick={() => handleNavigation('profile')}
              className="mb-4 hover:opacity-80 transition-opacity"
            >
              <ImageWithFallback
                src={profilePhoto}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-600"
              />
            </button>
            
            {/* User Info */}
            <button 
              onClick={() => handleNavigation('profile')}
              className="mb-3 text-left w-full hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold text-gray-900">{userName}</h2>
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Student at Medicaps University</p>
              <p className="text-sm text-gray-500">Indore, Madhya Pradesh, India</p>
            </button>
            
            {/* University Badge */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-600 rounded-sm" />
              </div>
              <span className="font-medium">Medicaps University</span>
            </div>
          </div>
          
          {/* Analytics Section */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-semibold">16 profile viewers</span>
            </div>
            <button className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors">
              View all analytics
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <nav className="py-2">
              <button 
                onClick={() => {
                  // Determine home based on profile mode when on profile page
                  const homeScreen = activeScreen === 'profile' 
                    ? (profileMode === 'market' ? 'marketplace' : 'dashboard')
                    : (activeScreen === 'marketplace' ? 'marketplace' : 'dashboard');
                  handleNavigation(homeScreen);
                }}
                className="w-full px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-600 group-hover:text-purple-600 transition-colors">
                  <Home className="w-5 h-5" />
                </span>
                <span className="font-semibold text-gray-900 flex-1 text-left">Home</span>
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <MenuItem icon={<Bookmark className="w-5 h-5" />} label="Saved posts" />
              <MenuItem icon={<Users className="w-5 h-5" />} label="Groups" />
            </nav>
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-200">
            <button className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Settings</span>
            </button>
            
            <div className="bg-yellow-100 px-6 py-4 border-t border-yellow-200">
              <button className="w-full text-center font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                Try Premium for ₹0
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors group">
      <span className="text-gray-600 group-hover:text-purple-600 transition-colors">{icon}</span>
      <span className="font-semibold text-gray-900 flex-1 text-left">{label}</span>
      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}