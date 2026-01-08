import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, message: message.substring(0, 50) + "..." });

    // Send notification email to you
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["hsyed6448@gmail.com"],
        subject: `New Contact Form Message from ${name}`,
        html: `
          <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #e5e5e5; padding: 40px; border-radius: 8px;">
            <h1 style="color: #00ff88; margin-bottom: 24px;">New Contact Form Submission</h1>
            <div style="background: #1a1a1a; padding: 24px; border-radius: 8px; border-left: 4px solid #00ff88;">
              <p style="margin: 8px 0;"><strong style="color: #00ff88;">From:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong style="color: #00ff88;">Email:</strong> ${email}</p>
              <p style="margin: 16px 0 8px;"><strong style="color: #00ff88;">Message:</strong></p>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            <p style="margin-top: 24px; color: #666; font-size: 12px;">
              Sent from your portfolio contact form
            </p>
          </div>
        `,
      }),
    });

    if (!notificationRes.ok) {
      const error = await notificationRes.text();
      console.error("Failed to send notification email:", error);
      throw new Error(`Failed to send notification: ${error}`);
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the sender
    const confirmationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Syed Hamza Imran <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for reaching out!",
        html: `
          <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #e5e5e5; padding: 40px; border-radius: 8px;">
            <h1 style="color: #00ff88; margin-bottom: 24px;">Hey ${name}! 👋</h1>
            <p style="line-height: 1.8; margin-bottom: 16px;">
              Thanks for reaching out! I've received your message and will get back to you as soon as possible.
            </p>
            <p style="line-height: 1.8; margin-bottom: 24px;">
              In the meantime, feel free to check out my latest projects or connect with me on social media.
            </p>
            <p style="color: #00ff88;">
              Best regards,<br/>
              Syed Hamza Imran
            </p>
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #333;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                &lt;/&gt; Built with passion
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!confirmationRes.ok) {
      console.error("Failed to send confirmation email:", await confirmationRes.text());
      // Don't throw here - notification was sent successfully
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
