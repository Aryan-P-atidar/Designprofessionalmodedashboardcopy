// Global State Management
const AppStore = {
    // Current state
    state: {
        activeScreen: 'marketplace', // 'marketplace', 'gigs', 'dashboard', 'jobs', 'profile'
        profileMode: 'market', // 'professional', 'market'
        isDrawerOpen: false,
        
        // Professional Mode Data
        professional: {
            profilePhoto: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200',
            bannerImage: 'https://images.unsplash.com/photo-1665707888808-d44ad6ff690d?w=1200',
            personalInfo: {
                name: 'Sarah Chen',
                dob: '1995-06-15',
                email: 'sarah.chen@example.com',
                phone: '+1 (555) 123-4567'
            },
            posts: []
        },
        
        // Market Mode Data
        market: {
            profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
            bannerImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200',
            personalInfo: {
                name: 'Aryan Patidar',
                dob: '1998-03-22',
                email: 'aryan.patidar@example.com',
                phone: '+91 98765 43210'
            },
            posts: []
        }
    },
    
    // Listeners for state changes
    listeners: [],
    
    // Get current profile based on active screen
    getCurrentProfile() {
        if (this.state.activeScreen === 'marketplace' || this.state.activeScreen === 'gigs') {
            return this.state.market;
        } else if (this.state.activeScreen === 'profile') {
            return this.state.profileMode === 'market' ? this.state.market : this.state.professional;
        } else {
            return this.state.professional;
        }
    },
    
    // Get current mode
    getCurrentMode() {
        if (this.state.activeScreen === 'marketplace' || this.state.activeScreen === 'gigs') {
            return 'market';
        } else if (this.state.activeScreen === 'profile') {
            return this.state.profileMode;
        } else {
            return 'professional';
        }
    },
    
    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    },
    
    // Notify all listeners
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    },
    
    // Update state
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.saveToLocalStorage();
        this.notify();
    },
    
    // Navigation helper
    navigateTo(screen) {
        // Set profile mode based on navigation
        if (screen === 'profile') {
            if (this.state.activeScreen === 'marketplace' || this.state.activeScreen === 'gigs') {
                this.setState({ profileMode: 'market' });
            } else {
                this.setState({ profileMode: 'professional' });
            }
        }
        this.setState({ activeScreen: screen });
    },
    
    // Toggle drawer
    toggleDrawer(isOpen) {
        this.setState({ isDrawerOpen: isOpen });
    },
    
    // Add professional post
    addProfessionalPost(content, image) {
        const newPost = {
            id: `prof-${Date.now()}`,
            author: this.state.professional.personalInfo.name,
            authorAvatar: this.state.professional.profilePhoto,
            tag: '#Update',
            content,
            image,
            timestamp: 'Just now',
            replies: 0,
            bookmarks: 0,
            likes: 0,
            isLiked: false,
            comments: []
        };
        
        const professional = {
            ...this.state.professional,
            posts: [newPost, ...this.state.professional.posts]
        };
        
        this.setState({ professional });
    },
    
    // Add market post
    addMarketPost(content, image) {
        const newPost = {
            id: `market-${Date.now()}`,
            author: this.state.market.personalInfo.name,
            authorAvatar: this.state.market.profilePhoto,
            tag: '#LocalGig',
            content,
            image,
            timestamp: 'Just now',
            replies: 0,
            bookmarks: 0,
            likes: 0,
            isLiked: false,
            comments: []
        };
        
        const market = {
            ...this.state.market,
            posts: [newPost, ...this.state.market.posts]
        };
        
        this.setState({ market });
    },
    
    // Toggle like on post
    toggleLike(postId, mode) {
        const profile = mode === 'market' ? 'market' : 'professional';
        const posts = this.state[profile].posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        });
        
        this.setState({
            [profile]: {
                ...this.state[profile],
                posts
            }
        });
    },
    
    // Add comment to post
    addComment(postId, mode, content) {
        const profile = mode === 'market' ? 'market' : 'professional';
        const currentProfile = this.state[profile];
        
        const posts = this.state[profile].posts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    id: `comment-${Date.now()}`,
                    author: currentProfile.personalInfo.name,
                    authorAvatar: currentProfile.profilePhoto,
                    content,
                    timestamp: 'Just now'
                };
                
                return {
                    ...post,
                    comments: [...post.comments, newComment]
                };
            }
            return post;
        });
        
        this.setState({
            [profile]: {
                ...this.state[profile],
                posts
            }
        });
    },
    
    // Save to localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('appState', JSON.stringify(this.state));
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    },
    
    // Load from localStorage
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('appState');
            if (saved) {
                this.state = { ...this.state, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    },
    
    // Initialize
    init() {
        this.loadFromLocalStorage();
    }
};

// Initialize store
AppStore.init();
