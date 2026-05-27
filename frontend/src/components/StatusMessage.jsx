const styles = {
  success: "border-sea-600/30 bg-sea-600/10 text-sea-700",
  error: "border-error/30 bg-error-container text-on-error-container",
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
