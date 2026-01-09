"use server";

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const toEmail = "mukesh@adhykari.com";
  const fromEmail = "from_profile@xitoxito.com";
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0a0a 0%, #0f0f23 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0a0a0a 0%, #0f0f23 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 25px 60px rgba(6, 182, 212, 0.15), 0 10px 40px rgba(0, 0, 0, 0.5);">
          
          <!-- Header with Premium Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #eab308 100%); padding: 2px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
                <tr>
                  <td style="padding: 50px 40px 35px; text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 15px;">✨</div>
                    <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; color: #06b6d4;">
                      New Contact Message
                    </h1>
                    <p style="margin: 12px 0 0 0; color: #a8d5da; font-size: 15px; font-weight: 500;">
                      From your portfolio website
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px 40px;">
              
              <!-- Sender Info Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 18px 0; font-size: 12px; color: #06b6d4; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">👤 Sender Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="background: rgba(6, 182, 212, 0.08); border-left: 4px solid #06b6d4; padding: 20px; border-radius: 8px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #8fa3b8;">Name</p>
                    <p style="margin: 0 0 15px 0; font-size: 22px; font-weight: 700; color: #ffffff;">${
                      data.name
                    }</p>
                    
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #8fa3b8;">Email Address</p>
                    <p style="margin: 0 0 15px 0;"><a href="mailto:${
                      data.email
                    }" style="color: #06b6d4; text-decoration: none; font-weight: 600; font-size: 16px; word-break: break-all;">${
    data.email
  }</a></p>
                    
                    ${
                      data.phone
                        ? `
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #8fa3b8;">Phone Number</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #8b5cf6;"><a href="tel:${data.phone}" style="color: #8b5cf6; text-decoration: none;">${data.phone}</a></p>
                    `
                        : ""
                    }
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 18px 0; font-size: 12px; color: #8b5cf6; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">💬 Message Content</p>
                  </td>
                </tr>
                <tr>
                  <td style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid #8b5cf6; padding: 24px; border-radius: 8px;">
                    <p style="margin: 0; color: #e2e8f0; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-weight: 500;">${
                      data.message
                    }</p>
                  </td>
                </tr>
              </table>

              <!-- Meta Information -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="background: rgba(234, 179, 8, 0.06); border-left: 4px solid #eab308; padding: 16px 20px; border-radius: 8px;">
                    <p style="margin: 0; font-size: 13px; color: #c9a961;">
                      <strong>📅 Received:</strong> ${currentDate} (JST)
                    </p>
                    <p style="margin: 6px 0 0 0; font-size: 13px; color: #c9a961;">
                      <strong>🌐 Source:</strong> Portfolio Contact Form
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0;">
                    <a href="mailto:${
                      data.email
                    }?subject=Re: Your message from my portfolio" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3); transition: all 0.3s;">
                      📧 Reply to ${data.name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: rgba(0, 0, 0, 0.4); padding: 25px 40px; border-top: 1px solid rgba(6, 182, 212, 0.2); text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #8fa3b8;">
                This message was sent from your portfolio contact form
              </p>
              <p style="margin: 0; font-size: 12px; color: #06b6d4;">
                <a href="https://mukesh.adhykri.com" style="color: #06b6d4; text-decoration: none; font-weight: 600;">mukesh.adhykri.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const textContent = `
═══════════════════════════════════════════════════
✨ NEW CONTACT MESSAGE FROM YOUR PORTFOLIO
═══════════════════════════════════════════════════

👤 FROM: ${data.name}
📧 EMAIL: ${data.email}
${data.phone ? `📱 PHONE: ${data.phone}` : ""}

───────────────────────────────────────────────────
💬 MESSAGE:
───────────────────────────────────────────────────

${data.message}

───────────────────────────────────────────────────
📅 Received: ${currentDate} (JST)
🌐 Source: Portfolio Contact Form - mukesh.adhykri.com
═══════════════════════════════════════════════════
  `;

  const params = {
    Source: `Portfolio Contact <${fromEmail}>`,
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Subject: {
        Data: `✨ New Message from ${data.name} - Portfolio Contact`,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: htmlContent,
          Charset: "UTF-8",
        },
        Text: {
          Data: textContent,
          Charset: "UTF-8",
        },
      },
    },
    ReplyToAddresses: [data.email],
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    console.log("✅ Contact email sent successfully!");
    console.log("Message ID:", response.MessageId);

    return {
      success: true,
      messageId: response.MessageId,
      message: `Contact form email sent successfully`,
    };
  } catch (error) {
    console.error("❌ Failed to send contact email:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
