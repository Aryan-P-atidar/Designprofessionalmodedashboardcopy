# In-Folio - Professional Networking Platform

A full-stack professional networking web application with dual modes (Professional & Market), complete authentication system, and Node.js backend.

## 🚀 Features

### Frontend
- **Dual Account System**: Professional Mode (Sarah Chen) & Market Mode (Aryan Patidar)
- **4 Main Sections**: Professional Dashboard, Market Marketplace, Gigs, Profile Pages
- **Post Management**: Create posts with images, like/unlike, comment/reply system
- **Job Listings**: Professional job board with advanced filtering
- **Gigs Marketplace**: Local gigs with category filters and salary sliders
- **Profile Pages**: Pinterest-style project grid, banner images
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Authentication**: Secure login/signup with JWT tokens

### Backend
- **Node.js + Express**: RESTful API
- **JWT Authentication**: Secure token-based auth
- **Password Encryption**: bcrypt hashing
- **User Management**: Profile updates, account types
- **CORS Enabled**: Cross-origin requests supported

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone/Download the project

### 2. Install Dependencies

```bash
npm install
```

This will install:
- express (Web framework)
- cors (Cross-origin resource sharing)
- jsonwebtoken (JWT authentication)
- bcryptjs (Password hashing)
- body-parser (Request body parsing)

### 3. Start the Backend Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 4. Open the Application

Open `login.html` in your browser to start using the application.

**Note**: For local development, you may need to serve the files using a local server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js http-server
npx http-server -p 8080
```

Then visit: `http://localhost:8080/login.html`

## 🔐 Authentication Flow

### Sign Up
1. Go to `login.html`
2. Click "Sign Up" tab
3. Fill in:
   - Full Name
   - Email
   - Password (min 6 characters)
   - Account Type (Professional or Market)
4. Accept terms and click "Create Account"
5. Redirects to main app with JWT token

### Sign In
1. Go to `login.html`
2. Enter email and password
3. Click "Sign In"
4. Redirects to main app

### Logout
1. Click hamburger menu (top left)
2. Scroll to bottom
3. Click "Logout" button

## 🌐 API Endpoints

All endpoints are prefixed with `/api`

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create new user account |
| POST | `/auth/login` | Login with email/password |
| GET | `/auth/verify` | Verify JWT token validity |
| GET | `/auth/me` | Get current user profile |
| PUT | `/auth/profile` | Update user profile |
| POST | `/auth/logout` | Logout (client clears token) |
| GET | `/test` | Test if API is running |

### Example: Sign Up Request

```javascript
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "accountType": "professional"
}
```

### Example: Login Request

```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response Format

```javascript
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "accountType": "professional",
    "photo": "https://...",
    "banner": "https://..."
  }
}
```

## 🗂️ File Structure

```
in-folio/
├── login.html              # Login/Signup page
├── complete-app.html       # Main app HTML
├── complete-app.js         # Main app JavaScript
├── auth.js                 # Authentication frontend logic
├── server.js               # Node.js backend server
├── package.json            # Node dependencies
└── README.md               # This file
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: 7-day expiration
- **Protected Routes**: Middleware authentication
- **CORS Protection**: Configurable origins
- **Input Validation**: Server-side validation
- **XSS Protection**: Input sanitization

## ⚙️ Configuration

### Change JWT Secret (Important for Production!)

In `server.js`, update:

```javascript
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
```

Use environment variable:

```bash
JWT_SECRET="your-super-secret-key-here" npm start
```

### Change Port

In `server.js`:

```javascript
const PORT = process.env.PORT || 3000;
```

Or use environment variable:

```bash
PORT=5000 npm start
```

### Update API URL (Frontend)

In `auth.js`, change:

```javascript
const API_URL = 'http://localhost:3000/api';
```

For production, use your deployed backend URL:

```javascript
const API_URL = 'https://your-backend.com/api';
```

## 🚀 Production Deployment

### Backend (Node.js)

Deploy to:
- Heroku
- DigitalOcean
- AWS EC2
- Railway
- Render

**Important**: Set environment variables:
```
JWT_SECRET=your-production-secret-key
NODE_ENV=production
```

### Frontend

Deploy to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

Update `API_URL` in `auth.js` to point to your deployed backend.

### Database (Recommended for Production)

Replace in-memory storage with:
- **MongoDB**: Use mongoose for ODM
- **PostgreSQL**: Use pg or sequelize
- **MySQL**: Use mysql2 or sequelize

Current implementation uses in-memory array (resets on server restart).

## 🧪 Testing the API

Test if server is running:

```bash
curl http://localhost:3000/api/test
```

Expected response:
```json
{
  "message": "In-Folio API is running!",
  "timestamp": "2024-02-26T...",
  "registeredUsers": 0
}
```

## 📱 Features Breakdown

### Professional Dashboard
- 3-column layout (responsive)
- Post creation with image upload
- Like/unlike functionality
- Comment and reply system
- Side-Quest Board
- Job listings with filters

### Market Marketplace
- Local job listings
- WhatsApp integration buttons
- Post creation and interaction
- Applicant tracking

### Gigs Section
- Gradient background design
- Category filters (expandable)
- Location search
- Salary range sliders
- Real-time filter updates

### Profile Pages
- Banner images
- Profile photos
- Pinterest-style project grid
- User information display
- Verified badge

## 🛠️ Troubleshooting

### "Connection error" on login/signup
- Make sure backend server is running (`npm start`)
- Check console for errors
- Verify `API_URL` in `auth.js` matches your server

### "CORS error"
- Ensure CORS is enabled in `server.js`
- Check allowed origins configuration

### Token expired
- Tokens expire after 7 days
- User will be redirected to login
- Simply log in again

### Can't access protected pages
- Clear browser localStorage
- Log in again to get new token

## 📝 License

This project is for educational purposes.

## 👨‍💻 Support

For issues or questions, check the console logs in browser DevTools (F12).

---

**Built with ❤️ using Node.js, Express, HTML, CSS, JavaScript, and Tailwind CSS**
