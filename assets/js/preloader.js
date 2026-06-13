/**
 * PRELOADER SCRIPT
 * Barrister M. A. Sodipo Chambers
 * 
 * Features:
 * - Shows on first visit
 * - Stores visit state using localStorage
 * - Reappears after prolonged inactivity (30 minutes)
 * - Smooth fade-out animation
 */

(function() {
  'use strict';

  const PRELOADER_ID = 'preloader';
  const STORAGE_KEY = 'masodipolaw_preloader_shown';
  const INACTIVITY_THRESHOLD = 30 * 60 * 1000; // 30 minutes in milliseconds

  let preloader;
  let lastActivityTime = Date.now();

  /**
   * Initialize preloader
   */
  function initPreloader() {
    preloader = document.getElementById(PRELOADER_ID);
    
    if (!preloader) {
      console.warn('Preloader element not found');
      return;
    }

    // Check if we should show preloader
    if (shouldShowPreloader()) {
      showPreloader();
    } else {
      hidePreloader();
    }

    // Track user activity
    trackActivity();
  }

  /**
   * Determine if preloader should be shown
   */
  function shouldShowPreloader() {
    const lastShown = localStorage.getItem(STORAGE_KEY);
    
    if (!lastShown) {
      // First visit
      return true;
    }

    const timeSinceLastShown = Date.now() - parseInt(lastShown, 10);
    
    // Show if inactive for threshold period
    if (timeSinceLastShown > INACTIVITY_THRESHOLD) {
      return true;
    }

    return false;
  }

  /**
   * Show preloader with animation
   */
  function showPreloader() {
    preloader.style.display = 'flex';
    preloader.classList.remove('loaded');
    
    // Update localStorage
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    
    // Hide after page loads
    window.addEventListener('load', function() {
      setTimeout(hidePreloader, 800); // Minimum display time
    });
  }

  /**
   * Hide preloader with smooth fade-out
   */
  function hidePreloader() {
    if (!preloader) return;
    
    preloader.classList.add('loaded');
    
    // Remove from DOM after animation completes
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 600); // Match CSS transition duration
  }

  /**
   * Track user activity to determine inactivity
   */
  function trackActivity() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(function(event) {
      document.addEventListener(event, updateActivityTime, { passive: true });
    });
  }

  /**
   * Update last activity timestamp
   */
  function updateActivityTime() {
    lastActivityTime = Date.now();
  }

  /**
   * Check for inactivity periodically
   */
  function checkInactivity() {
    const timeSinceActivity = Date.now() - lastActivityTime;
    
    if (timeSinceActivity > INACTIVITY_THRESHOLD) {
      // User has been inactive, show preloader on next interaction
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }

  // Check inactivity every minute
  setInterval(checkInactivity, 60000);

  // Expose hidePreloader globally for manual control if needed
  window.hidePreloader = hidePreloader;

})();