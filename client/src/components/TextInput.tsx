type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  error?: string;
  touched?: boolean;
  type?: string;
};

const TextInput: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  type = 'text'
}) => {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
