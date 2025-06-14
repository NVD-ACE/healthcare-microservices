// src/components/Appointments.jsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api, { appointmentAPI } from "../services/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getAppointments();
      // Get only upcoming appointments (next 5)
      const upcoming = response.data
        .filter((apt) => new Date(apt.scheduled_time) > new Date())
        .sort((a, b) => new Date(a.scheduled_time) - new Date(b.scheduled_time))
        .slice(0, 5);
      setAppointments(upcoming);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors/");
      setDoctors(response.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const getDoctorInfo = (doctorId) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    return doctor
      ? {
          name: `Dr. ${doctor.username}`,
          specialty: doctor.specialty || "General Practice",
        }
      : {
          name: `Doctor ${doctorId}`,
          specialty: "Unknown",
        };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    return `${day} ${dayName}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleAppointmentClick = (appointmentId) => {
    // Navigate to appointment details or open modal
    window.location.href = `/dashboard/appointments/${appointmentId}`;
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="font-semibold mb-4">Appointments</h4>
        <div className="text-center py-8 text-gray-500">
          <p>Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="font-semibold mb-4">Appointments</h4>
        <div className="text-center py-8 text-red-500">
          <p>{error}</p>
          <button
            onClick={fetchAppointments}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="font-semibold mb-4">Appointments</h4>
        <div className="text-center py-8 text-gray-500">
          <p>No upcoming appointments</p>
          <p className="text-sm mt-2">Schedule your next appointment today!</p>
          <button
            onClick={() => (window.location.href = "/dashboard/appointments")}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Book Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Upcoming Appointments</h4>
        <button
          onClick={() => (window.location.href = "/dashboard/appointments")}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View All
        </button>
      </div>
      <Swiper
        slidesPerView={Math.min(appointments.length, 3)}
        spaceBetween={12}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {appointments.map((appointment) => {
          const doctorInfo = getDoctorInfo(appointment.doctor_id);
          return (
            <SwiperSlide key={appointment.id}>
              <div
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleAppointmentClick(appointment.id)}
              >
                <div className="text-center mb-2 text-sm font-medium text-blue-600">
                  {formatDate(appointment.scheduled_time)}
                </div>
                <hr className="mb-2" />
                <p className="font-medium text-gray-800">{doctorInfo.name}</p>
                <p className="text-sm text-gray-500">{doctorInfo.specialty}</p>
                {appointment.reason && (
                  <p
                    className="text-xs text-gray-400 mt-1 truncate"
                    title={appointment.reason}
                  >
                    {appointment.reason}
                  </p>
                )}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-700">
                    {formatTime(appointment.scheduled_time)}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : appointment.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
