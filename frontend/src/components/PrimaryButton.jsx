const PrimaryButton = ({ children, loading = false, type = "button" }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="flex w-full items-center justify-center rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white shadow-bloom transition hover:-translate-y-0.5 hover:bg-dusk disabled:cursor-not-allowed disabled:bg-dusk/50"
    >
      {loading ? "Working..." : children}
    </button>
  );
};

export default PrimaryButton;
