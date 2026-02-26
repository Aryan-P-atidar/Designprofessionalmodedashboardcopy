// Profile Page
const ProfilePage = {
    container: null,
    activeTab: 'about',
    
    render() {
        const currentProfile = AppStore.getCurrentProfile();
        const isMarket = AppStore.getCurrentMode() === 'market';
        
        this.container = document.getElementById('app-container');
        this.container.innerHTML = `
            <div class="page-container" style="background: var(--gray-50);">
                ${this.renderBanner(currentProfile)}
                ${this.renderProfileHeader(currentProfile)}
                ${this.renderProfileContent(currentProfile)}
            </div>
        `;
        
        this.attachEvents();
    },
    
    renderBanner(profile) {
        return `
            <div style="width: 100%; height: 300px; background-image: url('${profile.bannerImage}'); background-size: cover; background-position: center; position: relative;">
                <button class="btn btn-ghost" id="back-btn" style="position: absolute; top: var(--space-4); left: var(--space-4); background: rgba(255, 255, 255, 0.9);">
                    ${getIcon('arrowLeft')}
                    Back
                </button>
            </div>
        `;
    },
    
    renderProfileHeader(profile) {
        return `
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 var(--space-6);">
                <div style="display: flex; align-items: flex-end; gap: var(--space-8); margin-top: -80px; position: relative; z-index: 10;">
                    <img src="${profile.profilePhoto}" alt="Profile" style="width: 160px; height: 160px; border-radius: var(--radius-full); border: 5px solid white; object-fit: cover; box-shadow: var(--shadow-lg);">
                    <div style="flex: 1; background: white; padding: var(--space-6); border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                        <h1 class="text-2xl font-bold text-gray-900" style="margin-bottom: var(--space-2);">${profile.personalInfo.name}</h1>
                        <p class="text-gray-600" style="margin-bottom: var(--space-4);">${profile.personalInfo.email}</p>
                        <div style="display: flex; gap: var(--space-4);">
                            <button class="btn btn-primary">Edit Profile</button>
                            <button class="btn btn-outline">Share Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderProfileContent(profile) {
        return `
            <div style="max-width: 1200px; margin: var(--space-8) auto; padding: 0 var(--space-6);">
                <div style="background: white; border-radius: var(--radius-lg); padding: var(--space-6); box-shadow: var(--shadow-md);">
                    <div style="display: flex; gap: var(--space-6); border-bottom: 1px solid var(--gray-200); margin-bottom: var(--space-6);">
                        <button class="profile-tab ${this.activeTab === 'about' ? 'active' : ''}" data-tab="about" style="padding: var(--space-3) var(--space-4); background: transparent; border: none; border-bottom: 2px solid ${this.activeTab === 'about' ? 'var(--purple-600)' : 'transparent'}; color: ${this.activeTab === 'about' ? 'var(--purple-700)' : 'var(--gray-600)'}; font-weight: 500; cursor: pointer;">
                            About
                        </button>
                        <button class="profile-tab ${this.activeTab === 'projects' ? 'active' : ''}" data-tab="projects" style="padding: var(--space-3) var(--space-4); background: transparent; border: none; border-bottom: 2px solid ${this.activeTab === 'projects' ? 'var(--purple-600)' : 'transparent'}; color: ${this.activeTab === 'projects' ? 'var(--purple-700)' : 'var(--gray-600)'}; font-weight: 500; cursor: pointer;">
                            Projects
                        </button>
                        <button class="profile-tab ${this.activeTab === 'experience' ? 'active' : ''}" data-tab="experience" style="padding: var(--space-3) var(--space-4); background: transparent; border: none; border-bottom: 2px solid ${this.activeTab === 'experience' ? 'var(--purple-600)' : 'transparent'}; color: ${this.activeTab === 'experience' ? 'var(--purple-700)' : 'var(--gray-600)'}; font-weight: 500; cursor: pointer;">
                            Experience
                        </button>
                    </div>
                    
                    <div id="tab-content">
                        ${this.renderTabContent(profile)}
                    </div>
                </div>
            </div>
        `;
    },
    
    renderTabContent(profile) {
        switch (this.activeTab) {
            case 'about':
                return `
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900" style="margin-bottom: var(--space-4);">Personal Information</h3>
                        <div style="display: grid; gap: var(--space-4);">
                            <div>
                                <strong>Email:</strong> ${profile.personalInfo.email}
                            </div>
                            <div>
                                <strong>Phone:</strong> ${profile.personalInfo.phone}
                            </div>
                            <div>
                                <strong>Date of Birth:</strong> ${profile.personalInfo.dob}
                            </div>
                        </div>
                    </div>
                `;
            case 'projects':
                return `
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900" style="margin-bottom: var(--space-4);">Projects</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--space-6);">
                            ${this.renderProjectCard('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', 'Sample Project 1')}
                            ${this.renderProjectCard('https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', 'Sample Project 2')}
                        </div>
                    </div>
                `;
            case 'experience':
                return `
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900" style="margin-bottom: var(--space-4);">Experience</h3>
                        <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                            <div>
                                <h4 class="font-semibold text-gray-900">Previous Position</h4>
                                <p class="text-sm text-gray-600">Company Name • 2020 - 2023</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">Earlier Position</h4>
                                <p class="text-sm text-gray-600">Another Company • 2018 - 2020</p>
                            </div>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    },
    
    renderProjectCard(image, title) {
        return `
            <div class="card" style="overflow: hidden; transition: transform var(--transition-base); cursor: pointer;">
                <img src="${image}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="card-content">
                    <h4 class="font-semibold text-gray-900" style="margin-bottom: var(--space-2);">${title}</h4>
                    <p class="text-sm text-gray-600">Description of the project...</p>
                </div>
            </div>
        `;
    },
    
    attachEvents() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (AppStore.state.profileMode === 'market') {
                    AppStore.navigateTo('marketplace');
                } else {
                    AppStore.navigateTo('dashboard');
                }
            });
        }
        
        // Tab switching
        const tabs = document.querySelectorAll('.profile-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.activeTab = tab.dataset.tab;
                this.render();
            });
        });
    }
};
