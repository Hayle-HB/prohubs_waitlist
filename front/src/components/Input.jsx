import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  name,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700 rounded-lg text-white placeholder-zinc-400
          transition-all duration-300 ease-in-out backdrop-blur-md
          focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent
          hover:border-zinc-500 shadow-sm
          ${className}`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default Input;
