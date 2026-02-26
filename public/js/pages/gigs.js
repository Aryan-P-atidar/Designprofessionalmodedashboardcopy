// Gigs Marketplace Page
const GigsPage = {
    container: null,
    
    mockGigs: [
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
        }
    ],
    
    render() {
        const currentProfile = AppStore.getCurrentProfile();
        
        this.container = document.getElementById('app-container');
        this.container.innerHTML = `
            <div class="page-container" style="background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%); min-height: 100vh;">
                ${this.renderHeader()}
                <main class="page-main">
                    <div class="two-column-layout">
                        ${this.renderFilterSidebar()}
                        ${this.renderGigsFeed()}
                    </div>
                </main>
            </div>
        `;
        
        this.attachEvents();
    },
    
    renderHeader() {
        const currentProfile = AppStore.getCurrentProfile();
        
        return `
            <header class="page-header" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);">
                <div class="header-logo">
                    <button class="btn btn-ghost" id="back-btn">
                        ${getIcon('arrowLeft')}
                        Back
                    </button>
                </div>
                
                <h1 class="text-2xl font-bold text-gray-900">Gigs Marketplace</h1>
                
                <div class="header-actions">
                    <div class="switch-container">
                        <span class="text-sm text-gray-600">Local</span>
                        <label class="switch">
                            <input type="checkbox" id="mode-toggle">
                            <span class="switch-slider"></span>
                        </label>
                        <span class="text-sm text-gray-600">Professional</span>
                    </div>
                    <img src="${currentProfile.profilePhoto}" alt="Profile" class="avatar avatar-md" style="cursor: pointer;" id="profile-pic">
                </div>
            </header>
        `;
    },
    
    renderFilterSidebar() {
        return `
            <aside style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-radius: var(--radius-2xl); padding: var(--space-6); height: fit-content; position: sticky; top: 100px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
                    <h2 class="text-xl font-bold text-gray-900">Filters</h2>
                    <button class="btn btn-ghost btn-sm">Clear All</button>
                </div>
                
                <div style="margin-bottom: var(--space-6);">
                    <h3 class="font-semibold text-gray-900" style="margin-bottom: var(--space-3);">Location</h3>
                    <input type="text" class="input" placeholder="Enter location...">
                </div>
                
                <div style="margin-bottom: var(--space-6);">
                    <h3 class="font-semibold text-gray-900" style="margin-bottom: var(--space-3);">Salary Range</h3>
                    <input type="range" min="5000" max="50000" value="5000" class="w-full" style="margin-bottom: var(--space-2);">
                    <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--gray-700);">
                        <span>₹5,000</span>
                        <span>₹50,000</span>
                    </div>
                </div>
            </aside>
        `;
    },
    
    renderGigsFeed() {
        return `
            <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                ${this.mockGigs.map(gig => this.renderGigCard(gig)).join('')}
            </div>
        `;
    },
    
    renderGigCard(gig) {
        return `
            <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-radius: var(--radius-2xl); padding: var(--space-6); box-shadow: var(--shadow-lg);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
                    <div style="display: flex; gap: var(--space-4); align-items: center;">
                        <img src="${gig.employerAvatar}" alt="${gig.employer}" class="avatar avatar-lg">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900">${gig.title}</h3>
                            <p class="text-sm text-gray-600">${gig.employer}</p>
                        </div>
                    </div>
                    <div class="text-xl font-bold" style="color: var(--purple-700);">${gig.salary}</div>
                </div>
                
                <div style="display: flex; gap: var(--space-6); margin-bottom: var(--space-4); flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; color: var(--gray-600);">
                        ${getIcon('mapPin')}
                        ${gig.location}
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; color: var(--gray-600);">
                        ${getIcon('clock')}
                        ${gig.type}
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; color: var(--gray-600);">
                        ${getIcon('clock')}
                        ${gig.postedTime}
                    </div>
                </div>
                
                <p style="line-height: 1.6; color: var(--gray-700); margin-bottom: var(--space-4);">${gig.description}</p>
                
                <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-4);">
                    ${gig.tags.map(tag => `<span class="badge badge-primary">${tag}</span>`).join('')}
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-4); border-top: 1px solid var(--gray-200);">
                    <div class="text-sm text-gray-600">${gig.applicants} applicants</div>
                    <button class="btn" style="background: #25D366; color: white; display: flex; align-items: center; gap: var(--space-2);" onclick="alert('Opening WhatsApp...')">
                        ${getIcon('whatsapp')}
                        Contact via WhatsApp
                    </button>
                </div>
            </div>
        `;
    },
    
    attachEvents() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                AppStore.navigateTo('marketplace');
            });
        }
        
        const modeToggle = document.getElementById('mode-toggle');
        if (modeToggle) {
            modeToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    AppStore.navigateTo('dashboard');
                }
            });
        }
        
        const profilePic = document.getElementById('profile-pic');
        if (profilePic) {
            profilePic.addEventListener('click', () => {
                AppStore.navigateTo('profile');
            });
        }
    }
};
