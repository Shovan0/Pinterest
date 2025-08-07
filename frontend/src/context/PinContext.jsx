import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// 👇 import isAuth from UserContext
import { UserData } from "./UserContext"; // adjust path if needed

const PinContext = createContext();
// const url = "http://localhost:5000";
const url = "https://pinterest-backend-q3yq.onrender.com";

export const PinProvider = ({ children }) => {
  const { isAuth } = UserData(); // 👈 use authentication status
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPins() {
    try {
      const { data } = await axios.get(`${url}/api/pin/all`, {
        withCredentials: true,
      });

      setPins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [pin, setPin] = useState([]);

  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/api/pin/${id}`, {
        withCredentials: true,
      });

      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await axios.put(
        `${url}/api/pin/${id}`,
        { title, pin },
        { withCredentials: true }
      );
      toast.success(data.message);
      fetchPin(id);
      setEdit(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function addComment(id, comment, setComment) {
    try {
      const { data } = await axios.post(
        `${url}/api/pin/comment/${id}`,
        { comment },
        { withCredentials: true }
      );
      toast.success(data.message);
      fetchPin(id);
      setComment("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(
        `${url}/api/pin/comment/${id}?commentId=${commentId}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      fetchPin(id);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function deletePin(id, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${url}/api/pin/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      navigate("/");
      setLoading(false);
      fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function addPin(
    formData,
    setFilePrev,
    setFile,
    setTitle,
    setPin,
    navigate,
    setLoading
  ) {
    try {
      const { data } = await axios.post(`${url}/api/pin/new`, formData, {
        withCredentials: true,
      });

      toast.success(data.message);
      setFile([]);
      setFilePrev("");
      setPin("");
      setTitle("");
      fetchPins();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  // 👇 Only fetch pins if user is authenticated
  useEffect(() => {
    if (isAuth) {
      fetchPins();
    } else {
      setPins([]); // clear pins if logged out
      setLoading(false);
    }
  }, [isAuth]);

  return (
    <PinContext.Provider
      value={{
        pins,
        loading,
        fetchPin,
        pin,
        updatePin,
        addComment,
        deleteComment,
        deletePin,
        addPin,
        fetchPins,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
