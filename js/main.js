// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Smooth scrolling for anchor links
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
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Hero Slider functionality
    const heroSection = document.querySelector('.hero-section');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    // Array of background images for the slider
    const heroImages = [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000'
    ];
    
    let currentImageIndex = 0;
    
    // Function to update the background image
    function updateHeroBackground(index) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${heroImages[index]}')`;
    }
    
    if (prevButton && nextButton) {
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
    
    // Back to top button functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});