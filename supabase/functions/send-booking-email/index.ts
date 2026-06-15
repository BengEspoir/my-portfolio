const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'Portfolio Bookings <onboarding@resend.dev>'
const SITE_URL = Deno.env.get('SITE_URL') || 'https://bengespoir.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { client_name, client_email, client_phone, company_name, purpose, meeting_date, meeting_time, duration, timezone, platform, meeting_link } = await req.json()

    // Format date and time for display
    const appointmentDate = new Date(meeting_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const companyInfo = company_name ? `<p><strong>Company:</strong> ${company_name}</p>` : ''
    const meetingLinkInfo = meeting_link ? `<p><strong>Meeting Link:</strong> <a href="${meeting_link}" style="color: #6366f1;">${meeting_link}</a></p>` : ''

    // 1. Send Email to Admin with appointment details
    const adminEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: 'mbengespoir@gmail.com',
        subject: `[New Booking] Consultation with ${client_name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px;">
            <h2 style="color: #6366f1;">New Consultation Booking</h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1f2937;">Client Information</h3>
              <p><strong>Name:</strong> ${client_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${client_email}" style="color: #6366f1;">${client_email}</a></p>
              ${client_phone ? `<p><strong>Phone:</strong> ${client_phone}</p>` : ''}
              ${companyInfo}
            </div>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1f2937;">Appointment Details</h3>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Time:</strong> ${meeting_time}</p>
              <p><strong>Duration:</strong> ${duration}</p>
              <p><strong>Timezone:</strong> ${timezone}</p>
              <p><strong>Platform:</strong> ${platform}</p>
              ${meetingLinkInfo}
            </div>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1f2937;">Consultation Purpose</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${purpose}</p>
            </div>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
              <p style="font-size: 12px; color: #999;">
                📧 This is an automated notification from your portfolio booking system.
              </p>
            </div>
          </div>
        `,
      }),
    })

    const adminEmailResult = await adminEmailRes.json()
    if (!adminEmailRes.ok) {
      console.warn('Admin email failed:', adminEmailResult)
    }

    // 2. Send Confirmation Email to Client
    const clientEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: client_email,
        subject: 'Your Consultation Booking Confirmed',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px;">
            <h2 style="color: #6366f1;">Booking Confirmed! ✓</h2>
            <p>Hi ${client_name},</p>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Thank you for scheduling a consultation. Your appointment has been confirmed and is on our calendar.
            </p>

            <div style="background: #f0fdf4; padding: 20px; border-left: 4px solid #22c55e; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #166534;">Appointment Summary</h3>
              <p style="margin: 8px 0;"><strong>📅 Date:</strong> ${appointmentDate}</p>
              <p style="margin: 8px 0;"><strong>🕐 Time:</strong> ${meeting_time}</p>
              <p style="margin: 8px 0;"><strong>⏱️ Duration:</strong> ${duration}</p>
              <p style="margin: 8px 0;"><strong>🌍 Timezone:</strong> ${timezone}</p>
              <p style="margin: 8px 0;"><strong>📹 Platform:</strong> ${platform}</p>
              ${meetingLinkInfo}
            </div>

            <div style="background: #eff6ff; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">What to Expect</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>We'll connect via ${platform} at the scheduled time</li>
                <li>The session will last approximately ${duration}</li>
                <li>Come prepared to discuss: ${purpose.substring(0, 100)}${purpose.length > 100 ? '...' : ''}</li>
                <li>A summary and next steps will be shared after our call</li>
              </ul>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-left: 4px solid #f59e0b; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold;">💡 Tip:</p>
              <p style="margin: 10px 0 0 0;">Test your audio/video 5 minutes before the meeting to ensure everything works smoothly.</p>
            </div>

            <p style="margin-top: 30px; font-size: 14px;">
              If you need to reschedule or cancel, please reply to this email or contact me directly.
            </p>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
              <p style="margin: 0; color: #666; font-size: 13px;">
                Best regards,<br>
                <strong>Beng Espoir</strong><br>
                <a href="${SITE_URL}" style="color: #6366f1; text-decoration: none;">${SITE_URL}</a>
              </p>
            </div>
          </div>
        `,
      }),
    })

    const clientEmailResult = await clientEmailRes.json()
    if (!clientEmailRes.ok) {
      console.warn('Client email failed:', clientEmailResult)
    }

    // Both emails processed (warn if failures, but don't block)
    const allSuccess = adminEmailRes.ok && clientEmailRes.ok
    const message = allSuccess 
      ? 'All emails sent successfully'
      : 'Some emails failed but booking was recorded'

    return new Response(JSON.stringify({ success: true, message, adminEmail: adminEmailRes.ok, clientEmail: clientEmailRes.ok }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
