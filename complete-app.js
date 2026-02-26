// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    currentPage: 'marketplace',
    profileMode: 'market',
    
    professional: {
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        phone: '+1 (555) 123-4567',
        dob: '1995-06-15',
        photo: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200',
        banner: 'https://images.unsplash.com/photo-1665707888808-d44ad6ff690d?w=1200',
        posts: []
    },
    
    market: {
        name: 'Aryan Patidar',
        email: 'aryan.patidar@example.com',
        phone: '+91 98765 43210',
        dob: '1998-03-22',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200',
        posts: []
    },
    
    getCurrentProfile() {
        if (this.currentPage === 'marketplace' || this.currentPage === 'gigs') {
            return this.market;
        } else if (this.currentPage === 'profile') {
            return this.profileMode === 'market' ? this.market : this.professional;
        } else {
            return this.professional;
        }
    }
};

// ============================================
// MOCK DATA
// ============================================
const marketMockPosts = [
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
        comments: [{
            id: '1',
            author: 'Priya Sharma',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            content: 'Interested! Can you provide more details?',
            timestamp: '30 minutes ago'
        }]
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
        comments: []
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
        comments: []
    }
];

const professionalMockPosts = [
    {
        id: '1',
        author: 'Sarah Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100',
        tag: '#Hiring',
        content: 'Looking for a Senior React Developer to join our growing team. Remote-first company, competitive salary, and amazing benefits. Must have 5+ years of experience with modern React, TypeScript, and Next.js.',
        image: 'https://images.unsplash.com/photo-1646153114001-495dfb56506d?w=600',
        timestamp: '2h ago',
        replies: 12,
        bookmarks: 34,
        likes: 8,
        isLiked: false,
        comments: []
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
        bookmarks: 56,
        likes: 15,
        isLiked: false,
        comments: []
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
        bookmarks: 89,
        likes: 23,
        isLiked: false,
        comments: []
    }
];

const marketSideQuests = [
    { id: '1', title: 'Weekend Helper Needed', description: 'Help with garden work this Saturday morning', duration: '4 hours', tags: ['Manual Work', 'Gardening'] },
    { id: '2', title: 'Tutor for Class 10 Math', description: 'Need math tuition for my son, 3 days a week', duration: '1 month', tags: ['Teaching', 'Part-time'] },
    { id: '3', title: 'Event Staff Required', description: 'Wedding event support needed next weekend', duration: '2 days', tags: ['Events', 'Catering'] },
    { id: '4', title: 'Bike Mechanic Help', description: 'Looking for someone to help fix my motorcycle', duration: '2 hours', tags: ['Mechanic', 'Quick Fix'] }
];

const professionalSideQuests = [
    { id: '1', title: 'Need a React Dev for the weekend', description: 'Quick project: Build a landing page with animations', duration: '2 days', tags: ['React', 'Framer Motion'] },
    { id: '2', title: 'UI/UX Review Session', description: 'Looking for feedback on mobile app design', duration: '2 hours', tags: ['Design', 'Mobile'] },
    { id: '3', title: 'API Integration Help', description: 'Need help integrating Stripe payment gateway', duration: '1 day', tags: ['Backend', 'Stripe'] },
    { id: '4', title: 'Code Review Partner', description: 'Looking for someone to review my TypeScript code', duration: '3 hours', tags: ['TypeScript', 'Code Review'] }
];

