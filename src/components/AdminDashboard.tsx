"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Clock, MessageCircle, AlertCircle } from "lucide-react";

interface Appointment {
  id: string | number;
  patient_name: string;
  phone_number: string;
  appointment_date: string;
  appointment_time: string | null;
  reason_for_visit: string | null;
  status: "Pending" | "Accepted" | string;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State to hold the input time before saving, keyed by appointment id
  const [timeInputs, setTimeInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: false });

    if (error) {
      console.error("Error fetching appointments:", error);
      setError("Error fetching data.");
    } else {
      setAppointments(data || []);
    }
    setLoading(false);
  };

  const handleTimeChange = (id: string | number, value: string) => {
    setTimeInputs((prev) => ({ ...prev, [id]: value }));
  };

  const acceptAppointment = async (id: string | number) => {
    const time = timeInputs[id];
    if (!time) {
      alert("Please enter a time.");
      return;
    }

    const { error } = await supabase
      .from("appointments")
      .update({ status: "Accepted", appointment_time: time })
      .eq("id", id);

    if (error) {
      console.error("Error updating appointment:", error);
      alert("Update failed.");
    } else {
      // Update local state smoothly
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === id
            ? { ...app, status: "Accepted", appointment_time: time }
            : app
        )
      );
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // Strip non-numbers and '+'
    let cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (cleanPhone.startsWith("0")) {
      // Convert standard domestic 07XXXX to 947XXXX
      cleanPhone = "94" + cleanPhone.substring(1);
    }
    cleanPhone = cleanPhone.replace("+", "");
    return cleanPhone;
  };

  const getWhatsAppMessage = (time: string) => {
    return encodeURIComponent(`Your appointment has been confirmed for ${time}.`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Lumi Smile - Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage your patient appointments.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
           {/* loading spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-800"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50/80 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100 mb-6 font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Phone Number</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Time / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {appointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500 bg-gray-50/30"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Clock className="w-10 h-10 text-gray-300 mb-3" />
                        <p>No appointments found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {appointment.patient_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {appointment.phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                        {appointment.reason_for_visit || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {appointment.appointment_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.status === "Accepted" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Accepted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                            <Clock className="w-3.5 h-3.5" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.status === "Pending" ? (
                          <div className="flex items-center gap-3">
                            <input
                              type="time"
                              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-shadow text-gray-700"
                              value={timeInputs[appointment.id] || ""}
                              onChange={(e) =>
                                handleTimeChange(appointment.id, e.target.value)
                              }
                            />
                            <button
                              onClick={() => acceptAppointment(appointment.id)}
                              className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                            >
                              Accept
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <span className="text-slate-800 font-semibold bg-slate-100 px-3 py-1 rounded-md">
                              {appointment.appointment_time}
                            </span>
                            <a
                              href={`https://wa.me/${formatPhoneNumber(
                                appointment.phone_number
                              )}?text=${getWhatsAppMessage(
                                appointment.appointment_time || ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm shadow-[#25D366]/20"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Send WhatsApp
                            </a>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
