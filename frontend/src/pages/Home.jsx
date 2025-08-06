import { useEffect, useState } from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";
import "./Home.css";

const Home = () => {
  const { pins, loading } = PinData();
  const [reorderedPins, setReorderedPins] = useState([]);

  useEffect(() => {
    if (pins && pins.length > 0) {
      const columns = 3; // JavaScript-wise layout logic
      const rows = Math.ceil(pins.length / columns);
      const reordered = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const index = c * rows + r;
          if (pins[index]) reordered.push(pins[index]);
        }
      }

      setReorderedPins(reordered);
    }
  }, [pins]);

  return (
    <div className="page-wrapper">
      {loading ? (
        <Loading />
      ) : reorderedPins.length > 0 ? (
        <div className="container">
          {reorderedPins.map((e, i) => (
            <div className="box" key={i}>
              <PinCard pin={e} />
            </div>
          ))}
        </div>
      ) : (
        <p>No Pins Yet</p>
      )}
    </div>
  );
};

export default Home;
