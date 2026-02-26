// Main Application Controller
const App = {
    currentPage: null,
    
    init() {
        // Initialize drawer
        ProfileDrawer.init();
        
        // Setup hamburger button
        const hamburgerBtn = document.getElementById('hamburger-btn');
        hamburgerBtn.addEventListener('click', () => {
            AppStore.toggleDrawer(true);
        });
        
        // Subscribe to state changes
        AppStore.subscribe((state) => {
            this.handleStateChange(state);
        });
        
        // Initial render
        this.render();
    },
    
    render() {
        const screen = AppStore.state.activeScreen;
        
        switch (screen) {
            case 'marketplace':
                MarketplacePage.render();
                break;
            case 'gigs':
                GigsPage.render();
                break;
            case 'dashboard':
                DashboardPage.render();
                break;
            case 'jobs':
                JobsPage.render();
                break;
            case 'profile':
                ProfilePage.render();
                break;
            default:
                MarketplacePage.render();
        }
        
        this.currentPage = screen;
    },
    
    handleStateChange(state) {
        // If screen changed, re-render
        if (state.activeScreen !== this.currentPage) {
            this.render();
        }
        
        // Update drawer state
        if (state.isDrawerOpen) {
            ProfileDrawer.open();
        } else {
            ProfileDrawer.close();
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
