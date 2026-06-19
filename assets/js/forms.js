/**
 * FORMS HANDLING WITH SUPABASE - BULLETPROOF VERSION WITH DEBUG
 */

console.log('🔥 FORMS.JS FILE LOADED! 🔥');

// Wait for the entire page (including Supabase script) to fully load
window.addEventListener('load', function() {
  'use strict';

  console.log('🔥 WINDOW LOAD EVENT FIRED - Initializing forms...');

  // ⚠️ YOUR SUPABASE CREDENTIALS
  const SUPABASE_URL = 'https://urmwdijpgarcxnzjcbmi.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybXdkaWpwZ2FyY3huempjYm1pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDU4NjYwNywiZXhwIjoyMDk2MTYyNjA3fQ.t1cLr0Aak3YaubgZJ5H5SgEEV0i9YzcI3wKwXBBE5u4';

  console.log('Supabase URL:', SUPABASE_URL);
  console.log('Supabase Key (first 50 chars):', SUPABASE_ANON_KEY.substring(0, 50) + '...');

  // Check if Supabase loaded correctly
  if (typeof window.supabase === 'undefined') {
    console.error('❌ Supabase JS failed to load!');
    return;
  }

  console.log('✅ Supabase JS library detected');

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase client created');

  // Helper: Show status message
  function showStatus(elementId, message, isSuccess) {
    console.log(`📝 showStatus called for ${elementId}: ${message}`);
    const el = document.getElementById(elementId);
    if (!el) {
      console.error(`❌ Element ${elementId} not found!`);
      return;
    }
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
    console.log(`🔄 setLoading called for ${buttonId}: ${isLoading}`);
    const btn = document.getElementById(buttonId);
    if (!btn) {
      console.error(`❌ Button ${buttonId} not found!`);
      return;
    }
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
  console.log('📋 Contact form element:', contactForm);
  
  if (contactForm) {
    console.log('✅ Contact form found! Attaching event listener...');
    
    contactForm.addEventListener('submit', function(e) {
      console.log('🚀 CONTACT FORM SUBMIT EVENT FIRED!');
      e.preventDefault(); // STOPS THE PAGE FROM REFRESHING
      console.log('✅ e.preventDefault() called - page should not refresh');
      
      if (!contactForm.checkValidity()) {
        console.log('⚠️ Form validation failed');
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      console.log('✅ Form validation passed');
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

      console.log('📤 Submitting data to Supabase:', submissionData);

      supabase.from('contact_submissions').insert([submissionData]).select()
        .then(({ data, error }) => {
          console.log('📥 Supabase response received');
          if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
          }
          console.log('✅ Supabase data:', data);
          if (data && data.length > 0) {
            showStatus('contactFormStatus', '✅ Success! Message sent.', true);
            contactForm.reset();
            contactForm.classList.remove('was-validated');
          } else {
            showStatus('contactFormStatus', '⚠️ Sent, but no confirmation.', true);
          }
        })
        .catch((err) => {
          console.error('❌ Contact Error:', err);
          showStatus('contactFormStatus', '❌ Error: ' + err.message, false);
        })
        .finally(() => {
          setLoading('contactSubmitBtn', false);
        });
    });
  } else {
    console.error('❌ Contact form NOT found on this page!');
  }

  // ==========================================
  // 2. CONSULTATION FORM
  // ==========================================
  const consForm = document.getElementById('consultationForm');
  console.log('📋 Consultation form element:', consForm);
  
  if (consForm) {
    console.log('✅ Consultation form found! Attaching event listener...');
    
    const dateInput = document.getElementById('consDate');
    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
      console.log('✅ Date input min set to today');
    }

    consForm.addEventListener('submit', function(e) {
      console.log('🚀 CONSULTATION FORM SUBMIT EVENT FIRED!');
      e.preventDefault(); // STOPS THE PAGE FROM REFRESHING
      console.log('✅ e.preventDefault() called - page should not refresh');

      if (!consForm.checkValidity()) {
        console.log('⚠️ Form validation failed');
        e.stopPropagation();
        consForm.classList.add('was-validated');
        return;
      }

      console.log('✅ Form validation passed');
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

      console.log('📤 Submitting consultation data to Supabase:', submissionData);

      supabase.from('consultation_requests').insert([submissionData]).select()
        .then(({ data, error }) => {
          console.log('📥 Supabase response received');
          if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
          }
          console.log('✅ Supabase data:', data);
          if (data && data.length > 0) {
            showStatus('consFormStatus', '✅ Success! Consultation requested.', true);
            consForm.reset();
            consForm.classList.remove('was-validated');
          } else {
            showStatus('consFormStatus', '⚠️ Sent, but no confirmation.', true);
          }
        })
        .catch((err) => {
          console.error('❌ Consultation Error:', err);
          showStatus('consFormStatus', '❌ Error: ' + err.message, false);
        })
        .finally(() => {
          setLoading('consSubmitBtn', false);
        });
    });
  } else {
    console.error('❌ Consultation form NOT found on this page!');
  }

  console.log('🔥 FORMS.JS INITIALIZATION COMPLETE! 🔥');
});