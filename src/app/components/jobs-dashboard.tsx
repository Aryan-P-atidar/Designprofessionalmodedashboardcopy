import { useState } from 'react';
import { Home, Briefcase, MessageSquare, Bell, Search, MapPin, ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import logoImage from 'figma:asset/b85553e46dc3e61311776017b919aefe2fcf1a19.png';

interface JobsDashboardProps {
  onModeToggle: (isProfessional: boolean) => void;
  onNavigateBack: () => void;
}

interface Category {
  id: string;
  name: string;
  subcategories: {
    name: string;
    fields: string[];
  }[];
}

export function JobsDashboard({ onModeToggle, onNavigateBack }: JobsDashboardProps) {
  const [expandedCategory, setExpandedCategory] = useState<string>('technology');
  const [expandedSubcategory, setExpandedSubcategory] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState(50000);
  const [maxSalary, setMaxSalary] = useState(150000);
  const [showFilters, setShowFilters] = useState(false);

  const categories: Category[] = [
    { 
      id: 'technology', 
      name: 'Technology & Digital', 
      subcategories: [
        { name: 'Software Development', fields: ['SaaS', 'Mobile Apps', 'Web Platforms', 'DevOps'] },
        { name: 'AI & Data', fields: ['Machine Learning', 'Data Visualization', 'Analytics Dashboards'] },
        { name: 'Cybersecurity', fields: ['Identity Management', 'Encryption', 'Security Auditing'] },
        { name: 'Infrastructure', fields: ['Cloud Computing', 'Web3/Blockchain', 'IoT'] },
      ]
    },
    { 
      id: 'healthcare', 
      name: 'Healthcare & Wellness',
      subcategories: [
        { name: 'Clinical', fields: ['Telemedicine', 'Patient Management', 'Hospital Systems'] },
        { name: 'BioTech', fields: ['Lab Research', 'Pharmaceuticals', 'Genomic Data'] },
        { name: 'HealthTech', fields: ['Fitness Tracking', 'Mental Health Apps', 'Wearables'] },
        { name: 'Insurance', fields: ['Medical Billing', 'Claims Processing', 'Policy Management'] },
      ]
    },
    { 
      id: 'commerce', 
      name: 'Commerce & Finance',
      subcategories: [
        { name: 'Banking', fields: ['Personal Finance', 'Investment Portfolios', 'Neobanking'] },
        { name: 'E-commerce', fields: ['Retail', 'Marketplaces', 'B2B Procurement'] },
        { name: 'Payments', fields: ['POS Systems', 'Crypto Wallets', 'Payment Gateways'] },
        { name: 'Real Estate', fields: ['PropTech', 'Property Management', 'Mortgage Services'] },
      ]
    },
    { 
      id: 'marketing', 
      name: 'Marketing & Creative',
      subcategories: [
        { name: 'Advertising', fields: ['Campaign Management', 'AdTech', 'Social Media'] },
        { name: 'Branding', fields: ['Identity Systems', 'Style Guides', 'Presentation Design'] },
        { name: 'Content', fields: ['CMS', 'Digital Asset Management'] },
        { name: 'Research', fields: ['User Testing', 'Market Analysis', 'Surveying Tools'] },
      ]
    },
    { 
      id: 'education', 
      name: 'Education & Human Resources',
      subcategories: [
        { name: 'EdTech', fields: ['Learning Management Systems (LMS)', 'Online Courses', 'K-12'] },
        { name: 'HR Tech', fields: ['Recruitment', 'Employee Onboarding', 'Payroll', 'Performance Reviews'] },
        { name: 'Collaboration', fields: ['Productivity Tools', 'Project Management', 'Virtual Office'] },
      ]
    },
    { 
      id: 'industrial', 
      name: 'Industrial & Environmental',
      subcategories: [
        { name: 'Logistics', fields: ['Supply Chain', 'Fleet Management', 'Last-mile Delivery'] },
        { name: 'Sustainability', fields: ['Green Energy', 'ESG Reporting', 'Carbon Tracking'] },
        { name: 'Manufacturing', fields: ['Smart Factories', 'CAD Tools', 'Inventory Control'] },
      ]
    },
  ];

  const jobs = [
    {
      id: 1,
      company: 'Microsoft',
      logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100',
      title: 'Cyber Security Intern',
      description: 'Focus on identity management and encryption protocols. Work with Azure Security Center and implement zero-trust architecture...',
      location: 'Remote',
      salary: '$60k - $80k',
      type: 'Internship'
    },
    {
      id: 2,
      company: 'Google Cloud',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100',
      title: 'Cloud Computing Engineer',
      description: 'Manage scalable DevOps infrastructure, implement CI/CD pipelines, and optimize cloud resource utilization across GCP...',
      location: 'Hybrid - California',
      salary: '$120k - $160k',
      type: 'Full-time'
    },
    {
      id: 3,
      company: 'Amazon Web Services',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
      title: 'Senior AI/ML Engineer',
      description: 'Develop machine learning models for predictive analytics, work with large-scale data pipelines, and deploy AI solutions...',
      location: 'Seattle, WA',
      salary: '$140k - $180k',
      type: 'Full-time'
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? '' : categoryId);
  };

  const toggleSubcategory = (subcategoryName: string) => {
    setExpandedSubcategory(expandedSubcategory === subcategoryName ? '' : subcategoryName);
  };

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  // Filter panel content
  const FilterPanel = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {showFilters && (
          <button 
            onClick={() => setShowFilters(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Profession Categories */}
      <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              <span className="text-left">{category.name}</span>
              {category.subcategories.length > 0 && (
                expandedCategory === category.id ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />
              )}
            </button>
            
            {expandedCategory === category.id && category.subcategories.length > 0 && (
              <div className="ml-2 mt-2 space-y-2">
                {category.subcategories.map((sub) => (
                  <div key={sub.name}>
                    <button
                      onClick={() => toggleSubcategory(sub.name)}
                      className="w-full flex items-center justify-between py-2 text-xs font-medium text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <span className="text-left">{sub.name}</span>
                      {sub.fields.length > 0 && (
                        expandedSubcategory === sub.name ? <ChevronUp className="w-3 h-3 flex-shrink-0" /> : <ChevronDown className="w-3 h-3 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedSubcategory === sub.name && sub.fields.length > 0 && (
                      <div className="ml-3 mt-2 space-y-2">
                        {sub.fields.map((field) => (
                          <label key={field} className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer hover:text-purple-600">
                            <input
                              type="checkbox"
                              checked={selectedFilters.includes(field)}
                              onChange={() => toggleFilter(field)}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5 flex-shrink-0"
                            />
                            <span className="break-words">{field}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="e.g., Remote, Indore, Not Applicable"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Experience Level
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
          <option>Entry Level</option>
          <option>Mid Level</option>
          <option>Senior Level</option>
          <option>Executive</option>
        </select>
      </div>

      {/* Salary Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Salary Range
        </label>
        <div className="space-y-4">
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="300000"
              value={minSalary}
              onChange={(e) => setMinSalary(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Min: ${minSalary.toLocaleString()}</span>
            </div>
          </div>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="300000"
              value={maxSalary}
              onChange={(e) => setMaxSalary(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Max: ${maxSalary.toLocaleString()}</span>
            </div>
          </div>
          <input
            type="text"
            placeholder="Custom Salary"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors">
        Apply Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-3 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-6">
          {/* Logo */}
          <img src={logoImage} alt="In-Folio" className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover md:ml-16" />
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 text-xs md:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <button 
              onClick={onNavigateBack}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Home className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs hidden lg:inline">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-purple-600">
              <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs hidden lg:inline">Jobs</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs hidden lg:inline">Messages</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors relative">
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs hidden lg:inline">Notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Toggle Switch */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 md:px-4 py-2 rounded-lg border border-gray-200">
            <Label htmlFor="mode-toggle" className="text-xs md:text-sm text-gray-500 cursor-pointer" onClick={() => onModeToggle(false)}>Market</Label>
            <Switch id="mode-toggle" checked onCheckedChange={(checked) => onModeToggle(checked)} />
            <Label htmlFor="mode-toggle" className="text-xs md:text-sm text-purple-600">Pro</Label>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-3 md:px-6 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters (Desktop) */}
          <aside className="hidden lg:block lg:w-[280px] xl:w-[320px] flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          {/* Mobile Filter Drawer */}
          {showFilters && (
            <>
              <div 
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowFilters(false)}
              />
              <div className="lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white overflow-y-auto">
                <div className="p-4">
                  <FilterPanel />
                </div>
              </div>
            </>
          )}

          {/* Main Content - Job Listings */}
          <main className="flex-1 min-w-0">
            <div className="mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                Job Postings (Personalized for you)
              </h1>
              <p className="text-sm md:text-base text-gray-500">Searched Jobs</p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      {/* Company Logo */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img 
                          src={job.logo} 
                          alt={job.company}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <div className="min-w-0">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-600 font-medium">{job.company}</p>
                          </div>
                          <button className="px-4 md:px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm whitespace-nowrap">
                            More
                          </button>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm">
                          <span className="inline-flex items-center gap-1 text-gray-500">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </span>
                          <span className="text-purple-600 font-medium">{job.salary}</span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-6 text-center">
              <button className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                Load More Jobs
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
