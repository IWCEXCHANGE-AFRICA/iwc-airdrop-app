import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/path";
import { toast } from "react-toastify";

export const useStoreTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const storeTask = async (tasksInfo) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}`, tasksInfo, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        toast.success("Fetch Successful!");
        return response.data;
      } else {
        throw new Error(response.data.message || "Fetch failed.");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Network or server error";
      toast.error(errMsg);
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { storeTask, loading, error };
};
