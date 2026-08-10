"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201152419789"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center cursor-pointer shadow-xl animate-whatsapp-heartbeat transition-transform hover:scale-110 active:scale-95"
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8 fill-current" />
    </a>
  );
}