const mockGigs = [
    { id: '1', title: 'Delivery Driver Needed', employer: 'QuickBite Restaurant', employerAvatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100', location: 'Raipur, Sector 15', salary: '₹300-500/day', type: 'Part-time', description: 'Need reliable delivery driver with own bike. Flexible hours, daily payment. Must know local area well.', postedTime: '2h ago', tags: ['Delivery', 'Bike Required'], applicants: 12 },
    { id: '2', title: 'Sales Associate - Fashion Store', employer: 'Style Hub Boutique', employerAvatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100', location: 'City Center Mall', salary: '₹12,000-15,000/month', type: 'Full-time', description: 'Looking for enthusiastic sales associate for our fashion boutique. Good communication skills required.', postedTime: '5h ago', tags: ['Retail', 'Customer Service'], applicants: 25 },
    { id: '3', title: 'Barista - Coffee Shop', employer: 'Brew & Beans Cafe', employerAvatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100', location: 'Marine Drive', salary: '₹10,000-14,000/month', type: 'Full-time', description: 'Experienced barista needed for busy cafe. Knowledge of espresso machines required. Training provided.', postedTime: '1d ago', tags: ['Hospitality', 'Cafe'], applicants: 18 },
    { id: '4', title: 'Warehouse Associate', employer: 'Metro Logistics', employerAvatar: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100', location: 'Industrial Area', salary: '₹13,000-16,000/month', type: 'Full-time', description: 'Warehouse worker needed for loading/unloading. Physical work. Good pay and benefits.', postedTime: '3d ago', tags: ['Logistics', 'Physical Work'], applicants: 32 }
];

// ============================================
// DRAWER FUNCTIONS
// ============================================
function openDrawer() {
    const drawer = document.getElementById('drawer');
    const content = document.getElementById('drawer-content');
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    drawer.classList.add('pointer-events-auto', 'opacity-100');
    setTimeout(() => content.classList.remove('-translate-x-full'), 10);
    
    const profile = AppState.getCurrentProfile();
    document.getElementById('drawer-avatar').src = profile.photo;
    document.getElementById('drawer-name').textContent = profile.name;
}

function closeDrawer() {
    const drawer = document.getElementById('drawer');
    const content = document.getElementById('drawer-content');
    content.classList.add('-translate-x-full');
    setTimeout(() => {
        drawer.classList.add('pointer-events-none', 'opacity-0');
        drawer.classList.remove('pointer-events-auto', 'opacity-100');
    }, 300);
}

// ============================================
// NAVIGATION
// ============================================
function navigateTo(page) {
    if (page === 'profile') {
        if (AppState.currentPage === 'marketplace' || AppState.currentPage === 'gigs') {
            AppState.profileMode = 'market';
        } else {
            AppState.profileMode = 'professional';
        }
    }
    AppState.currentPage = page;
    render();
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderMarketplace() {
    const profile = AppState.market;
    return `
        <div class="min-h-screen bg-white text-gray-900">
            <nav class="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <div class="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-6">
                    <div class="ml-16 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">IF</div>
                    
                    <div class="flex-1 max-w-xl">
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" stroke-width="2"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"></line>
                            </svg>
                            <input type="text" placeholder="Search for local jobs, gigs, or services..." class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                        </div>
                    </div>

                    <div class="flex items-center gap-6">
                        <button class="flex flex-col items-center gap-1 text-purple-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                            </svg>
                            <span class="text-xs font-medium">Home</span>
                        </button>
                        <button onclick="navigateTo('gigs')" class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Gigs</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Messages</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                <line x1="12" y1="8" x2="12" y2="16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                                <line x1="8" y1="12" x2="16" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                            </svg>
                            <span class="text-xs font-medium">Post</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors relative">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Notifications</span>
                            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>

                    <div class="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <label for="mode-toggle-market" class="text-sm text-purple-600 font-medium cursor-pointer">Market</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="mode-toggle-market" onchange="if(this.checked) navigateTo('dashboard')">
                            <span class="toggle-slider"></span>
                        </label>
                        <label class="text-sm text-gray-500 font-medium cursor-pointer" onclick="navigateTo('dashboard')">Professional</label>
                    </div>
                </div>
            </nav>

            <div class="max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-12 gap-6">
                <main class="col-span-8 space-y-4">
                    ${marketMockPosts.map(post => `
                        <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div class="p-6">
                                <div class="flex items-start gap-3 mb-4">
                                    <img src="${post.authorAvatar}" alt="${post.author}" class="w-10 h-10 rounded-full object-cover">
                                    <div class="flex-1">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <div class="font-semibold text-gray-900">${post.author}</div>
                                                <div class="text-sm text-gray-500">${post.timestamp}</div>
                                            </div>
                                            <span class="border border-purple-300 text-purple-700 bg-purple-50 px-3 py-1 rounded-full text-xs font-medium">${post.tag}</span>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-gray-700 mb-4 leading-relaxed">${post.content}</p>
                                ${post.image ? `<img src="${post.image}" alt="Post" class="w-full rounded-lg mb-4 object-cover h-64">` : ''}
                                <div class="flex items-center gap-6 pt-4 border-t border-gray-200">
                                    <button class="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        <span class="text-sm font-medium">${post.replies} Replies</span>
                                    </button>
                                    <button class="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        <span class="text-sm font-medium">${post.bookmarks} Bookmarks</span>
                                    </button>
                                    <button class="flex items-center gap-2 ${post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors">
                                        <svg class="w-5 h-5 ${post.isLiked ? 'fill-current' : ''}" fill="${post.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        <span class="text-sm font-medium">${post.likes} Likes</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </main>

                <aside class="col-span-4">
                    <div class="sticky top-24">
                        <h2 class="text-lg font-semibold mb-4 px-2 text-gray-900">Side-Quest Board</h2>
                        <div class="space-y-3">
                            ${marketSideQuests.map(quest => `
                                <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                                    <div class="p-4">
                                        <h3 class="font-semibold text-sm mb-2 text-gray-900">${quest.title}</h3>
                                        <p class="text-xs text-gray-600 mb-3 leading-relaxed">${quest.description}</p>
                                        <div class="flex items-center justify-between">
                                            <div class="flex gap-1.5 flex-wrap">
                                                ${quest.tags.map(tag => `<span class="border border-purple-200 text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full text-xs font-medium">${tag}</span>`).join('')}
                                            </div>
                                            <span class="text-xs text-purple-600 font-medium">${quest.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    `;
}

function renderProfessionalDashboard() {
    const profile = AppState.professional;
    return `
        <div class="min-h-screen bg-white text-gray-900">
            <nav class="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <div class="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-6">
                    <div class="ml-16 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">IF</div>
                    
                    <div class="flex-1 max-w-xl">
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" stroke-width="2"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"></line>
                            </svg>
                            <input type="text" placeholder="Search for professionals, jobs, or projects..." class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                        </div>
                    </div>

                    <div class="flex items-center gap-6">
                        <button class="flex flex-col items-center gap-1 text-purple-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                            </svg>
                            <span class="text-xs font-medium">Home</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Jobs</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Messages</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                <line x1="12" y1="8" x2="12" y2="16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                                <line x1="8" y1="12" x2="16" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                            </svg>
                            <span class="text-xs font-medium">Post</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors relative">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Notifications</span>
                            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>

                    <div class="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <label class="text-sm text-gray-500 font-medium cursor-pointer" onclick="navigateTo('marketplace')">Market</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="mode-toggle-prof" checked onchange="if(!this.checked) navigateTo('marketplace')">
                            <span class="toggle-slider"></span>
                        </label>
                        <label for="mode-toggle-prof" class="text-sm text-purple-600 font-medium cursor-pointer">Professional</label>
                    </div>
                </div>
            </nav>

            <div class="max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-12 gap-6">
                <aside class="col-span-3 space-y-4">
                    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div class="p-4">
                            <h3 class="font-semibold text-sm mb-2 text-gray-900">Updates</h3>
                            <p class="text-xs text-gray-600">Professional updates will appear here...</p>
                        </div>
                    </div>
                </aside>

                <main class="col-span-6 space-y-4">
                    ${professionalMockPosts.map(post => `
                        <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div class="p-6">
                                <div class="flex items-start gap-3 mb-4">
                                    <img src="${post.authorAvatar}" alt="${post.author}" class="w-10 h-10 rounded-full object-cover">
                                    <div class="flex-1">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <div class="font-semibold text-gray-900">${post.author}</div>
                                                <div class="text-sm text-gray-500">${post.timestamp}</div>
                                            </div>
                                            <span class="border border-purple-300 text-purple-700 bg-purple-50 px-3 py-1 rounded-full text-xs font-medium">${post.tag}</span>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-gray-700 mb-4 leading-relaxed">${post.content}</p>
                                ${post.image ? `<img src="${post.image}" alt="Post" class="w-full rounded-lg mb-4 object-cover h-64">` : ''}
                                <div class="flex items-center gap-6 pt-4 border-t border-gray-200">
                                    <button class="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        <span class="text-sm font-medium">${post.replies} Replies</span>
                                    </button>
                                    <button class="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        <span class="text-sm font-medium">${post.bookmarks} Bookmarks</span>
                                    </button>
                                    <button class="flex items-center gap-2 ${post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors">
                                        <svg class="w-5 h-5 ${post.isLiked ? 'fill-current' : ''}" fill="${post.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        <span class="text-sm font-medium">${post.likes} Likes</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </main>

                <aside class="col-span-3">
                    <div class="sticky top-24">
                        <h2 class="text-lg font-semibold mb-4 px-2 text-gray-900">Side-Quest Board</h2>
                        <div class="space-y-3">
                            ${professionalSideQuests.map(quest => `
                                <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                                    <div class="p-4">
                                        <h3 class="font-semibold text-sm mb-2 text-gray-900">${quest.title}</h3>
                                        <p class="text-xs text-gray-600 mb-3 leading-relaxed">${quest.description}</p>
                                        <div class="flex items-center justify-between">
                                            <div class="flex gap-1.5 flex-wrap">
                                                ${quest.tags.map(tag => `<span class="border border-purple-200 text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full text-xs font-medium">${tag}</span>`).join('')}
                                            </div>
                                            <span class="text-xs text-purple-600 font-medium">${quest.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    `;
}

function renderGigs() {
    return `
        <div class="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 text-gray-900">
            <nav class="border-b border-white/30 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
                <div class="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-6">
                    <div class="ml-16 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">IF</div>
                    
                    <div class="flex-1 max-w-xl">
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" stroke-width="2"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"></line>
                            </svg>
                            <input type="text" placeholder="Search for gigs, jobs, or categories..." class="w-full bg-white/70 border border-white/40 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-300 backdrop-blur-sm">
                        </div>
                    </div>

                    <div class="flex items-center gap-6">
                        <button onclick="navigateTo('marketplace')" class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                            </svg>
                            <span class="text-xs font-medium">Home</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-purple-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Gigs</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Messages</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                <line x1="12" y1="8" x2="12" y2="16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                                <line x1="8" y1="12" x2="16" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                            </svg>
                            <span class="text-xs font-medium">Post</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors relative">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span class="text-xs font-medium">Notifications</span>
                            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>

                    <div class="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-lg border border-white/40 backdrop-blur-sm">
                        <label for="mode-toggle-gigs" class="text-sm text-purple-600 font-medium cursor-pointer">Market</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="mode-toggle-gigs" onchange="if(this.checked) navigateTo('dashboard')">
                            <span class="toggle-slider"></span>
                        </label>
                        <label class="text-sm text-gray-500 font-medium cursor-pointer" onclick="navigateTo('dashboard')">Professional</label>
                    </div>
                </div>
            </nav>

            <div class="max-w-[1600px] mx-auto px-6 py-8">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h1 class="text-3xl font-semibold text-gray-900 mb-1">Available Gigs & Jobs</h1>
                        <p class="text-gray-600">Find local opportunities in your area</p>
                    </div>
                    <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow">
                        Post a Gig
                    </button>
                </div>

                <div class="grid grid-cols-12 gap-6">
                    <aside class="col-span-3">
                        <div class="bg-gradient-to-br from-purple-100/60 via-pink-50/60 to-blue-50/60 backdrop-blur-sm rounded-2xl p-6 sticky top-24 shadow-sm border border-white/40">
                            <h2 class="text-xl font-semibold text-gray-800 mb-6">Filter</h2>
                            <div class="mb-6">
                                <h3 class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Location</h3>
                                <div class="relative">
                                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <circle cx="12" cy="10" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                    </svg>
                                    <input type="text" placeholder="Enter location" class="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-white/50 rounded-xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all backdrop-blur-sm">
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main class="col-span-9 space-y-4">
                        ${mockGigs.map(gig => `
                            <div class="bg-white/80 backdrop-blur-sm border border-white/60 rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div class="p-6">
                                    <div class="flex gap-4">
                                        <img src="${gig.employerAvatar}" alt="${gig.employer}" class="w-16 h-16 rounded-full border-2 border-purple-100 object-cover">
                                        <div class="flex-1">
                                            <div class="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 class="text-lg font-semibold text-gray-900 mb-1">${gig.title}</h3>
                                                    <p class="text-sm text-gray-600 mb-2">${gig.employer}</p>
                                                </div>
                                                <span class="bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200 px-3 py-1 rounded-full text-xs font-medium">${gig.type}</span>
                                            </div>
                                            <div class="flex items-center gap-4 mb-3 text-sm text-gray-600">
                                                <div class="flex items-center gap-1">
                                                    <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <circle cx="12" cy="10" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                                    </svg>
                                                    <span>${gig.location}</span>
                                                </div>
                                                <div class="flex items-center gap-1">
                                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <line x1="12" y1="1" x2="12" y2="23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                    <span class="font-semibold text-green-600">${gig.salary}</span>
                                                </div>
                                                <div class="flex items-center gap-1">
                                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                                        <polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                                    </svg>
                                                    <span>${gig.postedTime}</span>
                                                </div>
                                            </div>
                                            <p class="text-sm text-gray-700 mb-3 leading-relaxed">${gig.description}</p>
                                            <div class="flex items-center gap-2 mb-4">
                                                ${gig.tags.map(tag => `<span class="border border-purple-200 text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full text-xs font-medium">${tag}</span>`).join('')}
                                            </div>
                                            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <div class="flex items-center gap-4">
                                                    <button class="flex items-center gap-1.5 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span class="font-medium">Contact</span>
                                                    </button>
                                                    <button class="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 transition-colors">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span class="font-medium">Save</span>
                                                    </button>
                                                    <span class="text-xs text-gray-500">${gig.applicants} applicants</span>
                                                </div>
                                                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                                                    Apply Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </main>
                </div>
            </div>
        </div>
    `;
}

function renderProfile() {
    const profile = AppState.getCurrentProfile();
    return `
        <div class="min-h-screen bg-gray-50">
            <div class="w-full h-72 bg-cover bg-center relative" style="background-image: url('${profile.banner}')">
                <button onclick="navigateTo(AppState.profileMode === 'market' ? 'marketplace' : 'dashboard')" class="absolute top-4 left-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg font-medium transition shadow-md flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <line x1="19" y1="12" x2="5" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                        <polyline points="12 19 5 12 12 5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                    </svg>
                    Back
                </button>
            </div>
            <div class="max-w-5xl mx-auto px-6">
                <div class="flex items-end gap-6 -mt-24 mb-8">
                    <img src="${profile.photo}" alt="${profile.name}" class="w-40 h-40 rounded-full border-5 border-white object-cover shadow-xl">
                    <div class="bg-white p-6 rounded-lg shadow-md flex-1 mb-4">
                        <h1 class="text-2xl font-bold text-gray-900 mb-2">${profile.name}</h1>
                        <p class="text-gray-600 mb-4">${profile.email}</p>
                        <div class="flex gap-4">
                            <button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition">Edit Profile</button>
                            <button class="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition">Share Profile</button>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div class="grid gap-4">
                        <div class="flex gap-4">
                            <strong class="text-gray-700 w-32">Email:</strong>
                            <span class="text-gray-900">${profile.email}</span>
                        </div>
                        <div class="flex gap-4">
                            <strong class="text-gray-700 w-32">Phone:</strong>
                            <span class="text-gray-900">${profile.phone}</span>
                        </div>
                        <div class="flex gap-4">
                            <strong class="text-gray-700 w-32">Date of Birth:</strong>
                            <span class="text-gray-900">${profile.dob}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// MAIN RENDER FUNCTION
// ============================================
function render() {
    const app = document.getElementById('app');
    
    switch (AppState.currentPage) {
        case 'marketplace':
            app.innerHTML = renderMarketplace();
            break;
        case 'gigs':
            app.innerHTML = renderGigs();
            break;
        case 'dashboard':
            app.innerHTML = renderProfessionalDashboard();
            break;
        case 'profile':
            app.innerHTML = renderProfile();
            break;
        default:
            app.innerHTML = renderMarketplace();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger button
    document.getElementById('hamburger-btn').addEventListener('click', openDrawer);
    
    // Close drawer
    document.getElementById('close-drawer').addEventListener('click', closeDrawer);
    document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);
    
    // Drawer navigation
    document.querySelectorAll('.drawer-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            navigateTo(page);
            closeDrawer();
        });
    });
    
    // Initial render
    render();
});
