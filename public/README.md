# In-Folio - HTML/CSS/JavaScript Version

A professional networking web application with dual account modes: **Market Mode** (local marketplace and gigs) and **Professional Mode** (career dashboard and jobs).

## 📁 Project Structure

```
public/
├── index.html                          # Main HTML entry point
├── css/                                # Stylesheets
│   ├── variables.css                   # CSS custom properties
│   ├── reset.css                       # CSS reset and base styles
│   ├── components.css                  # Reusable component styles
│   ├── layout.css                      # Layout and grid systems
│   ├── components/                     # Component-specific styles
│   │   ├── drawer.css                  # Profile drawer/hamburger menu
│   │   ├── header.css                  # Page headers
│   │   ├── post-card.css               # Post cards with comments
│   │   ├── sidebar.css                 # Sidebar components
│   │   ├── gig-card.css                # Gig marketplace cards
│   │   └── profile.css                 # Profile page components
│   └── pages/                          # Page-specific styles
│       ├── marketplace.css             # Local marketplace page
│       ├── gigs.css                    # Gigs marketplace page
│       ├── dashboard.css               # Professional dashboard page
│       └── jobs.css                    # Jobs page
├── js/                                 # JavaScript files
│   ├── utils/                          # Utility functions
│   │   ├── icons.js                    # SVG icon library
│   │   └── helpers.js                  # Helper functions
│   ├── state/                          # State management
│   │   └── store.js                    # Global state store
│   ├── components/                     # Component logic
│   │   ├── drawer.js                   # Drawer component
│   │   ├── header.js                   # Header component
│   │   ├── post-card.js                # Post card component
│   │   ├── create-post.js              # Create post component
│   │   ├── sidebar-left.js             # Left sidebar component
│   │   ├── sidebar-right.js            # Right sidebar component
│   │   ├── gig-card.js                 # Gig card component
│   │   ├── filter-sidebar.js           # Filter sidebar component
│   │   └── profile-view.js             # Profile view component
│   ├── pages/                          # Page renderers
│   │   ├── marketplace.js              # Marketplace page
│   │   ├── gigs.js                     # Gigs page
│   │   ├── dashboard.js                # Dashboard page
│   │   ├── jobs.js                     # Jobs page
│   │   └── profile.js                  # Profile page
│   └── app.js                          # Main application controller
└── README.md                           # This file
```

## 🚀 Features

### Dual Account System
- **Market Mode** (Aryan Patidar)
  - Local Marketplace with posts, likes, and comments
  - Gigs Marketplace with filter sidebar
  - Market Profile
  
- **Professional Mode** (Sarah Chen)
  - Professional Dashboard (3-column layout)
  - Jobs Board
  - Professional Profile

### Key Functionality
✅ Hamburger menu navigation with profile-aware info  
✅ Dynamic post creation with likes and comments  
✅ Gigs marketplace with:
  - Gradient background (purple → pink → blue)
  - Glassmorphism design
  - Filter sidebar with salary range sliders
  - WhatsApp integration buttons  
✅ Mode toggle switch (Local ↔ Professional)  
✅ Separate data and state for each account mode  
✅ LocalStorage persistence  
✅ Fully responsive design  

## 🎨 Architecture

### State Management
The app uses a centralized store pattern (`AppStore` in `state/store.js`):
- Maintains separate profiles for Market and Professional modes
- Handles navigation and profile mode switching
- Persists state to localStorage
- Implements pub/sub pattern for reactivity

### Component Pattern
Each component follows this pattern:
```javascript
const ComponentName = {
    element: null,
    
    render() {
        // Generate HTML
    },
    
    attachEvents() {
        // Attach event listeners
    },
    
    update(state) {
        // Update UI based on state changes
    }
};
```

### Page Rendering
Pages are rendered by clearing the main container and injecting HTML:
```javascript
container.innerHTML = `
    <div class="page-container">
        ${this.renderHeader()}
        ${this.renderContent()}
    </div>
`;
```

## 🛠️ Getting Started

