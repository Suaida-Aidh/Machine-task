document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Hamburger Menu & Sidebar
    // ======================
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeButton = document.querySelector('.sidebar-close');
    
    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.classList.add('sidebar-open');
    }
    
    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
    
    // Toggle sidebar when hamburger menu is clicked
    if (hamburger && sidebar && overlay) {
        hamburger.addEventListener('click', openSidebar);
        
        // Close sidebar when overlay is clicked
        overlay.addEventListener('click', closeSidebar);
        
        // Close sidebar when close button is clicked
        if (closeButton) {
            closeButton.addEventListener('click', closeSidebar);
        }
    }
    
    // ======================
    // Navbar Scroll Effect
    // ======================
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for navbar
                    behavior: 'smooth'
                });
                
                // If mobile menu is open, close it after clicking a link
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse?.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
                
                // Close sidebar if open
                if (sidebar?.classList.contains('open')) {
                    closeSidebar();
                }
            }
        });
    });
    
    // ======================
    // Hero Slider
    // ======================
    const heroSection = document.querySelector('.hero-section');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    // Array of background images for the slider
    const heroImages = [
        'public/assets/slide-1.jpg',
        'public/assets/slide-2.jpg',
    ];
    
    let currentImageIndex = 0;
    
    // Function to update the background image
    function updateHeroBackground(index) {
        if (heroSection) {
            heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${heroImages[index]}')`;
        }
    }
    
    if (prevButton && nextButton && heroSection) {
        // Initialize first image
        updateHeroBackground(currentImageIndex);
        
        // Event listener for previous button
        prevButton.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + heroImages.length) % heroImages.length;
            updateHeroBackground(currentImageIndex);
            console.log('Previous slide: showing image ' + (currentImageIndex + 1));
        });
        
        // Event listener for next button
        nextButton.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            updateHeroBackground(currentImageIndex);
            console.log('Next slide: showing image ' + (currentImageIndex + 1));
        });
        
        // Optional: Auto-slide every 5 seconds
        const autoSlideInterval = setInterval(function() {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            updateHeroBackground(currentImageIndex);
        }, 5000);
        
        // Stop auto-slide when user interacts with buttons
        [prevButton, nextButton].forEach(button => {
            button.addEventListener('click', function() {
                clearInterval(autoSlideInterval);
            });
        });
    }
    
    // ======================
    // Back to Top Button
    // ======================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});