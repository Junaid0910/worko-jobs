import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email Mock] To: ${to}, Subject: ${subject}`);
    return;
  }

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: [to],
      subject: subject,
      html: html,
    });
    console.log(`Email sent to ${to}:`, data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const templates = {
  jobAlert: (workerName: string, jobTitle: string, location: string) => `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #E8410A;">New Job Alert!</h2>
      <p>Hello ${workerName},</p>
      <p>A new job matching your skills has been posted:</p>
      <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #E8410A;">
        <strong>${jobTitle}</strong><br/>
        Location: ${location}
      </div>
      <p><a href="${process.env.NEXTAUTH_URL}/jobs" style="background: #0F1C3F; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 15px;">View Details</a></p>
    </div>
  `,
  applicationStatus: (jobTitle: string, status: string) => `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2>Application Update</h2>
      <p>Your application for <strong>${jobTitle}</strong> has been <strong>${status}</strong>.</p>
      <p><a href="${process.env.NEXTAUTH_URL}/dashboard/worker" style="background: #0F1C3F; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 15px;">Check Dashboard</a></p>
    </div>
  `,
};
