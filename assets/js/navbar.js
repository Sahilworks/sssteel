// SS Steel Navbar JavaScript Functionality
// Uses only .sssteel-navbar-* class names

function setActiveNavLink() {
    console.log('setActiveNavLink running');
    const navLinks = document.querySelectorAll('.sssteel-navbar-link');
    const mobileNavLinks = document.querySelectorAll('.sssteel-navbar-mobile-link');
    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage || currentPage === '') currentPage = 'index.html';
    console.log('Current page:', currentPage);
    
    navLinks.forEach(link => {
        console.log('Checking link:', link.getAttribute('href'));
        link.classList.remove('sssteel-navbar-link-active');
        // Also match root (/) for Home
        if (
            link.getAttribute('href') === currentPage ||
            (currentPage === 'index.html' && link.getAttribute('href') === 'index.html') ||
            (window.location.pathname === '/' && link.getAttribute('href') === 'index.html')
        ) {
            console.log('Adding active to:', link.getAttribute('href'));
            link.classList.add('sssteel-navbar-link-active');
        }
    });

    mobileNavLinks.forEach(link => {
        link.classList.remove('sssteel-navbar-link-active');
        if (
            link.getAttribute('href') === currentPage ||
            (currentPage === 'index.html' && link.getAttribute('href') === 'index.html') ||
            (window.location.pathname === '/' && link.getAttribute('href') === 'index.html')
        ) {
            link.classList.add('sssteel-navbar-link-active');
        }
    });
}

// Mobile navigation functionality
function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('sssteelNavbarMobileMenuBtn');
    const mobileNavOverlay = document.getElementById('sssteelNavbarMobileOverlay');
    const mobileNavClose = document.getElementById('sssteelNavbarMobileClose');
    const mobileDropdownToggle = document.querySelector('.sssteel-navbar-mobile-dropdown-toggle');
    const mobileDropdown = document.querySelector('.sssteel-navbar-mobile-dropdown');

    if (!mobileMenuBtn || !mobileNavOverlay || !mobileNavClose) {
        console.warn('Mobile navigation elements not found');
        return;
    }

    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openMobileMenu();
    });

    // Close mobile menu
    mobileNavClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
    });

    // Close mobile menu when clicking outside
    mobileNavOverlay.addEventListener('click', function(e) {
        if (e.target === mobileNavOverlay) {
            closeMobileMenu();
        }
    });

    // Mobile dropdown toggle
    if (mobileDropdownToggle && mobileDropdown) {
        mobileDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = mobileDropdown.classList.contains('open');
            mobileDropdown.classList.toggle('open', !isOpen);
            this.setAttribute('aria-expanded', !isOpen);
            
            // Animate dropdown arrow
            const arrow = this.querySelector('.sssteel-navbar-dropdown-arrow');
            if (arrow) {
                arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.sssteel-navbar-mobile-link');
    mobileLinks.forEach(link => {
        if (!link.classList.contains('sssteel-navbar-mobile-dropdown-toggle')) {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function openMobileMenu() {
        mobileNavOverlay.setAttribute('aria-hidden', 'false');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        
        // Focus management
        setTimeout(() => {
            mobileNavClose.focus();
        }, 100);
    }

    function closeMobileMenu() {
        mobileNavOverlay.setAttribute('aria-hidden', 'true');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Close any open dropdowns
        if (mobileDropdown) {
            mobileDropdown.classList.remove('open');
            const arrow = mobileDropdownToggle.querySelector('.sssteel-navbar-dropdown-arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
        
        // Return focus to menu button
        mobileMenuBtn.focus();
    }
}

// Desktop navigation functionality
function initDesktopNavigation() {
    const dropdownToggle = document.querySelector('.sssteel-navbar-dropdown-toggle');
    const dropdownMenu = document.querySelector('.sssteel-navbar-dropdown-menu');
    const dropdown = document.querySelector('.sssteel-navbar-dropdown');

    if (dropdownToggle && dropdownMenu && dropdown) {
        let timeoutId;

        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
        });

        dropdown.addEventListener('mouseleave', function() {
            timeoutId = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                setTimeout(() => {
                    dropdownMenu.style.display = 'none';
                }, 200);
            }, 100);
        });

        dropdownMenu.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
        });

        dropdownMenu.addEventListener('mouseleave', function() {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            setTimeout(() => {
                dropdownMenu.style.display = 'none';
            }, 200);
        });
    }
}

// Header scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.sssteel-navbar');
    if (!navbar) return;

    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (only on mobile)
        if (window.innerWidth <= 991) {
            clearTimeout(scrollTimeout);
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            // Show navbar after scrolling stops
            scrollTimeout = setTimeout(() => {
                navbar.style.transform = 'translateY(0)';
            }, 1000);
        }
        
        lastScrollTop = scrollTop;
    });
}

// Responsive behavior
function initResponsiveBehavior() {
    const mobileNavOverlay = document.getElementById('sssteelNavbarMobileOverlay');
    
    function handleResize() {
        // Close mobile menu when screen size changes to desktop
        if (window.innerWidth > 991 && mobileNavOverlay.classList.contains('active')) {
            mobileNavOverlay.classList.remove('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
}

// Contact button functionality
function initContactButtons() {
    const contactBtns = document.querySelectorAll('.sssteel-navbar-contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Contact button clicked');
            // Add your contact form logic here
            // You can redirect to contact page or open a modal
            window.location.href = 'contact.html';
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.sssteel-navbar-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing SS Steel Navbar');
    
    // Initialize all functionality
    initMobileNavigation();
    initDesktopNavigation();
    initScrollEffects();
    initResponsiveBehavior();
    initContactButtons();
    initSmoothScrolling();
    
    // Set active navigation link
    setActiveNavLink();
    
    console.log('SS Steel Navbar initialized successfully');
});

// Export functions for external use
window.setActiveNavLink = setActiveNavLink;
window.initMobileNavigation = initMobileNavigation;
window.initDesktopNavigation = initDesktopNavigation; 