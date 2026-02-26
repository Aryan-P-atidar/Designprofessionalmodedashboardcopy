# ⚡ Quick Start - 30 Seconds to Running!

## Step 1: Install (First time only)
```bash
npm install
```

## Step 2: Start Backend
```bash
npm start
```

## Step 3: Open App
Open `index.html` in your browser

OR use a local server:
```bash
npx http-server -p 8080
```
Then visit: `http://localhost:8080`

---

## 🧪 Quick Test

Check if server is running:
```bash
curl http://localhost:3000/api/test
```

---

## 🎯 What to Do First

1. **Open** `index.html` - Check server status
2. **Click** "Get Started" button
3. **Sign Up** - Create your account
4. **Explore** - Start networking!

---

## 🔥 Most Common Issues

### Server won't start?
```bash
# Kill process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Can't login?
- Make sure backend is running: `npm start`
- Check console (F12) for errors
- Clear localStorage: `localStorage.clear()`

### Nothing shows up?
- Open `http://localhost:8080` (not file://)
- Or just open `login.html` directly

---

## 📱 Demo Accounts (After signup)

Create these for testing:

**Professional Account:**
- Name: Sarah Chen
- Email: sarah@test.com
- Account Type: Professional Mode

**Market Account:**
- Name: Aryan Patidar  
- Email: aryan@test.com
- Account Type: Market Mode

---

## 🚀 Production Checklist

- [ ] Set `JWT_SECRET` in .env
- [ ] Use real database (MongoDB/PostgreSQL)
- [ ] Update `API_URL` in auth.js
- [ ] Enable HTTPS
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Set up monitoring

---

## 📚 Full Documentation

- `README.md` - Complete documentation
- `SETUP_GUIDE.md` - Detailed setup steps
- `server.js` - Backend code with comments

---

## 💡 Pro Tips

1. Use `npm run dev` for auto-restart
2. Check `http://localhost:3000/api/test` first
3. Open DevTools (F12) to see errors
4. JWT tokens last 7 days
5. Data resets when server restarts (in-memory)

---

**Need more help?** Read SETUP_GUIDE.md

**Ready to go?** Run: `npm start` 🚀
