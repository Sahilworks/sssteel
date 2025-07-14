# SS Steel Website - Component System

This project now uses a modular component system for the navbar and footer, making it easy to maintain and reuse across multiple pages.

## 📁 File Structure

```
ss steel/
├── components/
│   ├── navbar.html          # Navbar component
│   └── footer.html          # Footer component
├── assets/
│   ├── css/
│   │   ├── style.css        # Main styles
│   │   └── footer.css       # Footer-specific styles
│   └── js/
│       ├── components.js    # Component loader
│       ├── navbar.js        # Navbar functionality
│       ├── footer.js        # Footer functionality
│       └── index.js         # Main page scripts
├── index.html               # Home page (updated to use components)
├── template.html            # Template for new pages
└── README.md               # This file
```

## 🚀 How to Use

### For Existing Pages (like index.html)

The `index.html` file has been updated to use the component system. It now includes:

1. **Component containers**: `<div id="navbar-container"></div>` and `<div id="footer-container"></div>`
2. **Component loader**: `<script src="assets/js/components.js"></script>`
3. **Footer CSS**: `<link rel="stylesheet" href="assets/css/footer.css">`

### For New Pages

Use the `template.html` file as a starting point for new pages:

1. Copy `template.html`
2. Rename it to your new page (e.g., `about.html`, `contact.html`)
3. Add your page content between the navbar and footer containers
4. Update the title and meta tags

## 📋 Template Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - SS Steel</title>
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <!-- Fonts and Bootstrap -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&family=Oswald:wght@200;300;400;500;600;700&family=Raleway:wght@100;200;300;400;500;600;700;800;900&family=Exo+2:wght@100;200;300;400;500;600;700;800;900&family=Expletus+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navbar Container -->
    <div id="navbar-container"></div>

    <!-- Main Content -->
    <main>
        <!-- Your page content goes here -->
        <section class="container py-5">
            <h1>Your Page Content</h1>
            <p>This is where your main page content goes.</p>
        </section>
    </main>

    <!-- Footer Container -->
    <div id="footer-container"></div>

    <!-- JavaScript Files -->
    <script src="assets/js/components.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## 🔧 Component Features

### Navbar Component (`components/navbar.html`)
- ✅ Responsive navigation
- ✅ Mobile menu with hamburger icon
- ✅ Dropdown menus for products
- ✅ Contact button
- ✅ Active page highlighting

### Footer Component (`components/footer.html`)
- ✅ Contact information bar
- ✅ Newsletter subscription form
- ✅ Company information and social links
- ✅ Quick links and services sections
- ✅ Copyright and legal links
- ✅ Fully responsive design

### JavaScript Functionality

#### Navbar (`assets/js/navbar.js`)
- Mobile menu toggle
- Dropdown functionality
- Smooth scrolling
- Active page highlighting
- Scroll effects

#### Footer (`assets/js/footer.js`)
- Newsletter form submission
- Social media link handling
- Footer link navigation
- Responsive layout adjustments
- Hover effects and animations
- Notification system

## 🎨 Styling

### Footer Styles (`assets/css/footer.css`)
- Unique class names with `sssteel-footer-` prefix
- CSS custom properties for easy theming
- Fully responsive design
- Hover effects and transitions
- Mobile-first approach

## 🔄 How It Works

1. **Component Loading**: The `components.js` file automatically loads navbar and footer HTML from their respective files
2. **Dynamic Insertion**: Components are inserted into the designated containers
3. **Script Loading**: Component-specific JavaScript files are loaded automatically
4. **Functionality**: All interactive features work immediately after loading

## 📱 Responsive Design

Both components are fully responsive and work on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🛠️ Customization

### Adding New Pages
1. Copy `template.html`
2. Add your content
3. Update navigation links in `components/navbar.html` if needed

### Modifying Components
- **Navbar**: Edit `components/navbar.html` and `assets/js/navbar.js`
- **Footer**: Edit `components/footer.html` and `assets/js/footer.js`
- **Styles**: Edit `assets/css/footer.css` for footer styles

### Adding New Features
- Add new JavaScript files and include them in `components.js`
- Add new CSS files and link them in your HTML
- Update component HTML files as needed

## ✅ Benefits

1. **Maintainability**: Update navbar/footer in one place
2. **Consistency**: Same design across all pages
3. **Efficiency**: No code duplication
4. **Scalability**: Easy to add new pages
5. **Performance**: Components load asynchronously

## 🚀 Getting Started

1. Open `index.html` in your browser to see the working system
2. Use `template.html` to create new pages
3. Customize components as needed for your specific requirements

The component system is now ready to use! 🎉 