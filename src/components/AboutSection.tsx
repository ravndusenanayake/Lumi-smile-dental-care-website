"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5] group">
              <div className="absolute inset-0 bg-slate-200">
                {/* Doctor's Photo */}
                <img 
                  src="/profile.jpg" 
                  alt="Doctor" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-8 md:p-10">
                {/* User can add their name here */}
                <h3 className="text-white text-3xl font-bold mb-1">Dr. Anju</h3>
                <p className="text-[#0ea5e9] font-semibold text-lg">Dental Surgeon</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-[#0ea5e9] font-bold tracking-wide uppercase text-sm mb-3">About Our Doctor</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Passionate About Proper Patient Care
            </h3>
            
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              As a dedicated Dental Surgeon, I am passionate about providing the highest standard of patient care. 
              Beyond the clinic, I also enjoy sharing my knowledge as a YouTuber and content writer, helping people understand more about oral health and hygiene.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Dental Surgeon, YouTuber, and Content Writer",
                "Graduated from Faculty of Dental Sciences, University of Peradeniya",
                "Experience at Dental Teaching Hospital, Peradeniya",
                "Dedicated to proper and gentle patient care"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="bg-[#0ea5e9]/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="w-5 h-5 text-[#0ea5e9] flex-shrink-0" />
                  </div>
                  <span className="text-slate-700 font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
