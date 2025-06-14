// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // Adjust the import path as needed

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "PATIENT", // Default role
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName) errs.fullName = "Họ và tên là bắt buộc";
    if (!formData.username) errs.username = "Tên đăng nhập là bắt buộc";
    if (!formData.email) errs.email = "Email là bắt buộc";
    if (!formData.email.includes("@"))
      errs.email = "Vui lòng nhập địa chỉ email hợp lệ";
    if (!formData.password) errs.password = "Mật khẩu là bắt buộc";
    if (formData.password.length < 6)
      errs.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Mật khẩu xác nhận không khớp";
    if (!formData.role) errs.role = "Vai trò là bắt buộc";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Prepare data for API
      const apiData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        first_name: formData.fullName.split(" ")[0] || "",
        last_name: formData.fullName.split(" ").slice(1).join(" ") || "",
      };

      // Send registration request
      const response = await registerUser(apiData);
      if (response.status !== 201 || response.status !== 200) {
        throw new Error("Đăng ký thất bại");
      }

      console.log("Registration successful:", response.data);

      // Redirect to login page
      navigate("/login", {
        state: {
          message:
            "Đăng ký thành công! Vui lòng đăng nhập với tài khoản mới của bạn.",
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);

      // Handle API error responses
      if (error.response && error.response.data) {
        const apiErrors = {};
        const errorData = error.response.data;

        // Map API errors to form fields
        if (errorData.username) apiErrors.username = errorData.username[0];
        if (errorData.email) apiErrors.email = errorData.email[0];
        if (errorData.password) apiErrors.password = errorData.password[0];

        setErrors({
          ...validationErrors,
          ...apiErrors,
          api: "Đăng ký thất bại. Vui lòng kiểm tra thông tin và thử lại.",
        });
      } 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Tạo tài khoản
        </h2>

        {errors.api && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors.api}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Nguyễn Văn Dũng"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="dungnv"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="abc@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vai trò
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            >
              <option value="PATIENT">Bệnh nhân</option>
              <option value="DOCTOR">Bác sĩ</option>
              <option value="NURSE">Y tá</option>
              <option value="PHARMACIST">Dược sĩ</option>
              <option value="ADMIN">Quản trị viên</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-600 mt-1">{errors.role}</p>
            )}
          </div>

          {/* Thêm thông tin chuyên biệt cho role DOCTOR */}
          {formData.role === "DOCTOR" && (
            <div className="p-3 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">
                Thông tin bác sĩ sẽ được thu thập sau khi đăng ký trong quá
                trình thiết lập hồ sơ.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 ${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold rounded-lg transition`}
          >
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
