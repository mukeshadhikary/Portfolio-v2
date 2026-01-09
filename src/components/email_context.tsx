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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0a; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #1a1a2e; border-radius: 16px; overflow: hidden; margin: 0 auto;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%); padding: 30px 20px; text-align: center;">
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                ✨ New Contact Message
              </h1>
              <p style="margin: 0; color: #e0e7ff; font-size: 14px; line-height: 1.4;">
                Someone reached out through your portfolio
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 24px 20px;">
              
              <!-- Sender Info -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <!-- Name -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                      <tr>
                        <td>
                          <div style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); border-radius: 10px; text-align: center; line-height: 40px; vertical-align: middle; margin-right: 12px;">
                            <span style="font-size: 20px;">👤</span>
                          </div>
                          <div style="display: inline-block; vertical-align: middle;">
                            <p style="margin: 0; font-size: 11px; color: #0ea5e9; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">From</p>
                            <p style="margin: 2px 0 0 0; font-size: 18px; font-weight: 700; color: #ffffff; line-height: 1.3;">${
                              data.name
                            }</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Email -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
                      <tr>
                        <td style="padding: 12px 14px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-right: 10px; vertical-align: top;">
                                <span style="font-size: 16px;">📧</span>
                              </td>
                              <td>
                                <p style="margin: 0 0 2px 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                <a href="mailto:${
                                  data.email
                                }" style="color: #0ea5e9; text-decoration: none; font-weight: 600; font-size: 14px; line-height: 1.4; word-break: break-all;">${
    data.email
  }</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    ${
                      data.phone
                        ? `
                    <!-- Phone -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding: 12px 14px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-right: 10px; vertical-align: top;">
                                <span style="font-size: 16px;">📱</span>
                              </td>
                              <td>
                                <p style="margin: 0 0 2px 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Phone</p>
                                <a href="tel:${data.phone}" style="color: #8b5cf6; text-decoration: none; font-weight: 600; font-size: 14px; line-height: 1.4;">${data.phone}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    `
                        : ""
                    }
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                      <tr>
                        <td style="padding-right: 10px; vertical-align: middle;">
                          <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%); border-radius: 8px; text-align: center; line-height: 36px;">
                            <span style="font-size: 18px;">💬</span>
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0; font-size: 15px; font-weight: 700; color: #ffffff;">Message</p>
                        </td>
                      </tr>
                    </table>
                    <div style="background: rgba(0, 0, 0, 0.4); border-radius: 10px; padding: 16px; border-left: 3px solid #8b5cf6;">
                      <p style="margin: 0; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">${
                        data.message
                      }</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Reply Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding: 10px 0;">
                    <a href="mailto:${
                      data.email
                    }?subject=Re: Your message from my portfolio" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-align: center;">
                      ✉️ Reply to ${data.name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: rgba(0, 0, 0, 0.4); padding: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                📅 ${currentDate} (JST)
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569; line-height: 1.5;">
                From your portfolio at 
                <a href="https://mukesh.adhykri.com" style="color: #0ea5e9; text-decoration: none;">mukesh.adhykri.com</a>
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
