import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // ✅ Add disabled prop
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // ✅ Pass disabled prop
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} // ✅ Handle disabled styling
    >
      {text}
    </button>
  );
};

export default Button;
