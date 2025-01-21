import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/path";
import { toast } from "react-toastify";
import { useUserContext } from "../contexts";
import { useDispatch } from "react-redux";
import { updateGrossPointBalance } from "../stores/slices/userSlice";

export const useClaimTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useUserContext();
  const dispatch = useDispatch();

  const claimTask = async () => {
    setLoading(true);
    setError(null);

    try {
      // API request to claim task
      const response = await axios.get(
        `${BASE_URL}/airdrop/hourlytasks/claim`,
        config
      );

      if (response.status === 200) {
        dispatch(updateGrossPointBalance(response?.data?.result));
        return { success: true, data: response.data };
      } else {
        return {
          success: false,
          error: response.data?.message || "Task claim failed."
        };
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      setError(errMsg);
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return { claimTask, loading, error };
};

export const useClaimbyID = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useUserContext();

  const claimTask = async (id, userData) => {
    setLoading(true);
    setError(null);

    console.log("data:", userData);

    try {
      const response = await axios.post(
        `${BASE_URL}/airdrop/tasks/claim/${id}`,
        userData,
        config
      );

      console.log("response:", response);

      // Validate the response structure
      if (response?.status === 201 && response?.data) {
        toast.success("IWC Airdrop successful!");
        return { success: true, data: response.data }; // Return success and data
      } else {
        const errorMessage = response?.data?.message || "Task claim failed.";
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err.message ||
        "Network or server error";

      setError(errMsg); // Update error state
      toast.error(errMsg);
      return { success: false, error: errMsg }; // Return error
    } finally {
      setLoading(false);
    }
  };

  return { claimTask, loading, error };
};

export const useGetReferrals = () => {
  const [refData, setRefData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config } = useUserContext();

  const fetchReferrals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/referrals`, config);
      const data = response.data;
      console.log("data:", response)

      if (data?.error === 0) {
        setRefData(data?.result);
      }
      if (data?.error) {
        toast.error(data?.message);
        return false;
      }
    } catch (error) {
      console.log("Error:", error);
      // toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);
  return { refData, loading, fetchReferrals };
};
