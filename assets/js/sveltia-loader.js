// Sveltia CMS Content Loader
class SveltiaLoader {
    constructor() {
        this.contentCache = {};
    }

    async loadContent(filePath) {
        if (this.contentCache[filePath]) {
            return this.contentCache[filePath];
        }

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.contentCache[filePath] = data;
            return data;
        } catch (error) {
            console.error('Error loading content:', error);
            return null;
        }
    }

    // Load hero content
    async loadHeroContent() {
        const data = await this.loadContent('content/hero.json');
        if (data) {
            this.updateHeroSection(data);
        }
    }

    // Load services content
    async loadServicesContent() {
        const data = await this.loadContent('content/services.json');
        if (data) {
            this.updateServicesSection(data);
        }
    }

    // Load about section content
    async loadAboutSectionContent() {
        const data = await this.loadContent('content/about.json');
        if (data) {
            this.updateAboutSection(data);
        }
    }

    // Load contact content
    async loadContactContent() {
        const data = await this.loadContent('content/contact.json');
        if (data) {
            this.updateContactSection(data);
        }
    }

    // Update hero section
    updateHeroSection(data) {
        const subtitle = document.querySelector('.hero-subtitle');
        const title = document.querySelector('.hero-title');
        const description = document.querySelector('.hero-description');
        const button = document.querySelector('.hero-btn');

        if (subtitle && data.subtitle) subtitle.textContent = data.subtitle;
        if (title && data.title) title.textContent = data.title;
        if (description && data.description) description.textContent = data.description;
        if (button && data.button_text) {
            button.textContent = data.button_text;
            if (data.button_link) {
                button.onclick = () => window.location.href = data.button_link;
            }
        }
    }

    // Update services section
    updateServicesSection(data) {
        if (data.services_list && Array.isArray(data.services_list)) {
            const serviceItems = document.querySelectorAll('.service-item');
            
            data.services_list.forEach((service, index) => {
                if (serviceItems[index]) {
                    const title = serviceItems[index].querySelector('.service-title');
                    const description = serviceItems[index].querySelector('.service-description');
                    const icon = serviceItems[index].querySelector('.service-icon');

                    if (title && service.title) title.textContent = service.title;
                    if (description && service.description) description.textContent = service.description;
                    if (icon && service.icon) icon.src = service.icon;
                }
            });
        }
    }

    // Update about section
    updateAboutSection(data) {
        const subtitle = document.querySelector('.about-subtitle');
        const title = document.querySelector('.about-title');
        const description = document.querySelector('.about-description');
        const quote = document.querySelector('.about-quote-text');
        const button = document.querySelector('.about-btn');
        const statsNumber = document.querySelector('.about-stats-number');
        const statsTitle = document.querySelector('.about-stats-title');
        const mainImage = document.querySelector('.about-image');
        const statsIcon = document.querySelector('.about-stats-icon');

        if (subtitle && data.subtitle) subtitle.textContent = data.subtitle;
        if (title && data.title) title.textContent = data.title;
        if (description && data.description) description.textContent = data.description;
        if (quote && data.quote) quote.textContent = data.quote;
        if (button && data.button_text) {
            button.textContent = data.button_text;
            if (data.button_link) {
                button.href = data.button_link;
            }
        }
        if (statsNumber && data.stats_number) {
            statsNumber.innerHTML = `${data.stats_number}<span style="font-size: 48px; margin-left: 8px;">+</span>`;
        }
        if (statsTitle && data.stats_title) statsTitle.textContent = data.stats_title;
        if (mainImage && data.main_image) mainImage.src = data.main_image;
        if (statsIcon && data.stats_icon) statsIcon.src = data.stats_icon;
    }

    // Update contact section
    updateContactSection(data) {
        // Update contact information in footer or contact page
        const companyName = document.querySelector('.company-name');
        const address = document.querySelector('.company-address');
        const phone = document.querySelector('.company-phone');
        const email = document.querySelector('.company-email');
        const website = document.querySelector('.company-website');

        if (companyName && data.company_name) companyName.textContent = data.company_name;
        if (address && data.address) address.textContent = data.address;
        if (phone && data.phone) phone.textContent = data.phone;
        if (email && data.email) email.textContent = data.email;
        if (website && data.website) website.href = data.website;

        // Update social media links
        if (data.social_media) {
            const facebook = document.querySelector('.social-facebook');
            const twitter = document.querySelector('.social-twitter');
            const linkedin = document.querySelector('.social-linkedin');
            const youtube = document.querySelector('.social-youtube');

            if (facebook && data.social_media.facebook) facebook.href = data.social_media.facebook;
            if (twitter && data.social_media.twitter) twitter.href = data.social_media.twitter;
            if (linkedin && data.social_media.linkedin) linkedin.href = data.social_media.linkedin;
            if (youtube && data.social_media.youtube) youtube.href = data.social_media.youtube;
        }
    }

    // Load all content for homepage
    async loadHomepageContent() {
        await Promise.all([
            this.loadHeroContent(),
            this.loadServicesContent(),
            this.loadAboutSectionContent(),
            this.loadContactContent()
        ]);
    }
}

// Initialize Sveltia loader
const sveltiaLoader = new SveltiaLoader();

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the homepage
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        sveltiaLoader.loadHomepageContent();
    }
}); 