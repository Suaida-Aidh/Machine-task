document.addEventListener("DOMContentLoaded", function () {
  // ======================
  // Hamburger Menu & Sidebar
  // ======================
  const hamburger = document.getElementById("hamburger-menu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const closeButton = document.querySelector(".sidebar-close");

  // Function to open sidebar
  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("sidebar-open");
  }

  // Function to close sidebar
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  }

  // Toggle sidebar when hamburger menu is clicked
  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener("click", openSidebar);

    // Close sidebar when overlay is clicked
    overlay.addEventListener("click", closeSidebar);

    // Close sidebar when close button is clicked
    if (closeButton) {
      closeButton.addEventListener("click", closeSidebar);
    }
  }

  // ======================
  // Navbar Scroll Effect
  // ======================
  const navbar = document.querySelector(".navbar");

  function checkScroll() {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  }

  // Initial check
  checkScroll();

  // Check on scroll
  window.addEventListener("scroll", checkScroll);

  // ======================
  // Smooth Scrolling
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for navbar
          behavior: "smooth",
        });

        // If mobile menu is open, close it after clicking a link
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse?.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }

        // Close sidebar if open
        if (sidebar?.classList.contains("open")) {
          closeSidebar();
        }
      }
    });
  });

  // ======================
  // Enhanced Hero Slider with Bottom-Reveal Button Animation
  // ======================
  // Enhanced Hero Slider with Bottom-Reveal Button Animation
  const heroSection = document.querySelector(".hero-section");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const heroSlides = document.querySelectorAll(".hero-slide");
  const flashOverlay = document.createElement("div");
  flashOverlay.className = "flash-overlay";

  if (heroSection) {
    heroSection.appendChild(flashOverlay);
  }

  const heroImages = ["public/assets/slide-1.jpg", "public/assets/slide-2.jpg"];

  let currentImageIndex = 0;
  let isAnimating = false;

  // Completely reset animations for a slide
  function resetAnimations(slide) {
    const animatedElements = slide.querySelectorAll(
      ".animate-text, .animate-p-text"
    );
    animatedElements.forEach((el) => {
      // Remove all animation classes
      el.classList.remove("text-reveal-animate");

      // Reset styles
      el.style.animation = "";
      el.style.opacity = "0";
      el.style.transform = "";
      el.style.filter = "";
      el.style.clipPath = "";

      // Force reflow
      void el.offsetWidth;
    });
  }

  // Trigger animations for active slide
  function triggerAnimations(slide) {
    const animatedElements = slide.querySelectorAll(
      ".animate-text, .animate-p-text"
    );

    animatedElements.forEach((el, index) => {
      if (el.classList.contains("btn-hero")) {
        setTimeout(() => {
          el.style.animation = "revealFromBottom 0.8s forwards ease-out";
          el.style.animationDelay = `${0.5 + index * 0.1}s`;
        }, 0);
      } else if (el.classList.contains("animate-p-text")) {
        // Add the animation class after a slight delay
        setTimeout(() => {
          el.classList.add("text-reveal-animate");
        }, 50);
      } else {
        setTimeout(() => {
          el.style.animation = "revealTextFromFront 0.8s forwards ease-out";
          el.style.animationDelay = `${0.2 * (index + 1)}s`;
        }, 0);
      }
    });
  }

  // Update slide with proper animation handling
  function updateHeroSlide(index) {
    if (heroSection && !isAnimating) {
      isAnimating = true;
      flashOverlay.classList.add("flash-animation");

      // Reset current slide
      const currentSlide = document.querySelector(".hero-slide.active");
      if (currentSlide) {
        resetAnimations(currentSlide);
        currentSlide.classList.remove("active");
      }

      setTimeout(() => {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${heroImages[index]}')`;

        // Activate new slide
        const activeSlide = heroSlides[index];
        activeSlide.classList.add("active");

        // Trigger animations after DOM update
        setTimeout(() => {
          triggerAnimations(activeSlide);

          setTimeout(() => {
            flashOverlay.classList.remove("flash-animation");
            isAnimating = false;
          }, 500);
        }, 50); // Small delay to ensure DOM is ready
      }, 200);
    }
  }

  // Initialize slider
  if (prevButton && nextButton && heroSection) {
    // Initial setup
    updateHeroSlide(currentImageIndex);

    // Navigation handlers
    prevButton.addEventListener("click", () => {
      if (!isAnimating) {
        currentImageIndex =
          (currentImageIndex - 1 + heroImages.length) % heroImages.length;
        updateHeroSlide(currentImageIndex);
      }
    });

    nextButton.addEventListener("click", () => {
      if (!isAnimating) {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        updateHeroSlide(currentImageIndex);
      }
    });
  }

  // ======================
  // Back to Top Button
  // ======================
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ======================
  // Service Section Animation on Scroll
  // ======================
  const servicesSection = document.getElementById("services");
  const serviceBoxes = document.querySelectorAll(".service-box");
  let servicesAnimated = false;

  function animateServices() {
    if (!servicesSection) return;

    const sectionTop = servicesSection.getBoundingClientRect().top;
    const sectionHeight = servicesSection.offsetHeight;
    const triggerPoint = window.innerHeight * 0.8; // Start animation when 80% of section is in view

    // Calculate animation progress based on scroll position
    const scrollProgress = Math.min(
      1,
      Math.max(0, (window.innerHeight - sectionTop) / (sectionHeight * 0.8))
    );

    if (scrollProgress > 0.1 && !servicesAnimated) {
      serviceBoxes.forEach((box) => {
        box.classList.add("animate");
      });
      servicesAnimated = true;
    }

    // Optional: For continuous animation during scroll
    // serviceBoxes.forEach((box, index) => {
    //     if (scrollProgress > (0.2 + index * 0.2)) {
    //         box.style.opacity = scrollProgress;
    //         box.style.transform = `translateY(${80 * (1 - scrollProgress)}px)`;
    //     }
    // });
  }

  // Initial check
  animateServices();

  // Check on scroll with throttling
  let isScrolling;
  window.addEventListener(
    "scroll",
    function () {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        animateServices();
      }, 50);
    },
    false
  );




  // ======================
  // Features Section Scroll Reveal
  // ======================
  const featuresSection = document.getElementById("features");
  const revealElements = document.querySelectorAll('.scroll-reveal-left');

  if (featuresSection && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optional: Unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  }



  // ======================
