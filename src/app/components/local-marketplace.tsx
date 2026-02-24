import { MapPin, Mic, ChevronDown, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface JobCard {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  location: string;
  distance: string;
  verified: boolean;
  jobType: string;
}

const mockJobs: JobCard[] = [
  {
    id: '1',
    title: 'Cafe Manager',
    company: 'The Coffee Hub',
    companyLogo: 'https://images.unsplash.com/photo-1648808694138-6706c5efc80a?w=100',
    salary: '₹18,000/month',
    location: 'Sector 21, Raipur',
    distance: '2km away',
    verified: true,
    jobType: 'Full-time'
  },
  {
    id: '2',
    title: 'Retail Staff',
    company: 'Fashion Central',
    companyLogo: 'https://images.unsplash.com/photo-1562280963-8a5475740a10?w=100',
    salary: '₹15,000/month',
    location: 'City Center Mall',
    distance: '3.5km away',
    verified: true,
    jobType: 'Full-time'
  },
  {
    id: '3',
    title: 'Delivery Partner',
    company: 'Quick Delivery Co.',
    companyLogo: 'https://images.unsplash.com/photo-1665360755361-d8cd03c82b28?w=100',
    salary: '₹20,000/month',
    location: 'Multiple locations',
    distance: '1.2km away',
    verified: true,
    jobType: 'Flexible hours'
  },
  {
    id: '4',
    title: 'Customer Service Rep',
    company: 'TechSupport Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1646153114001-495dfb56506d?w=100',
    salary: '₹22,000/month',
    location: 'Tech Park, Raipur',
    distance: '4km away',
    verified: true,
    jobType: 'Full-time'
  },
  {
    id: '5',
    title: 'Kitchen Helper',
    company: 'Spice Garden Restaurant',
    companyLogo: 'https://images.unsplash.com/photo-1648808694138-6706c5efc80a?w=100',
    salary: '₹16,500/month',
    location: 'MG Road',
    distance: '2.8km away',
    verified: true,
    jobType: 'Full-time'
  }
];

export function LocalMarketplace() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-semibold text-purple-600">ProNet</div>
          
          {/* Toggle Switch */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <Label htmlFor="mode-toggle-mobile" className="text-sm text-purple-600">Local</Label>
            <Switch id="mode-toggle-mobile" />
            <Label htmlFor="mode-toggle-mobile" className="text-sm text-gray-400">Professional</Label>
          </div>
          
          {/* Location Dropdown */}
          <button className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1.5 rounded-full">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span>2km</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 mb-6">
        <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-md border-2 border-dashed border-purple-300">
          <div className="bg-purple-600 p-4 rounded-full">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg mb-1">Speak to the AI Assistant</h2>
            <p className="text-sm text-gray-600">Build your profile in seconds with your voice</p>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="px-4 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Local Jobs Near You</h2>
        
        {mockJobs.map((job) => (
          <Card key={job.id} className="border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              {/* Job Header */}
              <div className="p-4 pb-3">
                <div className="flex items-start gap-3 mb-3">
                  <ImageWithFallback
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-0.5">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  {job.verified && (
                    <Badge className="bg-purple-100 text-purple-700 border-purple-300 gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Job Details - Prominent Tags */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                    <span className="text-xl">💰</span>
                    <div>
                      <div className="text-xs text-gray-600">Salary</div>
                      <div className="font-semibold text-purple-700">{job.salary}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-600">Location</div>
                      <div className="font-semibold text-gray-800 text-sm">{job.location}</div>
                    </div>
                    <Badge variant="outline" className="text-xs border-purple-300 text-purple-600 bg-purple-50">
                      {job.distance}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="bg-gray-100 px-2 py-1 rounded">{job.jobType}</span>
                  <span>Posted 2 hours ago</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-0 border-t border-gray-200">
                <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-4 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-semibold">Apply via WhatsApp</span>
                </button>
                
                <button className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-4 transition-colors border-l border-purple-700">
                  <Mic className="w-5 h-5" />
                  <span className="font-semibold">Record Audio Pitch</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-6"></div>
    </div>
  );
}