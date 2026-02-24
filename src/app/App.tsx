import { useState } from 'react';
import { ProfessionalDashboard } from './components/professional-dashboard';
import { LocalMarketplace } from './components/local-marketplace';
import { UserProfile } from './components/user-profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'marketplace' | 'profile'>('dashboard');

  return (
    <div className="size-full">
      {/* Screen Selector - Only visible in dev/demo mode */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
        <Tabs value={activeScreen} onValueChange={(value) => setActiveScreen(value as any)} className="w-auto">
          <TabsList className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Professional Dashboard
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Local Marketplace
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              User Profile
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Screen Content */}
      <div className="size-full">
        {activeScreen === 'dashboard' && <ProfessionalDashboard />}
        {activeScreen === 'marketplace' && (
          <div className="max-w-md mx-auto">
            <LocalMarketplace />
          </div>
        )}
        {activeScreen === 'profile' && <UserProfile />}
      </div>
    </div>
  );
}