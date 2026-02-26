// Jobs Page
const JobsPage = {
    container: null,
    
    mockJobs: [
        {
            id: '1',
            title: 'Senior Software Engineer',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
            type: 'Full-time',
            description: 'Looking for an experienced software engineer to join our team...',
            tags: ['React', 'Node.js', 'TypeScript']
        },
        {
            id: '2',
            title: 'Product Designer',
            company: 'Design Studio',
            location: 'Remote',
            type: 'Remote',
            description: 'Creative product designer needed for exciting projects...',
            tags: ['Figma', 'UI/UX', 'Design Systems']
        },
        {
            id: '3',
            title: 'Marketing Manager',
            company: 'Growth Company',
            location: 'New York, NY',
            type: 'Full-time',
            description: 'Lead our marketing efforts and grow our brand presence...',
            tags: ['SEO', 'Content', 'Analytics']
        }
    ],
    
    render() {
        const currentProfile = AppStore.getCurrentProfile();
        
        this.container = document.getElementById('app-container');
        this.container.innerHTML = `
            <div class="page-container">
                ${this.renderHeader()}
                <main class="page-main">
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: var(--space-6);">
                        ${this.mockJobs.map(job => this.renderJobCard(job)).join('')}
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
                    <button class="btn btn-ghost" id="back-btn">
                        ${getIcon('arrowLeft')}
                        Back to Dashboard
                    </button>
                </div>
                
                <h1 class="text-2xl font-bold text-gray-900">Professional Jobs</h1>
                
                <div class="header-actions">
                    <div class="switch-container">
                        <span class="text-sm text-gray-600">Local</span>
                        <label class="switch">
                            <input type="checkbox" id="mode-toggle" checked>
                            <span class="switch-slider"></span>
                        </label>
                        <span class="text-sm text-gray-600">Professional</span>
                    </div>
                    <img src="${currentProfile.profilePhoto}" alt="Profile" class="avatar avatar-md" style="cursor: pointer;" id="profile-pic">
                </div>
            </header>
        `;
    },
    
    renderJobCard(job) {
        return `
            <div class="card">
                <div class="card-content">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900" style="margin-bottom: var(--space-2);">${job.title}</h3>
                            <p class="text-sm text-gray-600">${job.company} • ${job.location}</p>
                        </div>
                        <span class="badge badge-primary">${job.type}</span>
                    </div>
                    
                    <p style="color: var(--gray-700); margin-bottom: var(--space-4); line-height: 1.6;">${job.description}</p>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-4);">
                        ${job.tags.map(tag => `<span class="badge badge-secondary">${tag}</span>`).join('')}
                    </div>
                    
                    <button class="btn btn-primary w-full">Apply Now</button>
                </div>
            </div>
        `;
    },
    
    attachEvents() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                AppStore.navigateTo('dashboard');
            });
        }
        
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
    }
};
