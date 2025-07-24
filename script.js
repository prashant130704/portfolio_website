// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple form validation (no submission handling)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show simple confirmation
        alert('Thank you for your message! (Note: This is just a demo form)');
        
        // Reset form
        this.reset();
    });
}

// Typing animation for hero section
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    const originalText = element.textContent;
    element.textContent = '';
    
    const typing = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    };
    
    typing();
};

// Initialize typing animation when page loads
// Note: This is now handled by the enhanced typing animation below
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const text = heroTitle.textContent;
//         heroTitle.textContent = ''; // Clear the text first
//         typeWriter(heroTitle, text, 50);
//     }
// });

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animations for child elements
            const animatedElements = entry.target.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
            animatedElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animations to section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
    });
    
    // Add slide-in animations to skill categories
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        if (index % 2 === 0) {
            category.classList.add('slide-in-left');
        } else {
            category.classList.add('slide-in-right');
        }
    });
    
    // Add scale-in animations to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('scale-in');
    });
    
    // Add fade-in animations to about content
    document.querySelectorAll('.about-intro, .detail-item').forEach(item => {
        item.classList.add('fade-in');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Enhanced typing animation with cursor
const typeWriterWithCursor = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    // Create cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '|';
    cursor.style.cssText = `
        animation: blink 1s infinite;
        color: #4f46e5;
        font-weight: bold;
    `;
    
    // Add cursor blinking animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    const typing = () => {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            element.appendChild(cursor);
            i++;
            setTimeout(typing, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }
            }, 2000);
        }
    };
    
    typing();
};

// Mouse tracking effect
const createMouseTracker = () => {
    const tracker = document.createElement('div');
    tracker.className = 'mouse-tracker';
    tracker.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(tracker);
    
    document.addEventListener('mousemove', (e) => {
        tracker.style.left = e.clientX - 10 + 'px';
        tracker.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale tracker on hover over interactive elements
    document.querySelectorAll('a, button, .btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            tracker.style.transform = 'scale(2)';
            tracker.style.background = 'radial-gradient(circle, rgba(79, 70, 229, 0.5) 0%, transparent 70%)';
        });
        
        element.addEventListener('mouseleave', () => {
            tracker.style.transform = 'scale(1)';
            tracker.style.background = 'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%)';
        });
    });
};

// Smooth scroll with easing
const smoothScrollTo = (target, duration = 1000) => {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };
    
    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };
    
    requestAnimationFrame(animation);
};

// Enhanced project card interactions
const enhanceProjectCards = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 40px rgba(79, 70, 229, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });
};

// Loading screen
const createLoadingScreen = () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>Loading Portfolio...</h2>
        </div>
    `;
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: white;
        font-family: 'Inter', sans-serif;
        transition: opacity 0.5s ease;
    `;
    
    const loadingContent = loadingScreen.querySelector('.loading-content');
    loadingContent.style.cssText = `
        text-align: center;
        animation: fadeInUp 1s ease-out;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingScreen);
            }, 500);
        }, 1500);
    });
};


// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    createLoadingScreen();
    createMouseTracker();
    enhanceProjectCards();
    
    // Add smooth scrolling to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target, 1000);
            }
        });
    });
});

// Initialize enhanced typing animation after loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            if (text.trim() === '') {
                // If text is empty, get the original text from HTML
                const originalText = "Hi, I'm Prashant Shekhar";
                typeWriterWithCursor(heroTitle, originalText, 60);
            } else {
                typeWriterWithCursor(heroTitle, text, 60);
            }
        }
    }, 2500); // Wait for loading screen to finish
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #4f46e5;
        font-weight: 600;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 20px;
    }
    
    .nav-menu.active .nav-item {
        margin: 10px 0;
    }
    
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-item {
        transition: transform 0.3s ease;
    }
    
    .skill-item:hover {
        transform: translateX(10px);
    }
    
    .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .btn {
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
    }
    
    .social-link {
        text-decoration: none;
        transition: transform 0.3s ease;
    }
    
    .social-link:hover {
        transform: scale(1.2);
    }
    
    .highlight {
        background: linear-gradient(45deg, #ffffff, #e0e7ff);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        animation: shimmer 2s infinite;
        font-weight: 700;
        text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    }
    
    @keyframes shimmer {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
    
    .profile-img {
        transition: transform 0.3s ease;
    }
    
    .profile-img:hover {
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        .hero-title {
            font-size: 2rem;
        }
        
        .hero-subtitle {
            font-size: 1.2rem;
        }
        
        .hero-container {
            text-align: center;
        }
        
        .hero-image .profile-img {
            max-width: 300px;
            margin-top: 20px;
        }
    }
`;
document.head.appendChild(style);

