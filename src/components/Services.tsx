"use client";

import { motion } from "framer-motion";
import { Sparkles, Syringe, ClipboardPlus, Stethoscope } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Teeth Cleaning",
    description: "Professional scaling and polishing to keep your smile bright and healthy.",
  },
  {
    icon: Syringe,
    title: "Tooth Extraction",
    description: "Painless and safe extraction procedures by our expert team.",
  },
  {
    icon: ClipboardPlus,
    title: "Dental Fillings",
    description: "High-quality tooth-colored fillings to restore decayed or damaged teeth.",
  },
  {
    icon: Stethoscope,
    title: "Braces",
    description: "Orthodontic treatments to straighten your teeth and improve your bite.",
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Comprehensive Dental Services</h3>
            <p className="text-slate-600 text-lg">We offer a wide range of dental treatments tailored to meet your unique needs and ensure optimal oral health.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group"
            >
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
