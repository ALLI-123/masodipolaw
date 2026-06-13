/**
 * MAIN JAVASCRIPT
 * Barrister M. A. Sodipo Chambers
 * 
 * Features:
 * - Sticky navbar with scroll effect
 * - Active navigation highlighting
 * - Dynamic year update
 * - Mobile menu enhancements
 * - Form validation helpers
 */

(function() {
  'use strict';

  /**
   * Sticky Navbar with Scroll Effect
   */
  function initStickyNavbar() {
    const navbar = document.getElementById('mainNav');
    
    if (!navbar) return;

    const scrollThreshold = 100;

    function handleScroll() {
      if (window.pageYOffset > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
  }

  /**
   * Active Navigation Link Highlighting
   */
  function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Dynamic Year Update in Footer
   */
  function initDynamicYear() {
    const yearElement = document.getElementById('year');
    
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /**
   * Mobile Menu Enhancements
   */
  function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) return;

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: true
          });
        }
      }
    });

    // Close mobile menu on link click
    const navLinks = navbarCollapse.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: true
          });
        }
      });
    });
  }

  /**
   * Carousel Auto-Pause on Hover
   */
  function initCarouselHover() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(function(carousel) {
      carousel.addEventListener('mouseenter', function() {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) {
          bsCarousel.pause();
        }
      });
      
      carousel.addEventListener('mouseleave', function() {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) {
          bsCarousel.cycle();
        }
      });
    });
  }

  /**
   * Back to Top Button (Optional Enhancement)
   */
  function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 30px;
      width: 45px;
      height: 45px;
      background-color: var(--primary-blue);
      color: var(--gold);
      border: 2px solid var(--gold);
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 998;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(backToTopBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }, { passive: true });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'var(--gold)';
      this.style.color = 'var(--white)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'var(--primary-blue)';
      this.style.color = 'var(--gold)';
    });
  }

  /**
   * Lazy Loading for Images
   */
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * External Link Handling
   */
  function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(function(link) {
      // Check if link is external
      if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /**
   * Form Validation Helpers
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('form:not([data-tally-src])');
    
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
          
          // Show validation feedback
          form.classList.add('was-validated');
        }
      });
    });
  }

  /**
   * Tooltip Initialization (Bootstrap)
   */
  function initTooltips() {
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }

  /**
   * Error Handling for Missing Resources
   */
  function initErrorHandling() {
    window.addEventListener('error', function(e) {
      console.error('Resource loading error:', e.target.src || e.target.href);
    }, true);
  }

  /**
   * Performance Monitoring (Optional)
   */
  function initPerformanceMonitoring() {
    if ('performance' in window && 'performanceObserver' in window) {
      // Monitor long tasks
      try {
        const observer = new PerformanceObserver(function(list) {
          list.getEntries().forEach(function(entry) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms');
            }
          });
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // PerformanceObserver not supported
      }
    }
  }

  /**
   * Initialize all main functions
   */
  function init() {
    initStickyNavbar();
    initActiveNav();
    initDynamicYear();
    initMobileMenu();
    initCarouselHover();
    initBackToTop();
    initLazyLoading();
    initExternalLinks();
    initFormValidation();
    initTooltips();
    initErrorHandling();
    
    // Optional: Enable performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      initPerformanceMonitoring();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose functions globally if needed
  window.MASODIPO = {
    init: init,
    hidePreloader: window.hidePreloader
  };

})();