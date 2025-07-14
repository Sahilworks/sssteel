// Content Loader for Netlify CMS
class ContentLoader {
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
            const text = await response.text();
            const content = this.parseFrontMatter(text);
            this.contentCache[filePath] = content;
            return content;
        } catch (error) {
            console.error('Error loading content:', error);
            return null;
        }
    }

    parseFrontMatter(text) {
        const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = text.match(frontMatterRegex);
        
        if (match) {
            const frontMatter = match[1];
            const content = match[2];
            
            // Parse YAML front matter
            const data = {};
            const lines = frontMatter.split('\n');
            
            for (const line of lines) {
                if (line.trim() && !line.startsWith('#')) {
                    const colonIndex = line.indexOf(':');
                    if (colonIndex > 0) {
                        const key = line.substring(0, colonIndex).trim();
                        let value = line.substring(colonIndex + 1).trim();
                        
                        // Remove quotes if present
                        if ((value.startsWith('"') && value.endsWith('"')) || 
                            (value.startsWith("'") && value.endsWith("'"))) {
                            value = value.slice(1, -1);
                        }
                        
                        data[key] = value;
                    }
                }
            }
            
            return { data, content };
        }
        
        return { data: {}, content: text };
    }

    // Load hero content
    async loadHeroContent() {
        const content = await this.loadContent('content/hero.md');
        if (content && content.data) {
            this.updateHeroSection(content.data);
        }
    }

    // Load services content
    async loadServicesContent() {
        const content = await this.loadContent('content/services.md');
        if (content && content.data) {
            this.updateServicesSection(content.data);
        }
    }

    // Load why choose content
    async loadWhyChooseContent() {
        const content = await this.loadContent('content/why-choose.md');
        if (content && content.data) {
            this.updateWhyChooseSection(content.data);
        }
    }

    // Load about section content
    async loadAboutSectionContent() {
        const content = await this.loadContent('content/about.md');
        if (content && content.data) {
            this.updateAboutSection(content.data);
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

    // Update why choose section
    updateWhyChooseSection(data) {
        const title = document.querySelector('.why-choose-title');
        const subtitle = document.querySelector('.why-choose-subtitle');
        const descriptions = document.querySelectorAll('.why-choose-description');
        const button = document.querySelector('.why-choose-btn');

        if (title && data.title) {
            title.innerHTML = data.title.replace('SS steel', '<span class="red">SS steel</span>');
        }
        if (subtitle && data.subtitle) subtitle.textContent = data.subtitle;
        if (descriptions[0] && data.description1) descriptions[0].textContent = data.description1;
        if (descriptions[1] && data.description2) descriptions[1].textContent = data.description2;
        if (button && data.button_text) {
            button.textContent = data.button_text;
            if (data.button_link) {
                button.href = data.button_link;
            }
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

    // Load all content for homepage
    async loadHomepageContent() {
        await Promise.all([
            this.loadHeroContent(),
            this.loadServicesContent(),
            this.loadWhyChooseContent(),
            this.loadAboutSectionContent()
        ]);
    }
}

// Initialize content loader
const contentLoader = new ContentLoader();

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the homepage
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        contentLoader.loadHomepageContent();
    }
}); 