// Dark mode toggle (enhanced)
const createDarkModeToggle = () => {
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '🌙';
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.title = 'Toggle Dark Mode';
    toggleButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        cursor: pointer;
        font-size: 24px;
        z-index: 1001;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(toggleButton);
    
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '☀️';
        toggleButton.style.background = '#82aaff';
        toggleButton.style.boxShadow = '0 4px 15px rgba(130, 170, 255, 0.3)';
    }
    
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update button appearance and save preference
        if (isDark) {
            toggleButton.innerHTML = '☀️';
            toggleButton.style.background = '#82aaff';
            toggleButton.style.boxShadow = '0 4px 15px rgba(130, 170, 255, 0.3)';
            localStorage.setItem('darkMode', 'true');
        } else {
            toggleButton.innerHTML = '🌙';
            toggleButton.style.background = '#4f46e5';
            toggleButton.style.boxShadow = '0 4px 15px rgba(79, 70, 229, 0.3)';
            localStorage.setItem('darkMode', 'false');
        }
    });
    
    // Hover effects
    toggleButton.addEventListener('mouseenter', () => {
        toggleButton.style.transform = 'scale(1.1)';
    });
    
    toggleButton.addEventListener('mouseleave', () => {
        toggleButton.style.transform = 'scale(1)';
    });
};

// Initialize dark mode toggle
createDarkModeToggle();

// Add dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    .dark-mode {
        background-color: #1a1a1a;
        color: #e0e0e0;
        transition: all 0.3s ease;
    }
    
    .dark-mode .navbar {
        background-color: rgba(40, 40, 40, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid #444;
    }
    
    .dark-mode .hero {
        background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
        color: #ffffff;
    }
    
    .dark-mode .about {
        background-color: #2a2a2a;
    }
    
    .dark-mode .skills {
        background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
    }
    
    .dark-mode .projects {
        background-color: #2a2a2a;
    }
    
    .dark-mode .contact {
        background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
    }
    
    .dark-mode .footer {
        background-color: #2a2a2a;
    }
    
    .dark-mode .project-card {
        background-color: #3a3a3a;
        border: 1px solid #555;
    }
    
    .dark-mode .skill-category {
        background-color: #3a3a3a;
        border: 1px solid #555;
    }
    
    .dark-mode .form-group input,
    .dark-mode .form-group textarea {
        background-color: #3a3a3a;
        color: #ffffff;
        border-color: #666;
    }
    
    .dark-mode .nav-link {
        color: #cccccc;
    }
    
    .dark-mode .nav-link:hover {
        color: #82aaff;
    }
    
    .dark-mode .nav-logo a {
        color: #82aaff;
    }
    
    .dark-mode .section-title {
        color: #82aaff;
    }
    
    .dark-mode .section-subtitle {
        color: #bbbbbb;
    }
    
    .dark-mode .hero-title {
        color: #ffffff;
    }
    
    .dark-mode .hero-subtitle {
        color: #cccccc;
    }
    
    .dark-mode .hero-description {
        color: #bbbbbb;
    }
    
    .dark-mode .about-intro h3,
    .dark-mode .detail-item h4,
    .dark-mode .skill-category h3,
    .dark-mode .project-content h3,
    .dark-mode .contact-info h3 {
        color: #82aaff;
    }
    
    .dark-mode .about-intro p,
    .dark-mode .detail-content p,
    .dark-mode .skill-items .skill-item span,
    .dark-mode .project-content p,
    .dark-mode .contact-info p,
    .dark-mode .contact-item span,
    .dark-mode .footer-content p {
        color: #bbbbbb;
    }
    
    .dark-mode .skill-items .skill-item i,
    .dark-mode .contact-item i {
        color: #82aaff;
    }
    
    .dark-mode .social-link {
        color: #bbbbbb;
    }
    
    .dark-mode .social-link:hover {
        color: #82aaff;
    }
    
    .dark-mode .project-tech span {
        background-color: #4a4a4a;
        color: #82aaff;
    }
    
    .dark-mode .btn-outline {
        border-color: #82aaff;
        color: #82aaff;
    }
    
    .dark-mode .btn-outline:hover {
        background-color: #82aaff;
        color: #1a1a1a;
    }
`;
document.head.appendChild(darkModeStyles);

// Performance optimization: Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 20px;
    z-index: 1001;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

console.log('Portfolio website loaded successfully!');
