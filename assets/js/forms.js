/**
 * FORMS HANDLING WITH SUPABASE
 * Barrister M. A. Sodipo Chambers
 */
(function() {
  'use strict';

  // ⚠️ REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
  const SUPABASE_URL = 'https://urmwdijpgarcxnzjcbmi.supabase.co';
  
  // 🔴 THIS IS WRONG - Get the correct key from Supabase Dashboard → Settings → API
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybXdkaWpwZ2FyY3huempjYm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODY2MDcsImV4cCI6MjA5NjE2MjYwN30.pmva1SNmOl4Z7JPNRzRXXrDIdxHJD7Ag6XnrfNM8H0k';

  // Initialize Supabase Client
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

 
    // Helper: Show status message (Auto-hides after 6 seconds)
  function showStatus(elementId, message, isSuccess) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = `mt-3 text-center ${isSuccess ? 'text-success fw-bold' : 'text-danger fw-bold'}`;
    el.style.display = 'block';

    // Automatically hide the message after 6 seconds
    setTimeout(() => {
      el.style.display = 'none';
    }, 6000); 
  }

  // Helper: Toggle loading state on button
  function setLoading(buttonId, isLoading) {
    const btn = document.getElementById(buttonId);
    const textSpan = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.spinner-border');
    
    btn.disabled = isLoading;
    if (isLoading) {
      textSpan.classList.add('d-none');
      spinner.classList.remove('d-none');
    } else {
      textSpan.classList.remove('d-none');
      spinner.classList.add('d-none');
    }
  }

  // 1. Handle Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      setLoading('contactSubmitBtn', true);
      document.getElementById('contactFormStatus').style.display = 'none';

      const formData = new FormData(contactForm);
      const submissionData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      console.log('Submitting to Supabase:', submissionData);

      try {
        // Added .select() to get the inserted row back
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert([submissionData])
          .select();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Supabase response:', data);

        // Show success with the actual ID to prove it saved
        if (data && data.length > 0) {
          showStatus('contactFormStatus', `✅ Success! Data saved. ID: ${data[0].id}. Check Supabase Table Editor and refresh.`, true);
        } else {
          showStatus('contactFormStatus', '⚠️ No error, but no data returned. Check Supabase.', true);
        }
        
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        
      } catch (err) {
        console.error('Contact form error:', err);
        // Show the EXACT error message on the screen
        const errorMsg = err.message || 'Unknown error';
        showStatus('contactFormStatus', `❌ Error: ${errorMsg}`, false);
      } finally {
        setLoading('contactSubmitBtn', false);
      }
    });
  }

  // 2. Handle Consultation Form Submission
  const consForm = document.getElementById('consultationForm');
  if (consForm) {
    // Prevent selecting past dates
    const dateInput = document.getElementById('consDate');
    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    consForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (!consForm.checkValidity()) {
        e.stopPropagation();
        consForm.classList.add('was-validated');
        return;
      }

      setLoading('consSubmitBtn', true);
      document.getElementById('consFormStatus').style.display = 'none';

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

      console.log('Submitting consultation to Supabase:', submissionData);

      try {
        const { data, error } = await supabase
          .from('consultation_requests')
          .insert([submissionData])
          .select();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Supabase response:', data);

        if (data && data.length > 0) {
          showStatus('consFormStatus', `✅ Success! Consultation saved. ID: ${data[0].id}`, true);
        } else {
          showStatus('consFormStatus', '⚠️ No error, but no data returned.', true);
        }
        
        consForm.reset();
        consForm.classList.remove('was-validated');
        
      } catch (err) {
        console.error('Consultation form error:', err);
        const errorMsg = err.message || 'Unknown error';
        showStatus('consFormStatus', `❌ Error: ${errorMsg}`, false);
      } finally {
        setLoading('consSubmitBtn', false);
      }
    });
  }
})();