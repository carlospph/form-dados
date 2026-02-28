import React from 'react';

const styleLabel = "block text-sm font-semibold text-gray-700 mb-1";
const styleField = "border-2 border-gray-200 block mt-2 py-3 px-2 w-full rounded-lg md:text-[20px] focus:border-blue-500 outline-none transition duration-200";

export const Campo = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className={styleLabel}>
        {label}
      </label>
      <input
        type={type}
         name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={styleField}
      />
    </div>
  );
};