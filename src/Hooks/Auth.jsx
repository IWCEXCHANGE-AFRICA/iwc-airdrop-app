import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/path";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authorizeLogin } from "../utilities/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../stores/slices/userSlice";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        toast.success("Registration successful!");
        return response.data;
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.errors?.referralCode || // Check for referral-specific errors
        err.response?.data?.message ||
        "Network or server error";
      toast.error(errMsg);
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export const uselogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const _dispatch = useDispatch();
  const _nav = useNavigate();

  const login = async (userData) => {
    setLoading(true);
    setError(null);
    console.log("User Data being sent:", userData);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        toast.success("Login successful!");
        authorizeLogin(response, _dispatch, setLoading, _nav, setUser);

        console.log(response);

        const user = response?.data?.result?.user;
        if (user?.user_type === 4) {
          navigate("/homepage");
        } else if (user?.user_type === (1 || 2)) {
          navigate("/dashboard");
        }
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to login");
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg); // Set the error message in state
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const verifyAndLogin = async (token) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Sending OTP:", token); // Debug log for OTP being sent
      const response = await axios.post(`${BASE_URL}/auth/verify-email`, {
        otp: token // Use `otp` as the key in the payload
      });
      console.log("Server Response:", response.data); // Log the server response

      if (response.status === 200) {
        setSuccess("Email verification successful!");
        toast.success("Email verified successfully!");
        navigate("/authentication/login/login");
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg); // Set the error message in state
      toast.error(errMsg);
      console.error("Error Response:", err.response?.data); // Log the error
    } finally {
      setLoading(false);
    }
  };

  return { verifyAndLogin, loading, success, error };
};
