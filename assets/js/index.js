// Move the entire mobile navbar logic into a function OUTSIDE DOMContentLoaded
function initNavbarMenu() {
    // Mobile Navbar Functionality
    const mobileMenuBtn = document.getElementById('sssteelNavbarMobileMenuBtn');
    const mobileNavOverlay = document.getElementById('sssteelNavbarMobileOverlay');
    const mobileNavClose = document.getElementById('sssteelNavbarMobileClose');
    const mobileNavDropdownToggle = document.querySelector('.sssteel-navbar-mobile-dropdown-toggle');
    const mobileNavDropdown = document.querySelector('.sssteel-navbar-mobile-dropdown');
    const mobileNavLinks = document.querySelectorAll('.sssteel-navbar-mobile-link');

    if (mobileMenuBtn && mobileNavOverlay) {
        function openMobileNav() {
            mobileNavOverlay.classList.add('active');
            document.body.classList.add('mobile-nav-open');
            mobileNavOverlay.setAttribute('aria-hidden', 'false');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }
        function closeMobileNav() {
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('mobile-nav-open');
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            if (mobileNavDropdown) {
                mobileNavDropdown.classList.remove('open');
            }
            if (mobileNavDropdownToggle) {
                mobileNavDropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMobileNav();
        });
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openMobileNav();
            }
        });
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', closeMobileNav);
        }
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                closeMobileNav();
            }
        });
        if (mobileNavDropdownToggle && mobileNavDropdown) {
            mobileNavDropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const expanded = mobileNavDropdown.classList.toggle('open');
                mobileNavDropdownToggle.setAttribute('aria-expanded', expanded);
            });
        }
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (link.classList.contains('sssteel-navbar-mobile-dropdown-toggle')) {
                    e.preventDefault();
                    return;
                }
                closeMobileNav();
            });
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
                closeMobileNav();
            }
        });
    }
}
window.initNavbarMenu = initNavbarMenu;

document.addEventListener('DOMContentLoaded', function() {
    // Dropdown functionality for desktop
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        // Show dropdown on hover (desktop)
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 968) {
                dropdownMenu.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 968) {
                dropdownMenu.style.display = 'none';
            }
        });
        
        // Toggle dropdown on click (for mobile)
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.innerWidth <= 968) {
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = 'var(--steel-black)';
        }
    });

    // Set active state for 'Our Product' tab if on any product page
    const productPages = [
        'products.html',
        'product-oil-gas.html',
        'product-refineries.html',
        'product-shipbuilding.html',
        'product-crane-construction.html',
        'product-metal-fabrication.html',
        'product-earth-moving.html'
    ];
    const currentPage = window.location.pathname.split('/').pop();
    if (productPages.includes(currentPage)) {
        // Desktop navbar
        document.querySelectorAll('.sssteel-navbar-link').forEach(link => {
            if (link.getAttribute('href') === 'products.html') {
                link.classList.add('sssteel-navbar-link-active');
            } else {
                link.classList.remove('sssteel-navbar-link-active');
            }
        });
        // Mobile navbar
        document.querySelectorAll('.sssteel-navbar-mobile-link').forEach(link => {
            if (link.getAttribute('href') === 'products.html') {
                link.classList.add('sssteel-navbar-link-active');
            } else {
                link.classList.remove('sssteel-navbar-link-active');
            }
        });
    }

    // Mobile tap-to-toggle for industry cards
    function handleIndustryCardTap() {
      document.querySelectorAll('.industry-card').forEach(card => {
        card.addEventListener('click', function(e) {
          if (window.innerWidth <= 767) {
            // Remove active from all cards
            document.querySelectorAll('.industry-card').forEach(c => c.classList.remove('active'));
            // Toggle this card
            if (!this.classList.contains('active')) {
              this.classList.add('active');
            }
            e.stopPropagation();
          }
        });
      });
      // Hide overlay when clicking outside
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 767) {
          document.querySelectorAll('.industry-card').forEach(c => c.classList.remove('active'));
        }
      });
    }
    handleIndustryCardTap();

    function isMobileOrTablet() {
        return window.innerWidth <= 991; // Bootstrap's md/lg breakpoint
    }

    const cards = document.querySelectorAll('.industry-card');

    function removeActiveFromAll() {
        cards.forEach(card => card.classList.remove('active'));
    }

    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (isMobileOrTablet()) {
                // Prevent button inside card from triggering card click
                if (e.target.closest('.hover-learn-btn')) return;

                if (card.classList.contains('active')) {
                    card.classList.remove('active');
                } else {
                    removeActiveFromAll();
                    card.classList.add('active');
                }
            }
        });
    });

    // Optional: Remove active state when resizing to desktop
    window.addEventListener('resize', function () {
        if (!isMobileOrTablet()) {
            removeActiveFromAll();
        }
    });
});