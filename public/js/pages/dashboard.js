// Professional Dashboard Page
const DashboardPage = {
    container: null,
    
    render() {
        const currentProfile = AppStore.getCurrentProfile();
        
        this.container = document.getElementById('app-container');
        this.container.innerHTML = `
            <div class="page-container">
                ${this.renderHeader()}
                <main class="page-main">
                    <div class="three-column-layout">
                        ${this.renderColumn('Updates', 'Professional updates will appear here...')}
                        ${this.renderColumn('Activity Feed', 'Your professional activity feed...')}
                        ${this.renderColumn('Network', 'Your professional network...')}
                    </div>
                </main>
            </div>
        `;
        
        this.attachEvents();
    },
    
    renderHeader() {
        const currentProfile = AppStore.getCurrentProfile();
        
        return `
            <header class="page-header">
                <div class="header-logo">
                    <h2 style="color: var(--purple-600); font-weight: 700; font-size: 1.5rem;">In-Folio</h2>
                </div>
                
                <h1 class="text-2xl font-bold text-gray-900">Professional Dashboard</h1>
                
                <div class="header-actions">
                    <div class="switch-container">
                        <span class="text-sm text-gray-600">Local</span>
                        <label class="switch">
                            <input type="checkbox" id="mode-toggle" checked>
                            <span class="switch-slider"></span>
                        </label>
                        <span class="text-sm text-gray-600">Professional</span>
                    </div>
                    <button class="btn btn-primary" id="jobs-btn">Jobs</button>
                    <img src="${currentProfile.profilePhoto}" alt="Profile" class="avatar avatar-md" style="cursor: pointer;" id="profile-pic">
                </div>
            </header>
        `;
    },
    
    renderColumn(title, content) {
        return `
            <div>
                <div class="card">
                    <div class="card-content">
                        <h3 class="font-semibold text-gray-900" style="margin-bottom: var(--space-4);">${title}</h3>
                        <p class="text-gray-600">${content}</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    attachEvents() {
        const modeToggle = document.getElementById('mode-toggle');
        if (modeToggle) {
            modeToggle.addEventListener('change', (e) => {
                if (!e.target.checked) {
                    AppStore.navigateTo('marketplace');
                }
            });
        }
        
        const profilePic = document.getElementById('profile-pic');
        if (profilePic) {
            profilePic.addEventListener('click', () => {
                AppStore.navigateTo('profile');
            });
        }
        
        const jobsBtn = document.getElementById('jobs-btn');
        if (jobsBtn) {
            jobsBtn.addEventListener('click', () => {
                AppStore.navigateTo('jobs');
            });
        }
    }
};
