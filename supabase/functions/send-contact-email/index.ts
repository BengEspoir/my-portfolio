const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') // This is pulled from Supabase Secrets

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
    const { name, email, phone, subject, message } = await req.json()

    // 1. Send Email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`, // Uses the secret set via CLI
      },
      body: JSON.stringify({
        from: 'Portfolio Site <onboarding@resend.dev>', // Replace with your verified domain
        to: 'mbengespoir@gmail.com', // CORRECTED: mbengespoir@gmail.com
        subject: `[Portfolio Inquiry] ${subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #6366f1;">New Portfolio Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
              ${message}
            </div>
            <p style="font-size: 12px; color: #999; margin-top: 30px;">
              Sent from your portfolio contact form.
            </p>
          </div>
        `,
      }),
    })

    const emailResult = await res.json()

    if (!res.ok) throw new Error(`Resend error: ${JSON.stringify(emailResult)}`)

    return new Response(JSON.stringify({ success: true, data: emailResult }), {
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
