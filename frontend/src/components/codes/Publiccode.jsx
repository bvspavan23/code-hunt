import React, { useState } from "react";
import { motion } from "framer-motion";
import Space from "../../assets/deep space.mp4";
import axios from "axios";
import Card from "../card/card";

const Publiccode = () => {
  const Base_URL = "http://localhost:5000";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const getHint = async () => {
    setLoading(true);
    setError("");
    setContent(""); 

    try {
      const response = await axios.get(`${Base_URL}/cc-club/hint/${code}`);
      const hintData = response.data.hint;
      setTimeout(() => {
        setContent(hintData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Hint not found or server error.");
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        src={Space}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      ></video>

      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6"
        >
          Hint Generator
        </motion.h1>

        <div className="flex gap-4 mb-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter the code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-3 w-full text-lg rounded-xl border border-gray-300 text-black"
          />
          <button
            onClick={getHint}
            className="p-3 text-lg bg-white text-blue-600 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {loading && (
          <div className="mb-6 flex items-center gap-3 text-white text-lg">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating Hint...
          </div>
        )}

        {error && (
          <div className="text-red-400 font-semibold mb-4 text-center">
            {error}
          </div>
        )}

        {content && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card hintMsg={content} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Publiccode;
