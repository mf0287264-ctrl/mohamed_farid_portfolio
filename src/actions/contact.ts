"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const notificationEmail = process.env.NOTIFICATION_EMAIL || "mohamedfarid.dev@gmail.com";

export async function submitContactForm(email: string, message: string) {
  try {
    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `New Contact Form Submission from ${email}`,
      text: `You have a new message from ${email}:\n\n${message}`,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      return { success: false, error: "Failed to send email message." };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected server error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
