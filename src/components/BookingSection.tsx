"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function BookingSection() {
  const [formData, setFormData] = useState({
    patient_name: "",
    phone_number: "",
    appointment_date: "",
    appointment_time: "",
    reason_for_visit: "",
  });

  const getAvailableTimes = (dateString: string) => {
    if (!dateString) return [];
    const date = new Date(dateString);
    const day = date.getDay();
    const times: string[] = [];
    
    if (day === 0 || day === 6) {
      // Weekends: 9:00 AM to 8:30 PM
      for (let h = 9; h <= 20; h++) {
        const hour12 = h === 12 ? 12 : (h > 12 ? h - 12 : h);
        const ampm = h >= 12 ? "PM" : "AM";
        times.push(`${hour12}:00 ${ampm}`);
        times.push(`${hour12}:30 ${ampm}`);
      }
    } else {
      // Weekdays: 5:00 PM to 8:30 PM
      for (let h = 17; h <= 20; h++) {
        const hour12 = h === 12 ? 12 : (h > 12 ? h - 12 : h);
        const ampm = h >= 12 ? "PM" : "AM";
        times.push(`${hour12}:00 ${ampm}`);
        times.push(`${hour12}:30 ${ampm}`);
      }
    }
    return times;
  };

  const availableTimes = getAvailableTimes(formData.appointment_date);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const { error } = await supabase.from("appointments").insert([
      {
        patient_name: formData.patient_name,
        phone_number: formData.phone_number,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        reason_for_visit: formData.reason_for_visit,
        status: "Pending",
      },
    ]);

    setIsLoading(false);

    if (error) {
      console.error("Error submitting booking:", error);
      setErrorMsg("Failed to book appointment. Please try again.");
    } else {
      setIsSuccess(true);
      setFormData({
        patient_name: "",
        phone_number: "",
        appointment_date: "",
        appointment_time: "",
        reason_for_visit: "",
      });
      // Hide success message after 8 seconds
      setTimeout(() => setIsSuccess(false), 8000);
    }
  };

  return (
    <section id="booking" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[#0ea5e9] font-bold tracking-wide uppercase text-sm mb-3">Book Appointment</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Request Your Visit Online</h3>
            <p className="text-slate-600 text-lg">Leave your details and preferred date below. Our team will verify and confirm your exact appointment time.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-6 sm:p-10"
        >
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Booking Requested!</h4>
              <p className="text-slate-600 mb-8">
                Your request has been sent to our clinic. We will send you a WhatsApp message shortly to confirm your exact appointment time!
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-2 rounded-full font-medium transition-colors"
              >
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-medium">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="patient_name" className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    id="patient_name"
                    name="patient_name"
                    type="text"
                    required
                    value={formData.patient_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. Nimal Perera"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone_number" className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    required
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. 077 123 4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="reason_for_visit" className="text-sm font-semibold text-slate-700">Reason for Visit</label>
                <select
                  id="reason_for_visit"
                  name="reason_for_visit"
                  required
                  value={formData.reason_for_visit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all bg-white"
                >
                  <option value="" disabled>Select a reason</option>
                  <option value="General Checkup">General Checkup</option>
                  <option value="Teeth Cleaning">Teeth Cleaning</option>
                  <option value="Teeth Filling">Teeth Filling</option>
                  <option value="Tooth Extraction">Tooth Extraction</option>
                  <option value="Root Canal Treatment">Root Canal Treatment</option>
                  <option value="Braces / Orthodontics">Braces / Orthodontics</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="appointment_date" className="text-sm font-semibold text-slate-700">Preferred Date</label>
                  <input
                    id="appointment_date"
                    name="appointment_date"
                    type="date"
                    required
                    value={formData.appointment_date}
                    onChange={(e) => {
                      handleChange(e);
                      setFormData(prev => ({ ...prev, appointment_time: "" }));
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all text-slate-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="appointment_time" className="text-sm font-semibold text-slate-700">Preferred Time</label>
                  <select
                    id="appointment_time"
                    name="appointment_time"
                    required
                    disabled={!formData.appointment_date}
                    value={formData.appointment_time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all bg-white disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {formData.appointment_date ? "Select a time" : "Select a date first"}
                    </option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#0ea5e9]/20 transition-all flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    "Request Booking"
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
