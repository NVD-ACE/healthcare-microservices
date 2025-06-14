// src/components/ProfileCard.jsx
import React, { useState, useEffect } from "react";
import { getProfile } from "../services/api";

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getProfile();
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
        setError("Authentication expired. Please login again.");
      } else {
        setError("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2 flex">
              <div className="w-16 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-16 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="text-center space-y-3">
            <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full"></div>
            <div className="w-32 h-6 bg-gray-300 rounded mx-auto"></div>
            <div className="w-24 h-4 bg-gray-300 rounded mx-auto"></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchUserProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formatGender = (gender) => {
    const genderMap = {
      MALE: "Male",
      FEMALE: "Female",
      OTHER: "Other",
    };
    return genderMap[gender] || gender || "Not specified";
  };

  const formatRole = (role) => {
    const roleMap = {
      PATIENT: "Patient",
      DOCTOR: "Doctor",
      NURSE: "Nurse",
      ADMIN: "Admin",
      PHARMACIST: "Pharmacist",
    };
    return roleMap[role] || role || "User";
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button className="px-4 py-2 bg-black text-white rounded-full">
            Profile
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full">
            History
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full">
            3+
          </button>
        </div>
      </div>
      <div className="text-center space-y-3">
        <img
          src={
            user?.avatar_url ||
            `https://i.pravatar.cc/150?u=${user?.username || "default"}`
          }
          alt={user?.full_name || user?.username}
          className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-gray-200"
          onError={(e) => {
            e.target.src = `https://i.pravatar.cc/150?u=${
              user?.username || "default"
            }`;
          }}
        />
        <h3 className="text-lg font-semibold text-gray-900">
          {user?.full_name || user?.username || "Unknown User"}
        </h3>
        <p className="text-gray-500">
          {formatRole(user?.role)} • {formatGender(user?.gender)}
        </p>
      </div>
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p className="flex items-center">
          <span className="mr-2">📧</span>
          {user?.email || "No email provided"}
        </p>
        <p className="flex items-center">
          <span className="mr-2">📱</span>
          {user?.phone_number || "No phone number"}
        </p>
        <p className="flex items-center">
          <span className="mr-2">👤</span>@{user?.username}
        </p>
      </div>
    </div>
  );
}
