import { useState } from 'react';
import { Home, Briefcase, MessageSquare, Bell, Search, MapPin, ChevronDown, ChevronUp, PlusCircle, Heart, MessageCircle, DollarSign, Clock, MapPinIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import logoImage from 'figma:asset/b85553e46dc3e61311776017b919aefe2fcf1a19.png';

interface GigsMarketplaceProps {
  onModeToggle: (isProfessional: boolean) => void;
  onNavigateBack: () => void;
}

interface Category {
  id: string;
  name: string;
  items: string[];
  expanded: boolean;
  extraText?: string;
}

interface Gig {
  id: string;
  title: string;
  employer: string;
  employerAvatar: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  postedTime: string;
  tags: string[];
  applicants: number;
}

const mockGigs: Gig[] = [
  {
    id: '1',
    title: 'Delivery Driver Needed',
    employer: 'QuickBite Restaurant',
    employerAvatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100',
    location: 'Raipur, Sector 15',
    salary: '₹300-500/day',
    type: 'Part-time',
    description: 'Need reliable delivery driver with own bike. Flexible hours, daily payment. Must know local area well.',
    postedTime: '2h ago',
    tags: ['Delivery', 'Bike Required'],
    applicants: 12
  },
  {
    id: '2',
    title: 'Sales Associate - Fashion Store',
    employer: 'Style Hub Boutique',
    employerAvatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100',
    location: 'City Center Mall',
    salary: '₹12,000-15,000/month',
    type: 'Full-time',
    description: 'Looking for enthusiastic sales associate for our fashion boutique. Good communication skills required.',
    postedTime: '5h ago',
    tags: ['Retail', 'Customer Service'],
    applicants: 25
  },
  {
    id: '3',
    title: 'Barista - Coffee Shop',
    employer: 'Brew & Beans Cafe',
    employerAvatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100',
    location: 'Marine Drive',
    salary: '₹10,000-14,000/month',
    type: 'Full-time',
    description: 'Experienced barista needed for busy cafe. Knowledge of espresso machines required. Training provided.',
    postedTime: '1d ago',
    tags: ['Hospitality', 'Cafe'],
    applicants: 18
  },
  {
    id: '4',
    title: 'Warehouse Associate',
    employer: 'Metro Logistics',
    employerAvatar: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100',
    location: 'Industrial Area',
    salary: '₹13,000-16,000/month',
    type: 'Full-time',
    description: 'Warehouse worker needed for loading/unloading. Physical work. Good pay and benefits.',
    postedTime: '3d ago',
    tags: ['Logistics', 'Physical Work'],
    applicants: 32
  },
  {
    id: '5',
    title: 'Line Cook Required',
    employer: 'Spice Garden Restaurant',
    employerAvatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
    location: 'Downtown',
    salary: '₹15,000-20,000/month',
    type: 'Full-time',
    description: 'Experienced line cook for busy restaurant kitchen. Must know North Indian cuisine. Immediate joining.',
    postedTime: '4d ago',
    tags: ['Food Service', 'Cooking'],
    applicants: 15
  }
];

export function GigsMarketplace({ onModeToggle, onNavigateBack }: GigsMarketplaceProps) {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'retail',
      name: 'Retail & Sales',
      items: ['Sales Associate', 'Cashier', 'Stock Clerk', 'Visual Merchandiser', 'Retail Worker', 'Store Supervisor'],
      expanded: true
    },
    {
      id: 'restaurant',
      name: 'Restaurant & Hospitality',
      items: ['Server', 'Bartender', 'Barista'],
      expanded: true,
      extraText: 'Busser, Host/Hostess, Food Runner, Banquet Server, Cafe Manager, etc.'
    },
    {
      id: 'delivery',
      name: 'Delivery & Logistics',
      items: ['Delivery Driver (Bike/Car)', 'Warehouse Associate', 'Forklift Operator', 'Courier', 'Logistics Coordinator', 'Fleet Manager', 'Package Handler'],
      expanded: false
    },
    {
      id: 'general',
      name: 'General Service & Support',
      items: ['Customer Service Representative', 'Administrative Assistant', 'Janitor / Custodian', 'Maintenance Technician', 'Security Guard', 'Data Entry Clerk', 'Receptionist'],
      expanded: false
    },
    {
      id: 'food',
      name: 'Food Service Production',
      items: ['Line Cook', 'Prep Cook', 'Baker', 'Kitchen Helper', 'Food Assembler (Packaging)', 'Butcher', 'Pastry Chef'],
      expanded: false
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState(10);
  const [maxSalary, setMaxSalary] = useState(50);
  const [location, setLocation] = useState('');

  const toggleCategory = (categoryId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    ));
  };

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 text-gray-900">
      {/* Top Navigation */}
      <nav className="border-b border-white/30 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-6">
          {/* Logo */}
          <img src={logoImage} alt="In-Folio" className="h-10 w-10 rounded-full object-cover ml-16" />
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search for gigs, jobs, or categories..."
                className="w-full bg-white/70 border border-white/40 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-300 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-6">
            <button 
              onClick={onNavigateBack}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-purple-600">
              <Briefcase className="w-6 h-6" />
              <span className="text-xs">Gigs</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs">Messages</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
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
          <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-lg border border-white/40 backdrop-blur-sm">
            <Label htmlFor="mode-toggle" className="text-sm text-purple-600">Market</Label>
            <Switch id="mode-toggle" onCheckedChange={(checked) => onModeToggle(checked)} />
            <Label htmlFor="mode-toggle" className="text-sm text-gray-500 cursor-pointer" onClick={() => onModeToggle(true)}>Professional</Label>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">Available Gigs & Jobs</h1>
            <p className="text-gray-600">Find local opportunities in your area</p>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow">
            Post a Gig
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filter Sidebar */}
          <aside className="col-span-3">
            <div className="bg-gradient-to-br from-purple-100/60 via-pink-50/60 to-blue-50/60 backdrop-blur-sm rounded-2xl p-6 sticky top-24 shadow-sm border border-white/40">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Filter</h2>

              {/* Category Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-white/40">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
                      >
                        <span>{category.name}</span>
                        {category.expanded ? (
                          <ChevronUp className="w-4 h-4 text-purple-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-purple-500" />
                        )}
                      </button>

                      {category.expanded && (
                        <div className="space-y-2 mt-3 pt-3 border-t border-gray-200">
                          {category.items.map((item) => (
                            <label
                              key={item}
                              className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-purple-600 transition-colors group"
                            >
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item)}
                                onChange={() => toggleItem(item)}
                                className="mt-0.5 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer"
                              />
                              <span className="leading-tight">{item}</span>
                            </label>
                          ))}
                          {category.extraText && (
                            <p className="text-xs text-gray-500 italic mt-3 pl-6.5 leading-relaxed">
                              {category.extraText}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Location</h3>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-white/50 rounded-xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Salary Expectation Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Salary Expectation</h3>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/40">
                  <div className="space-y-4">
                    {/* Min Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-medium text-gray-600">Min</label>
                        <span className="text-xs font-semibold text-purple-600">₹{minSalary}k</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={minSalary}
                        onChange={(e) => setMinSalary(parseInt(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer accent-purple-600
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
                          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
                      />
                    </div>

                    {/* Max Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-medium text-gray-600">Max</label>
                        <span className="text-xs font-semibold text-purple-600">₹{maxSalary}k</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(parseInt(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer accent-purple-600
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
                          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
                      />
                    </div>

                    {/* Custom Input */}
                    <input
                      type="text"
                      placeholder="Custom"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Gigs Listings */}
          <main className="col-span-9">
            <div className="space-y-4">
              {mockGigs.map((gig) => (
                <Card key={gig.id} className="bg-white/80 backdrop-blur-sm border-white/60 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Employer Avatar */}
                      <Avatar className="w-16 h-16 border-2 border-purple-100">
                        <AvatarImage src={gig.employerAvatar} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {gig.employer[0]}
                        </AvatarFallback>
                      </Avatar>

                      {/* Gig Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {gig.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{gig.employer}</p>
                          </div>
                          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">
                            {gig.type}
                          </Badge>
                        </div>

                        {/* Location and Salary */}
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4 text-purple-500" />
                            <span>{gig.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="font-semibold text-green-600">{gig.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{gig.postedTime}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                          {gig.description}
                        </p>

                        {/* Tags */}
                        <div className="flex items-center gap-2 mb-4">
                          {gig.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-purple-200 text-purple-600 bg-purple-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>Contact</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <span className="text-xs text-gray-500">
                              {gig.applicants} applicants
                            </span>
                          </div>
                          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}