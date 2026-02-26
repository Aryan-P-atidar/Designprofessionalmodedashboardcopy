// Local Marketplace Page
const MarketplacePage = {
    container: null,
    mockPosts: [
        {
            id: '1',
            author: 'Rajesh Kumar',
            authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            tag: '#Hiring',
            content: 'Need a delivery partner for my new cloud kitchen in Raipur. Good pay, flexible hours, and daily payments. Must have own vehicle and smartphone. Contact immediately!',
            image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600',
            timestamp: '1h ago',
            likes: 3,
            isLiked: false,
            comments: [
                {
                    id: '1',
                    author: 'Priya Sharma',
                    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
                    content: 'Interested! Can you provide more details?',
                    timestamp: '30 minutes ago'
                }
            ]
        },
        {
            id: '2',
            author: 'Priya Sharma',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            tag: '#LocalBusiness',
            content: 'Just opened my boutique in City Center! Looking for a sales assistant who knows Hindi and English. Great opportunity for freshers. Walk-in interviews this Saturday.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
            timestamp: '3h ago',
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
            likes: 2,
            isLiked: false,
            comments: []
        }
    ],
    
    render() {
        const currentProfile = AppStore.getCurrentProfile();
        
        this.container = document.getElementById('app-container');
        this.container.innerHTML = `
            <div class="page-container">
                ${this.renderHeader()}
                <main class="page-main">
                    <div class="three-column-layout">
                        ${this.renderLeftSidebar()}
                        ${this.renderFeed()}
                        ${this.renderRightSidebar()}
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
                
                <nav class="header-nav">
                    <a href="#" class="header-nav-item active" data-nav="home">
                        ${getIcon('home')}
                        <span class="header-nav-label">Home</span>
                    </a>
                    <a href="#" class="header-nav-item" data-nav="gigs">
                        ${getIcon('briefcase')}
                        <span class="header-nav-label">Gigs</span>
                    </a>
                    <a href="#" class="header-nav-item" data-nav="messages">
                        ${getIcon('message')}
                        <span class="header-nav-label">Messages</span>
                    </a>
                    <a href="#" class="header-nav-item" data-nav="notifications">
                        ${getIcon('bell')}
                        <span class="header-nav-label">Notifications</span>
                    </a>
                </nav>
                
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
    
    renderLeftSidebar() {
        const currentProfile = AppStore.getCurrentProfile();
        
        return `
            <aside class="sidebar-left">
                <div class="card">
                    <div class="card-content" style="display: flex; flex-direction: column; align-items: center; gap: var(--space-3);">
                        <img src="${currentProfile.profilePhoto}" alt="Profile" class="avatar avatar-xl">
                        <h4 class="font-semibold text-gray-900">${currentProfile.personalInfo.name}</h4>
                        <button class="btn btn-sm btn-outline" id="view-profile-btn">View Profile</button>
                    </div>
                </div>
                
                <div class="card" style="margin-top: var(--space-4);">
                    <div class="card-content">
                        <h3 class="font-semibold text-gray-900" style="margin-bottom: var(--space-3);">Quick Tags</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
                            <span class="badge badge-primary">#Hiring</span>
                            <span class="badge badge-primary">#QuickGig</span>
                            <span class="badge badge-primary">#LocalBusiness</span>
                            <span class="badge badge-primary">#Services</span>
                        </div>
                    </div>
                </div>
            </aside>
        `;
    },
    
    renderFeed() {
        const currentProfile = AppStore.getCurrentProfile();
        const userPosts = AppStore.state.market.posts;
        const allPosts = [...userPosts, ...this.mockPosts];
        
        return `
            <div class="feed">
                ${this.renderCreatePost(currentProfile)}
                ${allPosts.map(post => this.renderPost(post)).join('')}
            </div>
        `;
    },
    
    renderCreatePost(profile) {
        return `
            <div class="create-post-card">
                <div class="create-post-input">
                    <img src="${profile.profilePhoto}" alt="Your profile" class="avatar avatar-md">
                    <textarea class="textarea" placeholder="What's happening in your local area?" id="post-textarea"></textarea>
                </div>
                <div class="create-post-actions">
                    <div class="create-post-actions-left">
                        <button class="btn btn-ghost btn-sm">
                            ${getIcon('image')}
                            Photo
                        </button>
                    </div>
                    <button class="btn btn-primary" id="create-post-btn">Post</button>
                </div>
            </div>
        `;
    },
    
    renderPost(post) {
        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <img src="${post.authorAvatar}" alt="${post.author}" class="post-avatar">
                    <div class="post-author-info">
                        <div class="post-author-name">${post.author}</div>
                        <div class="post-meta">
                            <span>${post.timestamp}</span>
                            <span>•</span>
                            <span class="badge badge-primary">${post.tag}</span>
                        </div>
                    </div>
                </div>
                
                <div class="post-content">${escapeHtml(post.content)}</div>
                
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                
                <div class="post-actions">
                    <button class="post-action-btn ${post.isLiked ? 'liked' : ''}" data-action="like" data-post-id="${post.id}">
                        ${getIcon('heart')}
                        <span>${post.likes}</span>
                    </button>
                    <button class="post-action-btn" data-action="comment" data-post-id="${post.id}">
                        ${getIcon('messageCircle')}
                        <span>Comment</span>
                    </button>
                    <button class="post-action-btn" data-action="share">
                        ${getIcon('send')}
                        <span>Share</span>
                    </button>
                </div>
                
                <div class="comments-section hidden" id="comments-${post.id}">
                    <div class="comments-list">
                        ${post.comments.map(comment => this.renderComment(comment)).join('')}
                    </div>
                    <div class="comment-input-section">
                        <img src="${AppStore.getCurrentProfile().profilePhoto}" alt="Your profile" class="avatar avatar-sm">
                        <input type="text" class="input" placeholder="Write a comment..." data-post-id="${post.id}">
                        <button class="btn btn-primary btn-sm" data-action="add-comment" data-post-id="${post.id}">
                            ${getIcon('send')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderComment(comment) {
        return `
            <div class="comment-item">
                <img src="${comment.authorAvatar}" alt="${comment.author}" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-text">${escapeHtml(comment.content)}</div>
                    <div class="comment-timestamp">${comment.timestamp}</div>
                </div>
            </div>
        `;
    },
    
    renderRightSidebar() {
        return `
            <aside class="sidebar-right">
                <div class="card">
                    <div class="card-content">
                        <h3 class="font-semibold text-gray-900" style="margin-bottom: var(--space-4);">Side Quests</h3>
                        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                            <div style="padding: var(--space-3); background-color: var(--purple-50); border-left: 3px solid var(--purple-600); border-radius: var(--radius-md);">
                                <h4 class="font-semibold text-gray-900" style="font-size: 0.875rem; margin-bottom: var(--space-2);">Delivery Helper Needed</h4>
                                <p class="text-sm text-gray-600" style="margin-bottom: var(--space-2);">Quick 2-hour gig near you</p>
                                <div style="display: flex; gap: var(--space-2);">
                                    <span class="badge badge-secondary">₹500</span>
                                    <span class="badge badge-secondary">Today</span>
                                </div>
                            </div>
                            <div style="padding: var(--space-3); background-color: var(--purple-50); border-left: 3px solid var(--purple-600); border-radius: var(--radius-md);">
                                <h4 class="font-semibold text-gray-900" style="font-size: 0.875rem; margin-bottom: var(--space-2);">Event Setup Assistant</h4>
                                <p class="text-sm text-gray-600" style="margin-bottom: var(--space-2);">Help with wedding decoration</p>
                                <div style="display: flex; gap: var(--space-2);">
                                    <span class="badge badge-secondary">₹800</span>
                                    <span class="badge badge-secondary">Tomorrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        `;
    },
    
    attachEvents() {
        // Mode toggle
        const modeToggle = document.getElementById('mode-toggle');
        if (modeToggle) {
            modeToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    AppStore.navigateTo('dashboard');
                }
            });
        }
        
        // Profile picture click
        const profilePic = document.getElementById('profile-pic');
        if (profilePic) {
            profilePic.addEventListener('click', () => {
                AppStore.navigateTo('profile');
            });
        }
        
        // View profile button
        const viewProfileBtn = document.getElementById('view-profile-btn');
        if (viewProfileBtn) {
            viewProfileBtn.addEventListener('click', () => {
                AppStore.navigateTo('profile');
            });
        }
        
        // Navigation
        const navGigs = document.querySelector('[data-nav="gigs"]');
        if (navGigs) {
            navGigs.addEventListener('click', (e) => {
                e.preventDefault();
                AppStore.navigateTo('gigs');
            });
        }
        
        // Create post
        const createPostBtn = document.getElementById('create-post-btn');
        const postTextarea = document.getElementById('post-textarea');
        if (createPostBtn && postTextarea) {
            createPostBtn.addEventListener('click', () => {
                const content = postTextarea.value.trim();
                if (content) {
                    AppStore.addMarketPost(content);
                    postTextarea.value = '';
                    this.render();
                }
            });
        }
        
        // Post actions
        document.querySelectorAll('[data-action="like"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = btn.dataset.postId;
                btn.classList.toggle('liked');
                const count = btn.querySelector('span');
                const currentCount = parseInt(count.textContent);
                count.textContent = btn.classList.contains('liked') ? currentCount + 1 : currentCount - 1;
            });
        });
        
        document.querySelectorAll('[data-action="comment"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = btn.dataset.postId;
                const commentsSection = document.getElementById(`comments-${postId}`);
                commentsSection.classList.toggle('hidden');
            });
        });
        
        // Add comment
        document.querySelectorAll('[data-action="add-comment"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = btn.dataset.postId;
                const input = document.querySelector(`input[data-post-id="${postId}"]`);
                const content = input.value.trim();
                if (content) {
                    // Find if it's a user post or mock post and add comment accordingly
                    const userPost = AppStore.state.market.posts.find(p => p.id === postId);
                    if (userPost) {
                        AppStore.addComment(postId, 'market', content);
                        this.render();
                    } else {
                        // For mock posts, just add to UI (not persisted)
                        const post = this.mockPosts.find(p => p.id === postId);
                        if (post) {
                            const newComment = {
                                id: generateId('comment'),
                                author: AppStore.getCurrentProfile().personalInfo.name,
                                authorAvatar: AppStore.getCurrentProfile().profilePhoto,
                                content,
                                timestamp: 'Just now'
                            };
                            post.comments.push(newComment);
                            this.render();
                        }
                    }
                }
            });
        });
    }
};
