"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Clock, MessageCircle, AlertCircle, LogOut } from "lucide-react";

interface Appointment {
  id: string | number;
  patient_name: string;
  phone_number: string;
  appointment_date: string;
  appointment_time: string | null;
  reason_for_visit: string | null;
  status: "Pending" | "Accepted" | string;
}

import { verifyAdminCredentials } from "@/app/actions/auth";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State to hold the input time before saving, keyed by appointment id
  const [timeInputs, setTimeInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isLoggedIn) {
      fetchAppointments();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const result = await verifyAdminCredentials(username, password);
      
      if (result.success) {
        setIsLoggedIn(true);
      } else {
        setLoginError(result.error || "Invalid credentials.");
      }
    } catch (err) {
      setLoginError("An error occurred during login.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setLoginError("");
  };

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

  const acceptAppointment = async (id: string | number, requestedTime: string | null) => {
    // Use the explicitly typed time, or fallback to the patient's requested time
    const time = timeInputs[id] !== undefined ? timeInputs[id] : requestedTime;
    
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
      cleanPhone = "94" + cleanPhone.substring(1);
    }
    cleanPhone = cleanPhone.replace("+", "");
    return cleanPhone;
  };

  const getWhatsAppMessage = (time: string) => {
    return encodeURIComponent(`Your appointment has been confirmed for ${time}.`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 mt-2 text-sm">Please enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {loginError}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all placeholder:text-slate-400"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all placeholder:text-slate-400"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#0ea5e9]/20"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

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
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors rounded-lg font-medium text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
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
                      colSpan={6}
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
                          <div className="flex flex-col gap-1.5">
                            {appointment.appointment_time && (
                              <span className="text-xs text-blue-600 font-semibold">
                                Requested: {appointment.appointment_time}
                              </span>
                            )}
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Time (e.g. 5:30 PM)"
                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-shadow text-gray-700 w-32"
                                value={timeInputs[appointment.id] !== undefined ? timeInputs[appointment.id] : (appointment.appointment_time || "")}
                                onChange={(e) =>
                                  handleTimeChange(appointment.id, e.target.value)
                                }
                              />
                              <button
                                onClick={() => acceptAppointment(appointment.id, appointment.appointment_time)}
                                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                              >
                                Accept
                              </button>
                            </div>
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
