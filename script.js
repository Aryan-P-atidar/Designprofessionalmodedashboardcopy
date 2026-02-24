// Screen switching functionality
function switchScreen(screenName) {
    // Remove active class from all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to selected screen
    const selectedScreen = document.getElementById(screenName);
    if (selectedScreen) {
        selectedScreen.classList.add('active');
    }
    
    // Add active class to selected tab
    const clickedTab = event.target;
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

// Initialize first screen as active
document.addEventListener('DOMContentLoaded', () => {
    const firstScreen = document.getElementById('dashboard');
    if (firstScreen) {
        firstScreen.classList.add('active');
    }
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Chat input functionality
const chatInput = document.querySelector('.chat-input');
const chatSendBtn = document.querySelector('.chat-send-btn');

if (chatInput && chatSendBtn) {
    chatSendBtn.addEventListener('click', () => {
        if (chatInput.value.trim()) {
            // In a real app, this would send the message
            console.log('Message sent:', chatInput.value);
            chatInput.value = '';
        }
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            // In a real app, this would send the message
            console.log('Message sent:', chatInput.value);
            chatInput.value = '';
        }
    });
}
