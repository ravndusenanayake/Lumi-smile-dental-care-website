"use client";

import { motion } from "framer-motion";
import { Star, Users, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: Star,
    value: "4.9",
    label: "Google Rating",
    subtext: "(40+ Reviews)",
    color: "text-amber-400"
  },
  {
    icon: Users,
    value: "1000+",
    label: "Happy Smiles",
    subtext: "Trusted by Locals",
    color: "text-primary"
  },
  {
    icon: CheckCircle,
    value: "100%",
    label: "Professional",
    subtext: "Expert Staff",
    color: "text-green-500"
  }
];

export default function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-secondary/30 border border-secondary"
            >
              <stat.icon className={`w-10 h-10 ${stat.color} mb-4`} />
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="font-semibold text-slate-800">{stat.label}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.subtext}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
