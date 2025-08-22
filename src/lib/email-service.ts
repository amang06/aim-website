import {
  SESClient,
  SendEmailCommand,
  SendRawEmailCommand,
} from "@aws-sdk/client-ses";
import { Member } from "../../payload-types";

interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  attachments?: EmailAttachment[];
}

class EmailService {
  private sesClient: SESClient;
  private fromEmail: string;

  constructor() {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    this.fromEmail = process.env.FROM_EMAIL || "office@aim.ind.in";
  }

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    try {
      if (options.attachments && options.attachments.length > 0) {
        return await this.sendEmailWithAttachments(options);
      } else {
        return await this.sendSimpleEmail(options);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }

  private async sendSimpleEmail(options: SendEmailOptions): Promise<boolean> {
    const command = new SendEmailCommand({
      Source: this.fromEmail,
      Destination: {
        ToAddresses: [options.to],
      },
      Message: {
        Subject: {
          Data: options.subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: options.htmlContent,
            Charset: "UTF-8",
          },
          Text: options.textContent
            ? {
                Data: options.textContent,
                Charset: "UTF-8",
              }
            : undefined,
        },
      },
    });

    const result = await this.sesClient.send(command);
    return !!result.MessageId;
  }

  private async sendEmailWithAttachments(
    options: SendEmailOptions
  ): Promise<boolean> {
    const boundary = `boundary_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Build email message
    let rawMessage = "";

    // Headers
    rawMessage += `From: ${this.fromEmail}\r\n`;
    rawMessage += `To: ${options.to}\r\n`;
    rawMessage += `Subject: ${options.subject}\r\n`;
    rawMessage += `MIME-Version: 1.0\r\n`;
    rawMessage += `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`;

    // HTML body part
    rawMessage += `--${boundary}\r\n`;
    rawMessage += `Content-Type: text/html; charset=UTF-8\r\n`;
    rawMessage += `Content-Transfer-Encoding: 7bit\r\n\r\n`;
    rawMessage += `${options.htmlContent}\r\n\r\n`;

    // Attachments
    if (options.attachments) {
      for (const attachment of options.attachments) {
        rawMessage += `--${boundary}\r\n`;
        rawMessage += `Content-Type: ${attachment.contentType}\r\n`;
        rawMessage += `Content-Disposition: attachment; filename="${attachment.filename}"\r\n`;
        rawMessage += `Content-Transfer-Encoding: base64\r\n\r\n`;

        const base64Content = attachment.content.toString("base64");
        const lines = base64Content.match(/.{1,76}/g) || [];
        rawMessage += lines.join("\r\n") + "\r\n\r\n";
      }
    }

    rawMessage += `--${boundary}--\r\n`;

    const command = new SendRawEmailCommand({
      Source: this.fromEmail,
      Destinations: [options.to],
      RawMessage: {
        Data: Buffer.from(rawMessage),
      },
    });

    const result = await this.sesClient.send(command);
    return !!result.MessageId;
  }

  async sendMembershipCertificate(
    member: Member,
    certificateBuffer: Buffer
  ): Promise<boolean> {
    const memberName = `${member.contactTitle} ${member.contactFirstName} ${member.contactLastName}`;
    const companyName = member.companyName;

    const htmlContent = this.generateCertificateEmailHtml(
      memberName,
      companyName
    );
    const textContent = this.generateCertificateEmailText(
      memberName,
      companyName
    );

    return await this.sendEmail({
      to: member.contactEmail,
      subject: "Your AIM Membership Certificate",
      htmlContent,
      textContent,
      attachments: [
        {
          filename: `AIM_Membership_Certificate_${member.companyName.replace(
            /[^a-zA-Z0-9]/g,
            "_"
          )}.pdf`,
          content: certificateBuffer,
          contentType: "application/pdf",
        },
      ],
    });
  }

  private generateCertificateEmailHtml(
    memberName: string,
    companyName: string
  ): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your AIM Membership Certificate</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            background: linear-gradient(135deg, #2c5282, #4299e1);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2c5282;
        }
        .message {
            margin-bottom: 20px;
        }
        .highlight {
            background: #e3f2fd;
            padding: 15px;
            border-left: 4px solid #2c5282;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 14px;
            color: #666;
        }
        .contact-info {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">AIM</div>
        <h1>Association of Indian Manufacturers</h1>
        <p>Welcome to the AIM Family!</p>
    </div>
    
    <div class="content">
        <div class="greeting">Dear ${memberName},</div>
        
        <div class="message">
            <p>Congratulations! We are delighted to welcome you and <strong>${companyName}</strong> as a valued member of the Association of Indian Manufacturers (AIM).</p>
            
            <p>Your membership application has been approved and processed successfully. Please find your official membership certificate attached to this email.</p>
        </div>
        
        <div class="highlight">
            <h3>What's Next?</h3>
            <ul>
                <li>Download and save your membership certificate for your records</li>
                <li>Access member-only resources on our website</li>
                <li>Join our upcoming events and networking sessions</li>
                <li>Connect with fellow manufacturers in your industry</li>
            </ul>
        </div>
        
        <div class="message">
            <p>As an AIM member, you now have access to:</p>
            <ul>
                <li>Industry insights and market research reports</li>
                <li>Networking opportunities with industry leaders</li>
                <li>Government advocacy on behalf of manufacturers</li>
                <li>Training and development programs</li>
                <li>Business development support</li>
            </ul>
        </div>
        
        <div class="message">
            <p>We look forward to supporting your business growth and fostering innovation in Indian manufacturing together.</p>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        </div>
        
        <div class="contact-info">
            <strong>Contact Information:</strong><br>
            Email: office@aim.ind.in<br>
            Phone: +91 9415008282<br>
            Website: www.aim.ind.in
        </div>
    </div>
    
    <div class="footer">
        <p>Thank you for choosing AIM. Together, we build a stronger India.</p>
        <p>&copy; ${new Date().getFullYear()} Association of Indian Manufacturers. All rights reserved.</p>
    </div>
</body>
</html>
    `;
  }

  private generateCertificateEmailText(
    memberName: string,
    companyName: string
  ): string {
    return `
Dear ${memberName},

Congratulations! We are delighted to welcome you and ${companyName} as a valued member of the Association of Indian Manufacturers (AIM).

Your membership application has been approved and processed successfully. Please find your official membership certificate attached to this email.

What's Next?
- Download and save your membership certificate for your records
- Access member-only resources on our website
- Join our upcoming events and networking sessions
- Connect with fellow manufacturers in your industry

As an AIM member, you now have access to:
- Industry insights and market research reports
- Networking opportunities with industry leaders
- Government advocacy on behalf of manufacturers
- Training and development programs
- Business development support

We look forward to supporting your business growth and fostering innovation in Indian manufacturing together.

If you have any questions or need assistance, please don't hesitate to contact us.

Contact Information:
Email: office@aim.ind.in
Phone: +91 9415008282
Website: www.aim.ind.in

Thank you for choosing AIM. Together, we build a stronger India.

© ${new Date().getFullYear()} Association of Indian Manufacturers. All rights reserved.
    `;
  }
}

export const emailService = new EmailService();
