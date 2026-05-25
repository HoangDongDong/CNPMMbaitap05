const styles = {
  success: "border-sea/30 bg-sea/10 text-sea",
  error: "border-red-200 bg-red-50 text-red-600",
};

const StatusMessage = ({ type, message }) => {
  if (!message) return null;

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm ${
        styles[type] || styles.error
      }`}
    >
      {message}
    </div>
  );
};

export default StatusMessage;
