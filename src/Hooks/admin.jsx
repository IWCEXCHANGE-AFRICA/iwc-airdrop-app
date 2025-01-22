import { useState, useEffect } from "react";
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
        config
      );

      if (response.status === 201) {
        toast.success("Task added successfully!");
        return response.data;
      } else {
        throw new Error(response.data.message || "Task addition failed.");
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

export const useGetTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useUserContext();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/airdrop/tasks/getAlladd`,
        config,
      );

      console.log(response)

      const data = response?.data;

      if (data?.success) {
        setTasks(data?.data);

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

  useEffect(() => {
    fetchTasks();
  }, []);
  return { tasks, loading, error, fetchTasks };
};

export const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useUserContext();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);


  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/admin/get-allusers`,
        config,
      );

      const data = response?.data;

      if (data?.success) {
        setUsers(data?.users);
        setData(data)

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

  useEffect(() => {
    fetchUsers();
  }, []);
  return { users, data, loading, error, fetchUsers };
};
