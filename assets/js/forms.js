/**
 * FORMS HANDLING WITH SUPABASE
 * Barrister M. A. Sodipo Chambers
 */
(function() {
  'use strict';

  // ⚠️ REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
  const SUPABASE_URL = 'https://urmwdijpgarcxnzjcbmi.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_84vC_Y3VrpSOGNS_fqYytA_HM1Bevav';

  // Initialize Supabase Client
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Helper: Show status message
  function showStatus(elementId, message, isSuccess) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = `mt-3 text-center ${isSuccess ? 'text-success fw-bold' : 'text-danger fw-bold'}`;
    el.style.display = 'block';
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

      try {
        const { error } = await supabase.from('contact_submissions').insert([submissionData]);
        if (error) throw error;

        showStatus('contactFormStatus', 'Thank you. Your message has been sent successfully. We will respond within 1 business day.', true);
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        
      } catch (err) {
        console.error('Contact form error:', err);
        showStatus('contactFormStatus', 'An error occurred. Please try again or contact us directly via phone.', false);
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

      try {
        const { error } = await supabase.from('consultation_requests').insert([submissionData]);
        if (error) throw error;

        showStatus('consFormStatus', 'Consultation request received. We will contact you within 24 hours to confirm your appointment.', true);
        consForm.reset();
        consForm.classList.remove('was-validated');
        
      } catch (err) {
        console.error('Consultation form error:', err);
        showStatus('consFormStatus', 'An error occurred. Please try again or call us directly.', false);
      } finally {
        setLoading('consSubmitBtn', false);
      }
    });
  }
})();