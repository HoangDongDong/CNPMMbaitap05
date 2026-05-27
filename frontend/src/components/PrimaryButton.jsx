const PrimaryButton = ({ children, loading = false, type = "button" }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-float transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50"
    >
      {loading ? "Working..." : children}
    </button>
  );
};

export default PrimaryButton;
