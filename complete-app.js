// ============================================
// AUTHENTICATION CHECK
// ============================================

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    // For demo purposes, allow access without authentication
    // Comment out these lines to require login
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        loadUserData();
    } else {
        // Allow demo access without login
        render();
    }
});

function loadUserData() {
    const user = localStorage.getItem('user');
    
    if (!user) {
        render();
        return;
    }
    
    // Load user data into AppState
    try {
        const userData = JSON.parse(user);
        if (userData.accountType === 'professional') {
            AppState.professional.name = userData.name;
            AppState.professional.email = userData.email;
            AppState.professional.photo = userData.photo;
            AppState.professional.banner = userData.banner;
            AppState.currentPage = 'dashboard';
            AppState.profileMode = 'professional';
        } else {
            AppState.market.name = userData.name;
            AppState.market.email = userData.email;
            AppState.market.photo = userData.photo;
            AppState.market.banner = userData.banner;
            AppState.currentPage = 'marketplace';
            AppState.profileMode = 'market';
        }
        render();
    } catch (error) {
        console.error('Error loading user data:', error);
        render();
    }
}

window.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
};

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    currentPage: 'marketplace',
    profileMode: 'market',
    showCreatePost: false,
    showComments: {},
    commentInputs: {},
    postImagePreview: null,
    postContent: '',
    
    professional: {
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        phone: '+1 (555) 123-4567',
        dob: '1995-06-15',
        photo: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200',
        banner: 'https://images.unsplash.com/photo-1665707888808-d44ad6ff690d?w=1200',
        subtitle: 'Student at Medicaps University',
        location: 'Indore, Madhya Pradesh, India',
        badge: 'Medicaps University',
        posts: []
    },
    
    market: {
        name: 'Aryan Patidar',
        email: 'aryan.patidar@example.com',
        phone: '+91 98765 43210',
        dob: '1998-03-22',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200',
        subtitle: 'Student at Medicaps University',
        location: 'Indore, Madhya Pradesh, India',
        badge: 'Medicaps University',
        posts: []
    },
    
    getCurrentProfile() {
        if (this.currentPage === 'marketplace' || this.currentPage === 'gigs' || this.currentPage === 'jobs') {
            return this.market;
        } else if (this.currentPage === 'profile') {
            return this.profileMode === 'market' ? this.market : this.professional;
        } else {
            return this.professional;
        }
    },
    
    getAllPosts() {
        if (this.currentPage === 'marketplace' || this.currentPage === 'jobs') {
            return [...this.market.posts, ...marketMockPosts];
        } else {
            return [...this.professional.posts, ...professionalMockPosts];
        }
    }
};

