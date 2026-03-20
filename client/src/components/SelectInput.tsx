import React from 'react';

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  options: Option[];
  error?: string;
  touched?: boolean;
};

const SelectInput: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  touched
}) => {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
