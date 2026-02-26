# 🚀 In-Folio Setup Guide

Complete step-by-step guide to get In-Folio running on your machine.

## 📋 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Backend Server
```bash
npm start
```

### Step 3: Open Application
Open `login.html` in your browser or use a local server:
```bash
npx http-server -p 8080
```
Then visit: `http://localhost:8080/login.html`

---

## 🔧 Detailed Setup Instructions

### Prerequisites Check

**1. Check if Node.js is installed:**
```bash
node --version
```
Should show v14.0.0 or higher. If not installed, download from [nodejs.org](https://nodejs.org/)

**2. Check if npm is installed:**
```bash
npm --version
```
Should show 6.0.0 or higher (comes with Node.js)

### Installation Steps

**1. Navigate to project directory:**
```bash
cd path/to/in-folio
```

**2. Install all dependencies:**
```bash
npm install
```

This installs:
- express (v4.18.2) - Web framework
- cors (v2.8.5) - Cross-origin requests
- jsonwebtoken (v9.0.2) - JWT authentication
- bcryptjs (v2.4.3) - Password hashing
- body-parser (v1.20.2) - Request parsing

**3. Verify installation:**
```bash
npm test || echo "Dependencies installed successfully"
```

### Starting the Application

**Option A: Using Quick Start Scripts**

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Option B: Manual Start**

**Terminal 1 - Backend Server:**
```bash
npm start
```

You should see:
```
🚀 In-Folio Backend Server running on http://localhost:3000
📝 API endpoints:
   POST /api/auth/signup - Create new account
   POST /api/auth/login - Login to account
   ...
```

**Terminal 2 - Frontend Server (Optional but recommended):**
```bash
npx http-server -p 8080
```

Or using Python:
```bash
python -m http.server 8080
```

### First Time Usage

**1. Create an Account:**
- Open `http://localhost:8080/login.html` (or just open login.html in browser)
- Click "Sign Up" tab
- Fill in:
  - **Name**: Your full name
  - **Email**: Your email address
  - **Password**: At least 6 characters
  - **Account Type**: Choose "Professional Mode" or "Market Mode"
- Click "Create Account"

**2. You're In!**
- After signup, you'll be automatically logged in
- You'll see the main dashboard
- Your account info is in the top-left hamburger menu

**3. Explore Features:**
- Click hamburger menu (☰) to navigate
- Try posting content
- Browse jobs or gigs
- Check out your profile

---

## 🧪 Testing the Setup

### Test 1: Backend Server Health
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

### Test 2: Create Test Account
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "accountType": "professional"
  }'
```

### Test 3: Login with Test Account
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

---

## 🔒 Security Setup (Important!)

### For Development:
The default setup works fine for local development.

### For Production:

**1. Set JWT Secret:**
Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```
JWT_SECRET=your-very-long-random-secret-key-here
NODE_ENV=production
PORT=3000
```

**2. Generate Strong Secret:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output to your `.env` file.

**3. Update CORS for Production:**

In `server.js`, update:
```javascript
app.use(cors({
  origin: ['https://yourdomain.com'],
  credentials: true
}));
```

---

## 🌐 Accessing from Other Devices

### On Local Network:

**1. Find your IP address:**

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address"

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```
or
```bash
hostname -I
```

**2. Update auth.js:**
Replace in `auth.js`:
```javascript
const API_URL = 'http://192.168.1.XXX:3000/api';
```

**3. Access from other devices:**
```
http://192.168.1.XXX:8080/login.html
```

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

### Problem: "Port 3000 is already in use"
**Solution:** 
```bash
# Find process using port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
PORT=5000 npm start
```

### Problem: "Cannot GET /api/auth/signup"
**Solution:** Make sure you're using POST request, not GET:
```javascript
fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',  // Important!
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({...})
})
```

### Problem: "CORS policy" error
**Solution:** Backend server must be running. Check:
```bash
curl http://localhost:3000/api/test
```

### Problem: "Connection refused"
**Solution:** 
1. Backend server is not running - run `npm start`
2. Wrong URL in auth.js - check `API_URL` setting
3. Firewall blocking - temporarily disable firewall

### Problem: Login works but nothing loads
**Solution:** 
1. Check browser console (F12)
2. Make sure `complete-app.html` and `complete-app.js` exist
3. Clear localStorage: `localStorage.clear()`

### Problem: "Token expired" message
**Solution:** Tokens last 7 days. Just login again.

---

## 📦 Project Structure

```
in-folio/
├── Backend Files
│   ├── server.js           # Main backend server
│   ├── package.json        # Dependencies
│   └── .env               # Environment variables (create this)
│
├── Frontend Files
│   ├── login.html         # Login/signup page
│   ├── auth.js            # Auth logic
│   ├── complete-app.html  # Main app
│   └── complete-app.js    # App functionality
│
├── Documentation
│   ├── README.md          # Main documentation
│   ├── SETUP_GUIDE.md     # This file
│   └── .env.example       # Environment template
│
└── Scripts
    ├── start.sh           # Linux/Mac start script
    └── start.bat          # Windows start script
```

---

## 🚀 Deployment Guide

### Deploy Backend (Heroku Example)

**1. Install Heroku CLI:**
```bash
npm install -g heroku
```

**2. Login to Heroku:**
```bash
heroku login
```

**3. Create app:**
```bash
heroku create your-app-name
```

**4. Set environment variables:**
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production
```

**5. Deploy:**
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

**6. Update auth.js:**
```javascript
const API_URL = 'https://your-app-name.herokuapp.com/api';
```

### Deploy Frontend (Netlify Example)

**1. Build frontend files** (already done - HTML/CSS/JS)

**2. Deploy to Netlify:**
- Drag and drop your frontend files to [netlify.com](https://netlify.com)
- Or use Netlify CLI

**3. Update API URL:**
After backend is deployed, update in `auth.js`:
```javascript
const API_URL = 'https://your-backend-url.com/api';
```

---

## 💡 Tips & Best Practices

1. **Always run backend before frontend**
2. **Use environment variables for secrets**
3. **Clear browser cache if styles don't update**
4. **Check browser console for errors (F12)**
5. **Use HTTPS in production**
6. **Backup your user data** (currently in-memory)
7. **Consider adding a real database** for production

---

## 📞 Need Help?

1. Check console logs: F12 in browser
2. Check terminal output where server is running
3. Test API endpoints with curl or Postman
4. Review this guide again carefully
5. Check README.md for API documentation

---

## ✅ Checklist

- [ ] Node.js installed (v14+)
- [ ] Dependencies installed (`npm install`)
- [ ] Backend running (`npm start`)
- [ ] Can access http://localhost:3000/api/test
- [ ] Frontend accessible (login.html)
- [ ] Created test account
- [ ] Can login successfully
- [ ] Main app loads after login

If all checked ✅, you're good to go! 🎉

---

**Happy Networking! 🚀**
