const TextInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
}) => {
  return (
    <label className="block text-sm font-medium text-dusk">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-dusk/60">
        {label}
      </span>
      <input
        className="w-full rounded-2xl border border-clay bg-white/80 px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-sea focus:ring-2 focus:ring-sea/30"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  );
};

export default TextInput;
