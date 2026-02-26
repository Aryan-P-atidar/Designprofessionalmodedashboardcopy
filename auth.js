// API Base URL - In development, Vite proxy handles this
// In production, update this to your backend URL
const API_URL = import.meta.env.PROD 
    ? 'http://localhost:3000/api' 
    : '/api';

// Switch between login and signup tabs
function switchTab(tab) {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const messageContainer = document.getElementById('message-container');
    
    messageContainer.classList.add('hidden');
    
    if (tab === 'login') {
        loginTab.classList.add('text-purple-600', 'border-b-2', 'border-purple-600');
        loginTab.classList.remove('text-gray-500');
        signupTab.classList.remove('text-purple-600', 'border-b-2', 'border-purple-600');
        signupTab.classList.add('text-gray-500');
        
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        signupTab.classList.add('text-purple-600', 'border-b-2', 'border-purple-600');
        signupTab.classList.remove('text-gray-500');
        loginTab.classList.remove('text-purple-600', 'border-b-2', 'border-purple-600');
        loginTab.classList.add('text-gray-500');
        
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

// Show message to user
function showMessage(message, type = 'error') {
    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.remove('hidden', 'bg-red-50', 'bg-green-50', 'text-red-700', 'text-green-700', 'border-red-200', 'border-green-200');
    
    if (type === 'error') {
        messageContainer.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
        messageContainer.innerHTML = `
            <div class="flex items-start">
                <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm font-medium">${message}</span>
            </div>
        `;
    } else {
        messageContainer.classList.add('bg-green-50', 'text-green-700', 'border', 'border-green-200');
        messageContainer.innerHTML = `
            <div class="flex items-start">
                <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm font-medium">${message}</span>
            </div>
        `;
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // Redirect to main app after 1 second
            setTimeout(() => {
                window.location.href = 'complete-app.html';
            }, 1000);
        } else {
            showMessage(data.error || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Connection error. Please check if the server is running.');
    }
}

// Handle Signup
async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const accountType = document.getElementById('signup-type').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, accountType })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            showMessage('Account created successfully! Redirecting...', 'success');
            
            // Redirect to main app after 1 second
            setTimeout(() => {
                window.location.href = 'complete-app.html';
            }, 1000);
        } else {
            showMessage(data.error || 'Signup failed. Please try again.');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showMessage('Connection error. Please check if the server is running.');
    }
}

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        // Validate token with backend
        fetch(`${API_URL}/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'complete-app.html';
            } else {
                // Token invalid, clear storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        })
        .catch(error => {
            console.error('Token verification error:', error);
        });
    }
});