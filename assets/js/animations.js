/**
 * ANIMATIONS SCRIPT
 * Barrister M. A. Sodipo Chambers
 * 
 * Features:
 * - AOS (Animate On Scroll) initialization
 * - Animated counters for metrics
 * - Smooth scroll behavior
 */

(function() {
  'use strict';

  /**
   * Initialize AOS (Animate On Scroll)
   */
  function initAOS() {
    if (typeof AOS === 'undefined') {
      console.warn('AOS library not loaded');
      return;
    }

    AOS.init({
      // Global settings
      duration: 800,        // Animation duration in ms
      easing: 'ease-out-cubic', // Animation easing
      once: true,           // Whether animation should happen only once
      mirror: false,        // Whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // Position of elements relative to viewport
      offset: 100,          // Offset (in px) from the original trigger point
      delay: 0,             // Delay animation by X milliseconds
      disable: false        // Disable AOS on mobile (can be 'phone', 'tablet', 'mobile', or function)
    });

    // Refresh AOS on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        AOS.refresh();
      }, 250);
    });
  }

  /**
   * Animated Counters for Metrics
   */
  function initCounters() {
    const counters = document.querySelectorAll('.metric-number');
    
    if (counters.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of element is visible
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCounter(counter);
          observer.unobserve(counter); // Only animate once
        }
      });
    }, observerOptions);

    counters.forEach(function(counter) {
      observer.observe(counter);
    });
  }

  /**
   * Animate a single counter from 0 to target
   */
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic);
      
      counter.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  /**
   * Smooth Scroll for Anchor Links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const navbarHeight = document.querySelector('.site-navbar')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: true
            });
          }
        }
      });
    });
  }

  /**
   * Parallax Effect for Hero Sections (Optional)
   */
  function initParallax() {
    const heroSections = document.querySelectorAll('.hero-carousel, .page-header');
    
    if (heroSections.length === 0) return;

    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      
      heroSections.forEach(function(section) {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        section.style.backgroundPositionY = yPos + 'px';
      });
    }, { passive: true });
  }

  /**
   * Fade-in Animation for Elements
   */
  function initFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    fadeElements.forEach(function(element) {
      observer.observe(element);
    });
  }

  /**
   * Initialize all animations
   */
  function init() {
    initAOS();
    initCounters();
    initSmoothScroll();
    initFadeIn();
    
    // Optional: Enable parallax only on desktop
    if (window.innerWidth > 991) {
      initParallax();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize AOS after dynamic content loads
  window.addEventListener('load', function() {
    if (typeof AOS !== 'undefined') {
      setTimeout(function() {
        AOS.refresh();
      }, 100);
    }
  });

})();