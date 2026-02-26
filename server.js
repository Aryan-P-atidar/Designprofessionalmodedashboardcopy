const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Secret key for JWT - In production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// In-memory database (replace with real database in production)
// For production, use MongoDB, PostgreSQL, or MySQL
const users = [];

// Helper function to find user by email
const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

// Helper function to find user by ID
const findUserById = (id) => {
    return users.find(user => user.id === id);
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// ============================================
// AUTH ROUTES
// ============================================

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password, accountType } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        
        // Check if user already exists
        if (findUserByEmail(email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            accountType: accountType || 'professional',
            createdAt: new Date().toISOString(),
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
            banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200'
        };
        
        users.push(user);
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: userWithoutPassword
        });
        
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        // Find user
        const user = findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify Token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
    const user = findUserById(req.user.id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
        valid: true,
        user: userWithoutPassword
    });
});

// Get Current User
app.get('/api/auth/me', authenticateToken, (req, res) => {
    const user = findUserById(req.user.id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);
});

// Update User Profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
    try {
        const { name, photo, banner } = req.body;
        const user = findUserById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Update user fields
        if (name) user.name = name;
        if (photo) user.photo = photo;
        if (banner) user.banner = banner;
        
        const { password: _, ...userWithoutPassword } = user;
        
        res.json({
            message: 'Profile updated successfully',
            user: userWithoutPassword
        });
        
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout (client-side will clear token)
app.post('/api/auth/logout', authenticateToken, (req, res) => {
    res.json({ message: 'Logout successful' });
});

// ============================================
// TEST ROUTE
// ============================================
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'In-Folio API is running!',
        timestamp: new Date().toISOString(),
        registeredUsers: users.length
    });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`🚀 In-Folio Backend Server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints:`);
    console.log(`   POST /api/auth/signup - Create new account`);
    console.log(`   POST /api/auth/login - Login to account`);
    console.log(`   GET  /api/auth/verify - Verify JWT token`);
    console.log(`   GET  /api/auth/me - Get current user`);
    console.log(`   PUT  /api/auth/profile - Update user profile`);
    console.log(`   POST /api/auth/logout - Logout`);
    console.log(`   GET  /api/test - Test if API is running`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