### Prerequisites
- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- A local web server (optional but recommended)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd in-folio
   ```

2. **Serve the files**
   
   Option A: Using Python
   ```bash
   cd public
   python -m http.server 8000
   ```
   
   Option B: Using Node.js
   ```bash
   npx serve public
   ```
   
   Option C: Using VS Code Live Server
   - Install "Live Server" extension
   - Right-click `public/index.html`
   - Select "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📖 Usage

### Navigation
- **Hamburger Menu** (top-left): Access all pages and see current profile
- **Mode Toggle**: Switch between Local and Professional modes
- **Profile Picture**: Click to view your profile
- **Back Buttons**: Navigate to previous screens

### Marketplace Features
- **Create Post**: Type in the textarea and click "Post"
- **Like Posts**: Click the heart icon
- **Comment**: Click "Comment" button, type, and submit
- **View Gigs**: Click "Gigs" in navigation

### Gigs Features
- **Filter**: Use location search and salary sliders
- **Contact**: Click WhatsApp button on any gig
- **Navigate**: Use back button to return to marketplace

### Profile Features
- **View Info**: See personal information in "About" tab
- **Projects**: View project showcase in "Projects" tab
- **Experience**: See work history in "Experience" tab

## 🔧 Customization

### Adding a New Page

1. **Create CSS file**
   ```css
   /* public/css/pages/my-page.css */
   .my-page-container {
       /* styles */
   }
   ```

2. **Create JS file**
   ```javascript
   // public/js/pages/my-page.js
   const MyPage = {
       render() {
           // implementation
       },
       attachEvents() {
           // implementation
       }
   };
   ```

3. **Update index.html**
   ```html
   <link rel="stylesheet" href="css/pages/my-page.css">
   <script src="js/pages/my-page.js"></script>
   ```

4. **Add to app.js**
   ```javascript
   case 'my-page':
       MyPage.render();
       break;
   ```

### Modifying Styles

All styles use CSS custom properties defined in `css/variables.css`:

```css
:root {
    --purple-600: #9333ea;
    --gray-900: #111827;
    /* ... more variables */
}
```

Change these to customize the entire color scheme.

### Adding Mock Data

Modify the arrays in page files:
```javascript
// In js/pages/marketplace.js
mockPosts: [
    {
        id: '1',
        author: 'New Author',
        content: 'New post content',
        // ... more fields
    }
]
```

## 🏗️ Technical Details

### State Management
- **Store**: `AppStore` in `js/state/store.js`
- **Pattern**: Centralized state with pub/sub
- **Persistence**: localStorage
- **Updates**: Reactive through listeners

### Event Handling
- Event delegation for dynamic content
- Inline event handlers for simpler interactions
- Centralized event attachment in `attachEvents()` methods

### Routing
- Hash-free routing using state
- Navigation through `AppStore.navigateTo(screen)`
- Automatic profile mode switching

### Performance
- No virtual DOM overhead
- Direct DOM manipulation
- Minimal JavaScript bundle (no frameworks)
- Fast initial load

## 📱 Responsive Design

Breakpoints:
- **Desktop**: 1024px+ (3-column layouts, full navigation)
- **Tablet**: 768px-1023px (2-column, simplified navigation)
- **Mobile**: <768px (single column, icons only)

## 🔐 Data Privacy

- All data stored in browser's localStorage
- No server communication
- No external API calls (except Unsplash for images)
- Completely client-side application

## 🐛 Troubleshooting

### Page doesn't load
- Ensure you're serving via HTTP (not file://)
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

### Styles not applying
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check CSS file paths in index.html
- Verify CSS files exist

### State not persisting
- Check localStorage quota (5-10MB limit)
- Ensure browser allows localStorage
- Check for privacy/incognito mode

## 📄 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

## 🤝 Contributing

This is a demonstration project. To extend:

1. Follow existing component patterns
2. Use semantic HTML
3. Maintain CSS variable usage
4. Keep components modular
5. Document new features

## 📝 License

This project is created for educational and demonstration purposes.

## 🎯 Future Enhancements

Potential additions:
- [ ] Real backend integration
- [ ] User authentication
- [ ] Image upload functionality
- [ ] Search functionality
- [ ] Notifications system
- [ ] Messaging feature
- [ ] Advanced filtering
- [ ] Data export

---

**Note**: This is a client-side only application. For production use with real user data, integrate with a backend API and database.

For questions or issues, refer to the inline code comments or create an issue in the repository.
