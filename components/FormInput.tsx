import React from "react";

interface FormInputProps {
  label: string;
  type?: string;
  id: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  id,
  required = true,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        id={id}
        required={required}
        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormInput;
