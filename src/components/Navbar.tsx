"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-secondary"
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">LS</span>
          </div>
          <span className="text-xl font-bold text-primary">Lumi Smile</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="#home" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        </nav>
        <Link 
          href="tel:0775277543" 
          className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Book Appointment</span>
        </Link>
      </div>
    </motion.header>
  );
}