// Content Section Scroll Reveal
// ======================
const contentSection = document.querySelector('.content-section');
const rightRevealElements = document.querySelectorAll('.scroll-reveal-right');
const leftRevealElement = document.querySelector('.scroll-reveal-right-delayed');

if (contentSection && (rightRevealElements.length > 0 || leftRevealElement)) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // First reveal the right side boxes
        rightRevealElements.forEach(element => {
          element.classList.add('revealed');
        });
        
        // Then reveal the left content after a delay (handled by CSS transition-delay)
        if (leftRevealElement) {
          leftRevealElement.classList.add('revealed');
        }
        
        // Optional: Unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  observer.observe(contentSection);
}



// Client Logo Slider Animation
const clientsWrapper = document.querySelector(".clients-wrapper");
let clientLogos = document.querySelectorAll(".client-logo");
let isLogoAnimating = false;
let slideInterval;

function startSlider() {
  if (clientLogos.length > 1) {
    slideInterval = setInterval(() => {
      if (!isLogoAnimating) {
        slideLogos();
      }
    }, 3000); // Change slide every 3 seconds
  }
}

function slideLogos() {
  isLogoAnimating = true;
  
  // Get current logos (they may have changed)
  clientLogos = document.querySelectorAll(".client-logo");
  
  // Calculate width of one logo (including margin)
  const logoWidth = clientLogos[0].offsetWidth + 
                   parseInt(window.getComputedStyle(clientLogos[0]).marginRight);
  
  // Apply sliding animation
  clientsWrapper.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)';
  clientsWrapper.style.transform = `translateX(-${logoWidth}px)`;
  
  // After animation completes
  setTimeout(() => {
    // Move first logo to the end
    const firstLogo = clientLogos[0];
    clientsWrapper.removeChild(firstLogo);
    clientsWrapper.appendChild(firstLogo);
    
    // Reset position without animation
    setTimeout(() => {
      clientsWrapper.style.transition = 'none';
      clientsWrapper.style.transform = 'translateX(0)';
      
      // Force reflow to apply reset
      void clientsWrapper.offsetWidth;
      
      // Restore transition for next animation
      clientsWrapper.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)';
      
      isLogoAnimating = false;
    }, 50); // Small delay before reset
  }, 700); // Match this with transition duration
}

// Start the slider
startSlider();

// Pause on hover (optional)
clientsWrapper.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

clientsWrapper.addEventListener("mouseleave", () => {
  startSlider();
});






});



