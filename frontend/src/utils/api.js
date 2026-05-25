import { supabase } from './supabase';

export async function sendContactEmail(formData) {
  try {
    // 1. Save to Supabase Database (contacts table)
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message,
        source_page: window.location.pathname,
        is_read: false
      }]);

    if (dbError) throw dbError;

    // 2. Invoke Edge Function to send email via Resend
    // The edge function should be named 'send-contact-email'
    const { data, error: fnError } = await supabase.functions.invoke('send-contact-email', {
      body: formData,
    });

    // We don't necessarily want to block the UI if the email fails 
    // as long as the DB record was saved. But we'll log it.
    if (fnError) {
      console.warn('Email notification failed, but message was saved to database:', fnError);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
}

export async function sendBookingEmail(appointmentData) {
  try {
    // Invoke Edge Function to send booking confirmation emails
    // Sends both admin notification and client confirmation email
    const { data, error: fnError } = await supabase.functions.invoke('send-booking-email', {
      body: appointmentData,
    });

    // Non-blocking: if email fails, appointment is already saved to DB
    if (fnError) {
      console.warn('Booking email notification failed, but appointment was saved to database:', fnError);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Booking email submission error:', error);
    throw error;
  }
}
