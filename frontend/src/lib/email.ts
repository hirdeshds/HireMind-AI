import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    console.log("Generating Ethereal email test account...");
    // Generate a temporary test account dynamically
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using the test account
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"HireMind AI (Test)" <test@hiremind.ai>',
      to,
      subject,
      html,
    });

    console.log("✅ Email successfully sent!");
    console.log("📧 Message ID: %s", info.messageId);
    // This logs the clickable link to view the fake email
    console.log("🌐 PREVIEW EMAIL HERE: %s", nodemailer.getTestMessageUrl(info));
    
    return info;
  } catch (error) {
    console.error("Error sending email via Ethereal:", error);
    throw error;
  }
};
