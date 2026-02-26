// Profile Drawer Component
const ProfileDrawer = {
    element: null,
    
    init() {
        this.element = document.getElementById('profile-drawer');
        this.render();
        this.attachEvents();
        
        // Subscribe to store changes
        AppStore.subscribe((state) => {
            this.update(state);
        });
    },
    
    render() {
        const state = AppStore.state;
        const currentProfile = AppStore.getCurrentProfile();
        
        const content = this.element.querySelector('.drawer-content');
        content.innerHTML = `
            <div class="drawer-header">
                <button class="drawer-close-btn" id="close-drawer">
                    ${getIcon('x')}
                </button>
            </div>
            
            <div class="drawer-profile-section">
                <img src="${currentProfile.profilePhoto}" alt="${currentProfile.personalInfo.name}" class="drawer-avatar">
                <h3 class="drawer-name">${currentProfile.personalInfo.name}</h3>
            </div>
            
            <nav class="drawer-nav">
                <a href="#" class="drawer-nav-item ${state.activeScreen === 'marketplace' ? 'active' : ''}" data-screen="marketplace">
                    ${getIcon('home')}
                    <span>Local Marketplace</span>
                </a>
                <a href="#" class="drawer-nav-item ${state.activeScreen === 'gigs' ? 'active' : ''}" data-screen="gigs">
                    ${getIcon('briefcase')}
                    <span>Gigs</span>
                </a>
                <a href="#" class="drawer-nav-item ${state.activeScreen === 'dashboard' ? 'active' : ''}" data-screen="dashboard">
                    ${getIcon('briefcase')}
                    <span>Professional Dashboard</span>
                </a>
                <a href="#" class="drawer-nav-item ${state.activeScreen === 'jobs' ? 'active' : ''}" data-screen="jobs">
                    ${getIcon('briefcase')}
                    <span>Jobs</span>
                </a>
                <a href="#" class="drawer-nav-item ${state.activeScreen === 'profile' ? 'active' : ''}" data-screen="profile">
                    ${getIcon('user')}
                    <span>Profile</span>
                </a>
            </nav>
        `;
        
        this.attachEvents();
    },
    
    attachEvents() {
        // Close button
        const closeBtn = document.getElementById('close-drawer');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        // Overlay click
        const overlay = this.element.querySelector('.drawer-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.close());
        }
        
        // Navigation items
        const navItems = this.element.querySelectorAll('.drawer-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const screen = item.dataset.screen;
                AppStore.navigateTo(screen);
                this.close();
            });
        });
    },
    
    open() {
        this.element.classList.add('open');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.element.classList.remove('open');
        document.body.style.overflow = '';
    },
    
    update(state) {
        // Update profile info
        const currentProfile = AppStore.getCurrentProfile();
        const avatar = this.element.querySelector('.drawer-avatar');
        const name = this.element.querySelector('.drawer-name');
        
        if (avatar) avatar.src = currentProfile.profilePhoto;
        if (name) name.textContent = currentProfile.personalInfo.name;
        
        // Update active nav item
        const navItems = this.element.querySelectorAll('.drawer-nav-item');
        navItems.forEach(item => {
            if (item.dataset.screen === state.activeScreen) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update drawer open state
        if (state.isDrawerOpen) {
            this.open();
        } else {
            this.close();
        }
    }
};
