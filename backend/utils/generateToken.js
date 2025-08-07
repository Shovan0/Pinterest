import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // 15 days
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",  // <-- KEY CHANGE
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // <-- KEY CHANGE
  });
};

export default generateToken;
