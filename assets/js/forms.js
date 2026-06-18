/**
 * FORMS HANDLING WITH SUPABASE - BULLETPROOF VERSION
 */

// Wait for the entire page (including Supabase script) to fully load
window.addEventListener('load', function() {
  'use strict';

  // ⚠️ YOUR SUPABASE CREDENTIALS
  const SUPABASE_URL = 'https://urmwdijpgarcxnzjcbmi.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybXdkaWpwZ2FyY3huempjYm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODY2MDcsImV4cCI6MjA5NjE2MjYwN30.pmva1SNmOl4Z7JPNRzRXXrDIdxHJD7Ag6XnrfNM8H0k'; // ⚠️ REMEMBER TO UPDATE THIS WITH THE LONG EYJ KEY!

  // Check if Supabase loaded correctly
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase JS failed to load!');
    return;
  }

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Helper: Show status message
  function showStatus(elementId, message, isSuccess) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.className = `mt-3 text-center ${isSuccess ? 'text-success fw-bold' : 'text-danger fw-bold'}`;
    el.style.display = 'block';

    // Auto-hide after 6 seconds
    setTimeout(() => {
      el.style.display = 'none';
    }, 6000);
  }

  // Helper: Toggle loading state
  function setLoading(buttonId, isLoading) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    const textSpan = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.spinner-border');
    
    btn.disabled = isLoading;
    if (isLoading) {
      if (textSpan) textSpan.classList.add('d-none');
      if (spinner) spinner.classList.remove('d-none');
    } else {
      if (textSpan) textSpan.classList.remove('d-none');
      if (spinner) spinner.classList.add('d-none');
    }
  }

  // ==========================================
  // 1. CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // STOPS THE PAGE FROM REFRESHING
      
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      setLoading('contactSubmitBtn', true);
      const statusEl = document.getElementById('contactFormStatus');
      if (statusEl) statusEl.style.display = 'none';

      const formData = new FormData(contactForm);
      const submissionData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      supabase.from('contact_submissions').insert([submissionData]).select()
        .then(({ data, error }) => {
          if (error) throw error;
          if (data && data.length > 0) {
            showStatus('contactFormStatus', '✅ Success! Message sent.', true);
            contactForm.reset();
            contactForm.classList.remove('was-validated');
          } else {
            showStatus('contactFormStatus', '⚠️ Sent, but no confirmation.', true);
          }
        })
        .catch((err) => {
          console.error('Contact Error:', err);
          showStatus('contactFormStatus', '❌ Error: ' + err.message, false);
        })
        .finally(() => {
          setLoading('contactSubmitBtn', false);
        });
    });
  }

  // ==========================================
  // 2. CONSULTATION FORM
  // ==========================================
  const consForm = document.getElementById('consultationForm');
  if (consForm) {
    const dateInput = document.getElementById('consDate');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

    consForm.addEventListener('submit', function(e) {
      e.preventDefault(); // STOPS THE PAGE FROM REFRESHING

      if (!consForm.checkValidity()) {
        e.stopPropagation();
        consForm.classList.add('was-validated');
        return;
      }

      setLoading('consSubmitBtn', true);
      const statusEl = document.getElementById('consFormStatus');
      if (statusEl) statusEl.style.display = 'none';

      const formData = new FormData(consForm);
      const submissionData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        preferred_date: formData.get('preferred_date'),
        preferred_time: formData.get('preferred_time'),
        consultation_mode: formData.get('consultation_mode'),
        legal_matter: formData.get('legal_matter'),
        description: formData.get('description')
      };

      supabase.from('consultation_requests').insert([submissionData]).select()
        .then(({ data, error }) => {
          if (error) throw error;
          if (data && data.length > 0) {
            showStatus('consFormStatus', '✅ Success! Consultation requested.', true);
            consForm.reset();
            consForm.classList.remove('was-validated');
          } else {
            showStatus('consFormStatus', '⚠️ Sent, but no confirmation.', true);
          }
        })
        .catch((err) => {
          console.error('Consultation Error:', err);
          showStatus('consFormStatus', '❌ Error: ' + err.message, false);
        })
        .finally(() => {
          setLoading('consSubmitBtn', false);
        });
    });
  }
});