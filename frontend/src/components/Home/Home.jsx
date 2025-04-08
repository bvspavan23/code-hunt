import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Space from "../../assets/deep space.mp4";

const HomePage = () => {
  const navigate = useNavigate();

  const goToUploadPage = () => {
    navigate("/hint");
  };

  return (
    <div className="main relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        src={Space}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      ></video>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 text-center bg-black/40">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-bold mb-6 drop-shadow-lg"
        >
          Code Hunt
        </motion.h1>


        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToUploadPage}
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition"
        >
          Find Hint
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;
