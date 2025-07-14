// Footer JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form submission
    const newsletterForm = document.getElementById('sssteelFooterNewsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                showNotification('Thank you for subscribing! We will send updates to: ' + email, 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Footer links functionality
    const footerLinks = document.querySelectorAll('.sssteel-footer-quick-links-list a, .sssteel-footer-services-links-list a, .sssteel-footer-bottom-links-wrapper a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            const href = this.getAttribute('href');
            
            // Add your navigation logic here
            console.log('Footer link clicked:', linkText, href);
            
            // You can add specific routing logic here
            if (href && href !== '#') {
                // Navigate to specific page
                window.location.href = href;
            } else {
                // Handle internal links or show modal
                handleFooterLink(linkText);
            }
        });
    });

    // Social media links
    const socialLinks = document.querySelectorAll('.sssteel-footer-social-media-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            
            // Add your social media navigation logic here
            console.log('Opening social media:', platform);
            
            // You can add specific social media URLs here
            const socialUrls = {
                'Facebook': 'https://facebook.com/sssteel',
                'Twitter': 'https://twitter.com/sssteel',
                'LinkedIn': 'https://linkedin.com/company/sssteel',
                'YouTube': 'https://youtube.com/sssteel'
            };
            
            if (socialUrls[platform]) {
                window.open(socialUrls[platform], '_blank');
            }
        });
    });

    // Contact information links
    const contactLinks = document.querySelectorAll('.sssteel-footer-contact-text-info a');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href.startsWith('mailto:')) {
                window.location.href = href;
            } else if (href.startsWith('tel:')) {
                window.location.href = href;
            }
        });
    });

    // Responsive layout adjustments
    function adjustFooterLayout() {
        const newsletter = document.querySelector('.sssteel-footer-newsletter-subscription-box');
        const windowWidth = window.innerWidth;
        
        if (newsletter) {
            if (windowWidth < 992) {
                newsletter.style.marginTop = '0';
            } else {
                newsletter.style.marginTop = '-92px';
            }
        }
    }

    // Initialize layout
    adjustFooterLayout();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustFooterLayout);

    // Email input focus effects
    const emailInput = document.querySelector('.sssteel-footer-email-input-field');
    if (emailInput) {
        emailInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        emailInput.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    }

    // Subscribe button hover effects
    const subscribeBtn = document.querySelector('.sssteel-footer-subscribe-button');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        subscribeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Social media icons hover effects
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Footer links hover effects
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.paddingLeft = '5px';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.paddingLeft = '0';
        });
    });
});

// Helper function to handle footer link clicks
function handleFooterLink(linkText) {
    switch(linkText.toLowerCase()) {
        case 'about us':
            // Navigate to about page
            console.log('Navigating to About Us page');
            break;
        case 'our products':
            // Navigate to products page
            console.log('Navigating to Our Products page');
            break;
        case 'project':
            // Navigate to project page
            console.log('Navigating to Project page');
            break;
        case 'faqs':
            // Navigate to FAQs page
            console.log('Navigating to FAQs page');
            break;
        case 'contact us':
            // Navigate to contact page
            console.log('Navigating to Contact Us page');
            break;
        case 'privacy policy':
            // Navigate to privacy policy page
            console.log('Navigating to Privacy Policy page');
            break;
        case 'terms & service':
            // Navigate to terms page
            console.log('Navigating to Terms & Service page');
            break;
        default:
            console.log('Link clicked:', linkText);
    }
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#000';
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
} 