import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();
// const url = "http://localhost:5000";
const url = "https://pinterest-backend-q3yq.onrender.com"

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  async function registerUser(name, email, password, navigate, fetchPins) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${url}/api/user/register`,
        { name, email, password },
        { withCredentials: true } 
      );


      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  async function loginUser(email, password, navigate, fetchPins) {
  setBtnLoading(true);

  try {
    const { data } = await axios.post(`${url}/api/user/login`, { email, password }, {
      withCredentials: true 
    });

    toast.success(data.message);
    setUser(data.user);
    setIsAuth(true);
    navigate("/");
    fetchPins();
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || "Login failed. Please try again.";
    toast.error(errMsg);
  } finally {
    setBtnLoading(false);
  }
}


  const [loading, setLoading] = useState(true);

  async function fetchUser() {
  try {
    const { data } = await axios.get(`${url}/api/user/me`, {
      withCredentials: true,
    });

    setUser(data);
    setIsAuth(true);
  } catch (error) {
    console.error("Fetch user failed:", error);

    if (error.response && error.response.status === 401 || error.response.status === 403) {
      setIsAuth(false);
      setUser(null);
    }

  } finally {
    setLoading(false);
  }
}


  async function followUser(id, fetchUser) {
    try {
      const { data } = await axios.post(`${url}/api/user/follow/` + id, { withCredentials: true });

      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
  // const token = document.cookie.includes("token");
  // if (!token) return; // No cookie, don't call API

  fetchUser();
}, []);


  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        user,
        loading,
        registerUser,
        setIsAuth,
        setUser,
        followUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
