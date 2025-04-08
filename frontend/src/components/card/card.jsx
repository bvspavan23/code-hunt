import React from "react";
import { motion } from "framer-motion";

const Card = ({ hintMsg }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white/20 backdrop-blur-lg text-white p-6 rounded-2xl shadow-xl text-center flex flex-col justify-center items-center min-h-[200px] max-h-[300px] w-full max-w-md overflow-y-auto"
  >
    <p className="text-base sm:text-lg leading-relaxed tracking-wide font-medium">
      {hintMsg}
    </p>
  </motion.div>
);

export default Card;
