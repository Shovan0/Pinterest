import { Link } from "react-router-dom";

const PinCard = ({ pin }) => {
  return (
    <Link className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative group cursor-pointer"
    to={`/pin/${pin._id}`}
    >
      <img
        src={pin.image.url}
        alt="Pin"
        className="w-full object-cover rounded-t-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
        <Link
          to={`/pin/${pin._id}`}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
        >
          View Pin
        </Link>
      </div>
    </Link>
  );
};

export default PinCard;
