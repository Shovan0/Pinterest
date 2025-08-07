import React, { useEffect, useState } from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
// import toast from "react-hot-toast";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import "./Home.css";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser, logoutUser } = UserData();
  const { pins } = PinData();

  const [userPins, setUserPins] = useState([]);
  const [reorderedPins, setReorderedPins] = useState([]);

  useEffect(() => {
    if (pins && user) {
      const filtered = pins.filter((pin) => pin.owner === user._id);
      setUserPins(filtered);
    }
  }, [pins, user]);

  useEffect(() => {
    if (userPins.length > 0) {
      const columns = 3;
      const rows = Math.ceil(userPins.length / columns);
      const reordered = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const index = c * rows + r;
          if (userPins[index]) reordered.push(userPins[index]);
        }
      }

      setReorderedPins(reordered);
    }
  }, [userPins]);

  const logoutHandler = async () => {
    logoutUser(navigate)
  };

  return (
    <div className="page-wrapper">
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 w-full">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-3xl text-gray-700">
                {user.name.slice(0, 1)}
              </span>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-center text-gray-600 mt-2">{user.email}</p>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={logoutHandler}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <div className="mt-6">
            {reorderedPins.length > 0 ? (
              <div className="container">
                {reorderedPins.map((pin, i) => (
                  <div className="box" key={i}>
                    <PinCard pin={pin} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-4">No Pins Yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
