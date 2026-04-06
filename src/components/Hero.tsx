"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const photos = [
  "/photo.JPG",
  "/photo2.jpg",
  "/photo3.jpg",
  "/photo4.jpg",
  "/photo5.jpg"
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % photos.length);
    }, 5000); // 5 seconds per image
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--color-secondary),_transparent_50%)]" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                <span className="block text-primary mb-2">Lumi Smile Dental Care</span>
                <span className="block text-3xl sm:text-4xl text-slate-700 mt-4 leading-normal">නිරෝගී දත් පෙළක්, සුන්දර සිනහවක්</span>
              </h1>
              <p className="max-w-[600px] text-lg text-slate-600 mx-auto lg:mx-0">
                Experience gentle, professional dental care in a modern environment. Your confident smile is our highest priority.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="https://wa.me/94775277543" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                WhatsApp Now
              </Link>
              <Link 
                href="#services" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-primary bg-secondary rounded-full hover:bg-blue-100 transition-all group"
              >
                Our Services 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 relative shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={photos[currentImage]}
                    alt={`Lumi Smile Clinic Image ${currentImage + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentImage === 0}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentImage ? "bg-white w-6" : "bg-white/50 hover:bg-white/90 shadow-sm"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary rounded-full opacity-10 blur-xl -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