// ============================================
// MOCK DATA
// ============================================
const marketMockPosts = [
    {
        id: 'market1',
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
            id: 'c1',
            author: 'Priya Sharma',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            content: 'Interested! Can you provide more details?',
            timestamp: '30 minutes ago'
        }]
    },
    {
        id: 'market2',
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
        id: 'market3',
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
        id: 'prof1',
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
        id: 'prof2',
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
        id: 'prof3',
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
    { id: '4', title: 'Warehouse Associate', employer: 'Metro Logistics', employerAvatar: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100', location: 'Industrial Area', salary: '₹13,000-16,000/month', type: 'Full-time', description: 'Warehouse worker needed for loading/unloading. Physical work. Good pay and benefits.', postedTime: '3d ago', tags: ['Logistics', 'Physical Work'], applicants: 32 },
    { id: '5', title: 'Line Cook Required', employer: 'Spice Garden Restaurant', employerAvatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100', location: 'Downtown', salary: '₹15,000-20,000/month', type: 'Full-time', description: 'Experienced line cook for busy restaurant kitchen. Must know North Indian cuisine. Immediate joining.', postedTime: '4d ago', tags: ['Food Service', 'Cooking'], applicants: 15 }
];

const mockJobs = [
    { id: 'j1', title: 'Store Manager', company: 'Reliance Fresh', companyLogo: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=100', location: 'Raipur', salary: '₹25,000-35,000/month', type: 'Full-time', description: 'Looking for an experienced store manager to oversee daily operations. Must have retail experience and leadership skills.', postedTime: '1d ago', tags: ['Management', 'Retail'], applicants: 45 },
    { id: 'j2', title: 'Customer Service Executive', company: 'HDFC Bank', companyLogo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=100', location: 'City Center', salary: '₹18,000-22,000/month', type: 'Full-time', description: 'Join our customer service team. Handle customer queries, banking operations, and account management.', postedTime: '2d ago', tags: ['Banking', 'Customer Service'], applicants: 67 },
    { id: 'j3', title: 'Electrician', company: 'BuildRight Construction', companyLogo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100', location: 'Multiple Sites', salary: '₹20,000-28,000/month', type: 'Full-time', description: 'Skilled electrician needed for commercial and residential projects. ITI certified preferred.', postedTime: '3d ago', tags: ['Skilled Trade', 'Construction'], applicants: 28 },
    { id: 'j4', title: 'Data Entry Operator', company: 'Tech Solutions Pvt Ltd', companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100', location: 'Work from Home', salary: '₹12,000-15,000/month', type: 'Part-time', description: 'Work from home opportunity. Fast typing speed required. Flexible hours.', postedTime: '1w ago', tags: ['Remote', 'Data Entry'], applicants: 120 }
];

// Filter state for Gigs page
const gigsFilterState = {
    categories: [
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
    ],
    selectedItems: [],
    minSalary: 10,
    maxSalary: 50,
    location: ''
};

window.toggleCategory = function(categoryId) {
    const category = gigsFilterState.categories.find(c => c.id === categoryId);
    if (category) {
        category.expanded = !category.expanded;
        render();
    }
};

window.toggleFilterItem = function(item) {
    const index = gigsFilterState.selectedItems.indexOf(item);
    if (index > -1) {
        gigsFilterState.selectedItems.splice(index, 1);
    } else {
        gigsFilterState.selectedItems.push(item);
    }
    render();
};

window.updateMinSalary = function(value) {
    gigsFilterState.minSalary = parseInt(value);
    render();
};

window.updateMaxSalary = function(value) {
    gigsFilterState.maxSalary = parseInt(value);
    render();
};

window.updateLocation = function(value) {
    gigsFilterState.location = value;
};

// Professional Jobs Filter State
const professionalJobsFilterState = {
    categories: [
        {
            id: 'technology',
            name: 'Technology & Digital',
            subcategories: [
                { name: 'Software Development', fields: ['SaaS', 'Mobile Apps', 'Web Platforms', 'DevOps'] },
                { name: 'AI & Data', fields: ['Machine Learning', 'Data Visualization', 'Analytics Dashboards'] },
                { name: 'Cybersecurity', fields: ['Identity Management', 'Encryption', 'Security Auditing'] },
                { name: 'Infrastructure', fields: ['Cloud Computing', 'Web3/Blockchain', 'IoT'] }
            ]
        },
        {
            id: 'healthcare',
            name: 'Healthcare & Wellness',
            subcategories: [
                { name: 'Clinical', fields: ['Telemedicine', 'Patient Management', 'Hospital Systems'] },
                { name: 'BioTech', fields: ['Lab Research', 'Pharmaceuticals', 'Genomic Data'] },
                { name: 'HealthTech', fields: ['Fitness Tracking', 'Mental Health Apps', 'Wearables'] },
                { name: 'Insurance', fields: ['Medical Billing', 'Claims Processing', 'Policy Management'] }
            ]
        },
        {
            id: 'commerce',
            name: 'Commerce & Finance',
            subcategories: [
                { name: 'Banking', fields: ['Personal Finance', 'Investment Portfolios', 'Neobanking'] },
                { name: 'E-commerce', fields: ['Retail', 'Marketplaces', 'B2B Procurement'] },
                { name: 'Payments', fields: ['POS Systems', 'Crypto Wallets', 'Payment Gateways'] },
                { name: 'Real Estate', fields: ['PropTech', 'Property Management', 'Mortgage Services'] }
            ]
        },
        {
            id: 'marketing',
            name: 'Marketing & Creative',
            subcategories: [
                { name: 'Advertising', fields: ['Campaign Management', 'AdTech', 'Social Media'] },
                { name: 'Branding', fields: ['Identity Systems', 'Style Guides', 'Presentation Design'] },
                { name: 'Content', fields: ['CMS', 'Digital Asset Management'] },
                { name: 'Research', fields: ['User Testing', 'Market Analysis', 'Surveying Tools'] }
            ]
        },
        {
            id: 'education',
            name: 'Education & Human Resources',
            subcategories: [
                { name: 'EdTech', fields: ['Learning Management Systems (LMS)', 'Online Courses', 'K-12'] },
                { name: 'HR Tech', fields: ['Recruitment', 'Employee Onboarding', 'Payroll', 'Performance Reviews'] },
                { name: 'Collaboration', fields: ['Productivity Tools', 'Project Management', 'Virtual Office'] }
            ]
        },
        {
            id: 'industrial',
            name: 'Industrial & Environmental',
            subcategories: [
                { name: 'Logistics', fields: ['Supply Chain', 'Fleet Management', 'Last-mile Delivery'] },
                { name: 'Sustainability', fields: ['Green Energy', 'ESG Reporting', 'Carbon Tracking'] },
                { name: 'Manufacturing', fields: ['Smart Factories', 'CAD Tools', 'Inventory Control'] }
            ]
        }
    ],
    expandedCategory: 'technology',
    expandedSubcategory: '',
    selectedFilters: [],
    minSalary: 50000,
    maxSalary: 150000,
    experienceLevel: 'Entry Level',
    location: ''
};

window.toggleJobCategory = function(categoryId) {
    professionalJobsFilterState.expandedCategory = 
        professionalJobsFilterState.expandedCategory === categoryId ? '' : categoryId;
    render();
};

window.toggleJobSubcategory = function(subcategoryName) {
    professionalJobsFilterState.expandedSubcategory = 
        professionalJobsFilterState.expandedSubcategory === subcategoryName ? '' : subcategoryName;
    render();
};

window.toggleJobFilter = function(filter) {
    const index = professionalJobsFilterState.selectedFilters.indexOf(filter);
    if (index > -1) {
        professionalJobsFilterState.selectedFilters.splice(index, 1);
    } else {
        professionalJobsFilterState.selectedFilters.push(filter);
    }
    render();
};

window.updateJobMinSalary = function(value) {
    professionalJobsFilterState.minSalary = parseInt(value);
    render();
};

window.updateJobMaxSalary = function(value) {
    professionalJobsFilterState.maxSalary = parseInt(value);
    render();
};

window.updateJobLocation = function(value) {
    professionalJobsFilterState.location = value;
};

window.updateExperienceLevel = function(value) {
    professionalJobsFilterState.experienceLevel = value;
    render();
};

// ============================================
// POST ACTIONS
// ============================================
window.toggleLike = function(postId) {
    const allPosts = AppState.getAllPosts();
    const post = allPosts.find(p => p.id === postId);
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes = post.isLiked ? post.likes + 1 : post.likes - 1;
        render();
    }
};

window.toggleComments = function(postId) {
    AppState.showComments[postId] = !AppState.showComments[postId];
    render();
};

window.addComment = function(postId) {
    const commentText = AppState.commentInputs[postId];
    if (!commentText || !commentText.trim()) return;
    
    const allPosts = AppState.getAllPosts();
    const post = allPosts.find(p => p.id === postId);
    if (post) {
        const profile = AppState.getCurrentProfile();
        const newComment = {
            id: 'c' + Date.now(),
            author: profile.name,
            authorAvatar: profile.photo,
            content: commentText.trim(),
            timestamp: 'Just now'
        };
        post.comments.push(newComment);
        post.replies++;
        AppState.commentInputs[postId] = '';
        render();
    }
};

window.updateCommentInput = function(postId, value) {
    AppState.commentInputs[postId] = value;
};

window.openCreatePost = function() {
    AppState.showCreatePost = true;
    render();
};

window.closeCreatePost = function() {
    AppState.showCreatePost = false;
    AppState.postContent = '';
    AppState.postImagePreview = null;
    render();
};

window.updatePostContent = function(value) {
    AppState.postContent = value;
};

window.handleImageUpload = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            AppState.postImagePreview = e.target.result;
            render();
        };
        reader.readAsDataURL(file);
    }
};

window.removeImage = function() {
    AppState.postImagePreview = null;
    render();
};

window.createPost = function() {
    if (!AppState.postContent.trim()) return;
    
    const profile = AppState.getCurrentProfile();
    const newPost = {
        id: 'user' + Date.now(),
        author: profile.name,
        authorAvatar: profile.photo,
        tag: '#Update',
        content: AppState.postContent.trim(),
        image: AppState.postImagePreview,
        timestamp: 'Just now',
        replies: 0,
        bookmarks: 0,
        likes: 0,
        isLiked: false,
        comments: []
    };
    
    if (AppState.currentPage === 'marketplace') {
        AppState.market.posts.unshift(newPost);
    } else {
        AppState.professional.posts.unshift(newPost);
    }
    
    closeCreatePost();
};

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
    document.getElementById('drawer-subtitle').textContent = profile.subtitle;
    document.getElementById('drawer-location').textContent = profile.location;
    document.getElementById('drawer-badge-text').textContent = profile.badge;
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
        if (AppState.currentPage === 'marketplace' || AppState.currentPage === 'gigs' || AppState.currentPage === 'jobs') {
            AppState.profileMode = 'market';
        } else {
            AppState.profileMode = 'professional';
        }
    }
    AppState.currentPage = page;
    render();
}

