// components.js
// Loads navbar and footer HTML into their containers without affecting other UI

function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);
    if (!container) return; // Do nothing if container is missing

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            if (containerId === 'navbar-container') {
                if (window.initNavbarMenu) window.initNavbarMenu();
                if (window.setActiveNavLink) window.setActiveNavLink();
            }
        })
        .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('navbar-container', 'components/navbar.html');
    loadComponent('footer-container', 'components/footer.html');
}); 