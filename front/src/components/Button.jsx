import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-lg bg-white/10 text-white font-semibold
        shadow-lg shadow-white/5 border border-white/20
        transition-all duration-300 ease-in-out
        hover:bg-white/20 hover:shadow-white/10
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900
        ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 border border-white/30"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </motion.button>
  );
};

export default Button;

motion;
