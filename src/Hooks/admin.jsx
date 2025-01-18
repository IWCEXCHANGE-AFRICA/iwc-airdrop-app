import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/path";
import { toast } from "react-toastify";
import { useUserContext } from "../contexts";

export const useStoreTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useUserContext();

  const storeTask = async (tasksInfo) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/airdrop/tasks/add`,
        tasksInfo,
        {
          config
        }
      );
      console.log(response);

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

export const useGetTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useUserContext();

  const getTasks = async (tasksInfo) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/airdrop/tasks/add`,
        tasksInfo,
        {
          config
        }
      );
      console.log(response);

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

  return { getTasks, loading, error };
};