window.navigateTo = navigateTo;

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderCreatePostModal() {
    if (!AppState.showCreatePost) return '';
    
    const profile = AppState.getCurrentProfile();
    return `
        <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onclick="if(event.target === this) closeCreatePost()">
            <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h3 class="text-xl font-semibold text-gray-900">Create Post</h3>
                    <button onclick="closeCreatePost()" class="p-2 hover:bg-gray-100 rounded-full transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"></line>
                            <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"></line>
                        </svg>
                    </button>
                </div>
                <div class="p-6">
                    <div class="flex items-start gap-3 mb-4">
                        <img src="${profile.photo}" alt="${profile.name}" class="w-12 h-12 rounded-full object-cover">
                        <div>
                            <div class="font-semibold text-gray-900">${profile.name}</div>
                            <div class="text-sm text-gray-500">Public</div>
                        </div>
                    </div>
                    <textarea 
                        id="post-content-input"
                        placeholder="What's on your mind?"
                        class="w-full border-0 focus:outline-none text-gray-900 text-lg resize-none mb-4"
                        rows="6"
                        oninput="updatePostContent(this.value)"
                    >${AppState.postContent}</textarea>
                    
                    ${AppState.postImagePreview ? `
                        <div class="relative mb-4">
                            <img src="${AppState.postImagePreview}" alt="Preview" class="w-full rounded-lg object-cover max-h-96">
                            <button onclick="removeImage()" class="absolute top-2 right-2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"></line>
                                    <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"></line>
                                </svg>
                            </button>
                        </div>
                    ` : ''}
                    
                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div class="flex gap-2">
                            <label class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                    <polyline points="21 15 16 10 5 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                </svg>
                                <span class="text-sm font-medium text-gray-700">Photo</span>
                                <input type="file" accept="image/*" onchange="handleImageUpload(event)" class="hidden">
                            </label>
                        </div>
                        <button 
                            onclick="createPost()" 
                            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition ${!AppState.postContent.trim() ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${!AppState.postContent.trim() ? 'disabled' : ''}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPost(post) {
    const profile = AppState.getCurrentProfile();
    const showComments = AppState.showComments[post.id] || false;
    const commentInput = AppState.commentInputs[post.id] || '';
    
    return `
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
                    <button onclick="toggleComments('${post.id}')" class="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
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
                    <button onclick="toggleLike('${post.id}')" class="flex items-center gap-2 ${post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors">
                        <svg class="w-5 h-5 ${post.isLiked ? 'fill-current' : ''}" fill="${post.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span class="text-sm font-medium">${post.likes} Likes</span>
                    </button>
                </div>
                
                ${showComments ? `
                    <div class="mt-4 pt-4 border-t border-gray-100">
                        ${post.comments.length > 0 ? `
                            <div class="space-y-3 mb-4">
                                ${post.comments.map(comment => `
                                    <div class="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                        <img src="${comment.authorAvatar}" alt="${comment.author}" class="w-8 h-8 rounded-full object-cover">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2">
                                                <span class="font-semibold text-sm text-gray-900">${comment.author}</span>
                                                <span class="text-xs text-gray-500">${comment.timestamp}</span>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-1">${comment.content}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        <div class="flex items-center gap-2">
                            <img src="${profile.photo}" alt="${profile.name}" class="w-8 h-8 rounded-full object-cover">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value="${commentInput}"
                                oninput="updateCommentInput('${post.id}', this.value)"
                                onkeypress="if(event.key === 'Enter') addComment('${post.id}')"
                                class="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                            <button 
                                onclick="addComment('${post.id}')"
                                class="text-purple-600 hover:text-purple-700 transition-colors ${!commentInput.trim() ? 'opacity-50 cursor-not-allowed' : ''}"
                                ${!commentInput.trim() ? 'disabled' : ''}
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <line x1="22" y1="2" x2="11" y2="13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderMarketplace() {
    const profile = AppState.market;
    const allPosts = AppState.getAllPosts();
    
    return `
        ${renderCreatePostModal()}
        <div class="min-h-screen bg-white text-gray-900">
            <nav class="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <div class="max-w-[1600px] mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-6">
                    <div class="ml-0 sm:ml-16 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-md">IF</div>
                    
                    <div class="flex-1 max-w-xl">
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" stroke-width="2"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"></line>
                            </svg>
                            <input type="text" placeholder="Search..." class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                        </div>
                    </div>

                    <div class="hidden md:flex items-center gap-4 lg:gap-6">
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
                        <button onclick="openCreatePost()" class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
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

                    <div class="hidden sm:flex items-center gap-2 bg-gray-50 px-3 sm:px-4 py-2 rounded-lg border border-gray-200">
                        <label for="mode-toggle-market" class="text-xs sm:text-sm text-purple-600 font-medium cursor-pointer">Market</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="mode-toggle-market" onchange="if(this.checked) navigateTo('dashboard')">
                            <span class="toggle-slider"></span>
                        </label>
                        <label class="text-xs sm:text-sm text-gray-500 font-medium cursor-pointer" onclick="navigateTo('dashboard')">Professional</label>
                    </div>
                </div>
            </nav>

            <div class="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                <main class="col-span-1 lg:col-span-8 space-y-4">
                    ${allPosts.map(post => renderPost(post)).join('')}
                </main>

                <aside class="hidden lg:block lg:col-span-4">
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
    const allPosts = AppState.getAllPosts();
    
    return `
        ${renderCreatePostModal()}
        <div class="min-h-screen bg-white text-gray-900">
            <nav class="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <div class="max-w-[1600px] mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-6">
                    <div class="ml-0 sm:ml-16 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-md">IF</div>
                    
                    <div class="flex-1 max-w-xl">
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" stroke-width="2"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"></line>
                            </svg>
                            <input type="text" placeholder="Search..." class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                        </div>
                    </div>

                    <div class="hidden md:flex items-center gap-4 lg:gap-6">
                        <button class="flex flex-col items-center gap-1 text-purple-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                            </svg>
                            <span class="text-xs font-medium">Home</span>
                        </button>
                        <button onclick="navigateTo('jobs')" class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
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
                        <button onclick="openCreatePost()" class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
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

                    <div class="hidden sm:flex items-center gap-2 bg-gray-50 px-3 sm:px-4 py-2 rounded-lg border border-gray-200">
                        <label class="text-xs sm:text-sm text-gray-500 font-medium cursor-pointer" onclick="navigateTo('marketplace')">Market</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="mode-toggle-prof" checked onchange="if(!this.checked) navigateTo('marketplace')">
                            <span class="toggle-slider"></span>
                        </label>
                        <label for="mode-toggle-prof" class="text-xs sm:text-sm text-purple-600 font-medium cursor-pointer">Professional</label>
                    </div>
                </div>
            </nav>

            <div class="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                <aside class="hidden lg:block lg:col-span-3 space-y-4">
                    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div class="p-4">
                            <h3 class="font-semibold text-sm mb-2 text-gray-900">Updates</h3>
                            <p class="text-xs text-gray-600">Professional updates will appear here...</p>
                        </div>
                    </div>
                </aside>

                <main class="col-span-1 lg:col-span-6 space-y-4">
                    ${allPosts.map(post => renderPost(post)).join('')}
                </main>

                <aside class="hidden lg:block lg:col-span-3">
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
                        <button onclick="openCreatePost()" class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
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

            <div class="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 sm:py-8">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">Available Gigs & Jobs</h1>
                        <p class="text-sm sm:text-base text-gray-600">Find local opportunities in your area</p>
                    </div>
                    <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                        Post a Gig
                    </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                    <aside class="hidden lg:block lg:col-span-3">
                        <div class="bg-gradient-to-br from-purple-100/60 via-pink-50/60 to-blue-50/60 backdrop-blur-sm rounded-2xl p-6 sticky top-24 shadow-sm border border-white/40">
                            <h2 class="text-xl font-semibold text-gray-800 mb-6">Filter</h2>

                            <!-- Category Section -->
                            <div class="mb-6">
                                <h3 class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Category</h3>
                                <div class="space-y-2">
                                    ${gigsFilterState.categories.map(category => `
                                        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-white/40">
                                            <button
                                                onclick="toggleCategory('${category.id}')"
                                                class="w-full flex items-center justify-between text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
                                            >
                                                <span>${category.name}</span>
                                                ${category.expanded ? `
                                                    <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <polyline points="18 15 12 9 6 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                                    </svg>
                                                ` : `
                                                    <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                                    </svg>
                                                `}
                                            </button>

                                            ${category.expanded ? `
                                                <div class="space-y-2 mt-3 pt-3 border-t border-gray-200">
                                                    ${category.items.map(item => `
                                                        <label class="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-purple-600 transition-colors group">
                                                            <input
                                                                type="checkbox"
                                                                ${gigsFilterState.selectedItems.includes(item) ? 'checked' : ''}
                                                                onchange="toggleFilterItem('${item}')"
                                                                class="mt-0.5 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer"
                                                            />
                                                            <span class="leading-tight">${item}</span>
                                                        </label>
                                                    `).join('')}
                                                    ${category.extraText ? `
                                                        <p class="text-xs text-gray-500 italic mt-3 pl-6.5 leading-relaxed">
                                                            ${category.extraText}
                                                        </p>
                                                    ` : ''}
                                                </div>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Location Section -->
                            <div class="mb-6">
                                <h3 class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Location</h3>
                                <div class="relative">
                                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <circle cx="12" cy="10" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Enter location"
                                        value="${gigsFilterState.location}"
                                        oninput="updateLocation(this.value)"
                                        class="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-white/50 rounded-xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all backdrop-blur-sm"
                                    />
                                </div>
                            </div>

                            <!-- Salary Expectation Section -->
                            <div>
                                <h3 class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Salary Expectation</h3>
                                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/40">
                                    <div class="space-y-4">
                                        <!-- Min Slider -->
                                        <div>
                                            <div class="flex items-center justify-between mb-2">
                                                <label class="text-xs font-medium text-gray-600">Min</label>
                                                <span class="text-xs font-semibold text-purple-600">₹${gigsFilterState.minSalary}k</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value="${gigsFilterState.minSalary}"
                                                oninput="updateMinSalary(this.value)"
                                                class="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                                                style="accent-color: #9333ea;"
                                            />
                                        </div>

                                        <!-- Max Slider -->
                                        <div>
                                            <div class="flex items-center justify-between mb-2">
                                                <label class="text-xs font-medium text-gray-600">Max</label>
                                                <span class="text-xs font-semibold text-purple-600">₹${gigsFilterState.maxSalary}k</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value="${gigsFilterState.maxSalary}"
                                                oninput="updateMaxSalary(this.value)"
                                                class="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                                                style="accent-color: #9333ea;"
                                            />
                                        </div>

                                        <!-- Custom Input -->
                                        <input
                                            type="text"
                                            placeholder="Custom"
                                            class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main class="col-span-1 lg:col-span-9 space-y-4">
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

function renderJobs() {
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
                            <input type="text" placeholder="Search for jobs..." class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                        </div>
                    </div>

                    <div class="flex items-center gap-6">
                        <button onclick="navigateTo('dashboard')" class="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
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
                            <span class="text-xs font-medium">Jobs</span>
                        </button>
                    </div>

                    <div class="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <label class="text-sm text-gray-500 font-medium cursor-pointer" onclick="navigateTo('marketplace')">Market</label>
                        <label class="toggle-switch">
                            <input type="checkbox" checked onchange="if(!this.checked) navigateTo('marketplace')">
                            <span class="toggle-slider"></span>
                        </label>
                        <label class="text-sm text-purple-600 font-medium cursor-pointer">Professional</label>
                    </div>
                </div>
            </nav>

            <div class="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 sm:py-8">
                <div class="mb-6">
                    <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">Job Opportunities</h1>
                    <p class="text-sm sm:text-base text-gray-600">Browse professional job listings</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                    <aside class="hidden lg:block lg:col-span-3">
                        <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-24 shadow-sm">
                            <h2 class="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
                            
                            <!-- Profession Categories -->
                            <div class="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                                ${professionalJobsFilterState.categories.map(category => `
                                    <div>
                                        <button
                                            onclick="toggleJobCategory('${category.id}')"
                                            class="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                                        >
                                            <span class="text-left">${category.name}</span>
                                            ${category.subcategories.length > 0 ? (
                                                professionalJobsFilterState.expandedCategory === category.id 
                                                    ? `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <polyline points="18 15 12 9 6 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                                    </svg>`
                                                    : `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                                    </svg>`
                                            ) : ''}
                                        </button>
                                        
                                        ${professionalJobsFilterState.expandedCategory === category.id && category.subcategories.length > 0 ? `
                                            <div class="ml-2 mt-2 space-y-2">
                                                ${category.subcategories.map(sub => `
                                                    <div>
                                                        <button
                                                            onclick="toggleJobSubcategory('${sub.name}')"
                                                            class="w-full flex items-center justify-between py-2 text-xs font-medium text-gray-600 hover:text-purple-600 transition-colors"
                                                        >
                                                            <span class="text-left">${sub.name}</span>
                                                            ${sub.fields.length > 0 ? (
                                                                professionalJobsFilterState.expandedSubcategory === sub.name
                                                                    ? `<svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <polyline points="18 15 12 9 6 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                                                    </svg>`
                                                                    : `<svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                                                    </svg>`
                                                            ) : ''}
                                                        </button>
                                                        
                                                        ${professionalJobsFilterState.expandedSubcategory === sub.name && sub.fields.length > 0 ? `
                                                            <div class="ml-3 mt-2 space-y-2">
                                                                ${sub.fields.map(field => `
                                                                    <label class="flex items-start gap-2 text-xs text-gray-600 cursor-pointer hover:text-purple-600">
                                                                        <input
                                                                            type="checkbox"
                                                                            ${professionalJobsFilterState.selectedFilters.includes(field) ? 'checked' : ''}
                                                                            onchange="toggleJobFilter('${field}')"
                                                                            class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5 flex-shrink-0"
                                                                        />
                                                                        <span class="break-words">${field}</span>
                                                                    </label>
                                                                `).join('')}
                                                            </div>
                                                        ` : ''}
                                                    </div>
                                                `).join('')}
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>

                            <!-- Location Filter -->
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <div class="relative">
                                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <circle cx="12" cy="10" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="e.g., Remote, Indore, Not Applicable"
                                        value="${professionalJobsFilterState.location}"
                                        oninput="updateJobLocation(this.value)"
                                        class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <!-- Experience Level -->
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Experience Level
                                </label>
                                <select 
                                    onchange="updateExperienceLevel(this.value)"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                >
                                    <option ${professionalJobsFilterState.experienceLevel === 'Entry Level' ? 'selected' : ''}>Entry Level</option>
                                    <option ${professionalJobsFilterState.experienceLevel === 'Mid Level' ? 'selected' : ''}>Mid Level</option>
                                    <option ${professionalJobsFilterState.experienceLevel === 'Senior Level' ? 'selected' : ''}>Senior Level</option>
                                    <option ${professionalJobsFilterState.experienceLevel === 'Executive' ? 'selected' : ''}>Executive</option>
                                </select>
                            </div>

                            <!-- Salary Range -->
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Salary Range
                                </label>
                                <div class="space-y-4">
                                    <div class="px-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="300000"
                                            value="${professionalJobsFilterState.minSalary}"
                                            oninput="updateJobMinSalary(this.value)"
                                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                        />
                                        <div class="flex justify-between mt-1 text-xs text-gray-500">
                                            <span>Min: $${professionalJobsFilterState.minSalary.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div class="px-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="300000"
                                            value="${professionalJobsFilterState.maxSalary}"
                                            oninput="updateJobMaxSalary(this.value)"
                                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                        />
                                        <div class="flex justify-between mt-1 text-xs text-gray-500">
                                            <span>Max: $${professionalJobsFilterState.maxSalary.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Custom Salary"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <!-- Apply Filters Button -->
                            <button class="w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                                Apply Filters
                            </button>
                        </div>
                    </aside>

                    <main class="col-span-1 lg:col-span-9 space-y-4">
                        ${mockJobs.map(job => `
                            <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div class="p-6">
                                    <div class="flex gap-4">
                                        <img src="${job.companyLogo}" alt="${job.company}" class="w-16 h-16 rounded-lg object-cover border border-gray-200">
                                        <div class="flex-1">
                                            <div class="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 class="text-lg font-semibold text-gray-900 mb-1">${job.title}</h3>
                                                    <p class="text-sm text-gray-600 mb-2">${job.company}</p>
                                                </div>
                                                <span class="bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">${job.type}</span>
                                            </div>
                                            <div class="flex items-center gap-4 mb-3 text-sm text-gray-600">
                                                <div class="flex items-center gap-1">
                                                    <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2"></path>
                                                        <circle cx="12" cy="10" r="3" stroke-width="2"></circle>
                                                    </svg>
                                                    <span>${job.location}</span>
                                                </div>
                                                <div class="flex items-center gap-1">
                                                    <span class="font-semibold text-green-600">${job.salary}</span>
                                                </div>
                                                <span>${job.postedTime}</span>
                                            </div>
                                            <p class="text-sm text-gray-700 mb-3 leading-relaxed">${job.description}</p>
                                            <div class="flex items-center gap-2 mb-4">
                                                ${job.tags.map(tag => `<span class="border border-blue-200 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs font-medium">${tag}</span>`).join('')}
                                            </div>
                                            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span class="text-xs text-gray-500">${job.applicants} applicants</span>
                                                <button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
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
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                <button onclick="navigateTo(AppState.profileMode === 'market' ? 'marketplace' : 'dashboard')" class="absolute top-4 left-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg font-medium transition shadow-md flex items-center gap-2 z-10">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <line x1="19" y1="12" x2="5" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                        <polyline points="12 19 5 12 12 5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                    </svg>
                    Back
                </button>
            </div>
            <div class="max-w-5xl mx-auto px-6">
                <div class="flex items-end gap-6 -mt-24 mb-8 relative z-10">
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
        case 'jobs':
            app.innerHTML = renderJobs();
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
