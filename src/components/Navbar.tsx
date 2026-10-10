"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-secondary/50 shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2 z-50">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">LS</span>
          </div>
          <span className="text-xl font-bold text-primary">Lumi Smile</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">About</Link>
          <Link href="/#services" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">Services</Link>
          <Link href="/#contact" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">Contact</Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          <Link 
            href="/#booking" 
            onClick={closeMenu}
            className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
          </Link>
          
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors bg-slate-50 hover:bg-slate-100 rounded-full"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full bg-white border-t border-slate-100 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col items-center pt-10 pb-20 px-6 gap-8 h-full overflow-y-auto">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Services", href: "/#services" },
                { name: "Contact", href: "/#contact" }
              ].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="w-full text-center"
                >
                  <Link 
                    href={link.href}
                    onClick={closeMenu}
                    className="text-2xl font-bold text-slate-800 hover:text-primary transition-colors block py-2"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="mt-8 w-full max-w-xs"
              >
                <Link 
                  href="/#booking" 
                  onClick={closeMenu}
                  className="w-full bg-slate-900 text-white px-6 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <CalendarDays className="w-5 h-5" />
                  Book Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
