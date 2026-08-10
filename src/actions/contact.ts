"use server";

import { Resend } from "resend";
import { supabase } from "../lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const notificationEmail = process.env.NOTIFICATION_EMAIL || "mohamadtareq954@gmail.com";

export async function submitContactForm(email: string, message: string) {
  try {
    // 1. Insert into Supabase
    const { error: dbError } = await supabase
      .from("contacts")
      .insert([{ email, message }]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return { success: false, error: "Failed to save message." };
    }

    // 2. Send email via Resend
    // Note: If you don't have a verified domain on Resend, you must send FROM onboarding@resend.dev
    const { error: emailError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `New Contact Form Submission from ${email}`,
      text: `You have a new message from ${email}:\n\n${message}`,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      // We still return success: true for the user because their data was saved to Supabase
      // but we logged the email error on the server.
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected server error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
