import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PrimaryButton from "../components/PrimaryButton";
import StatusMessage from "../components/StatusMessage";
import TextInput from "../components/TextInput";
import { forgotPasswordApi } from "../util/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const targetEmail = email;
      const result = await forgotPasswordApi(targetEmail);
      setStatus({
        type: "success",
        message:
          result.message || "OTP sent. Check your email for the reset code.",
      });
      setEmail("");
      if (targetEmail) {
        navigate(`/reset-password?email=${encodeURIComponent(targetEmail)}`);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to request password reset.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Forgot password"
      subtitle="We will send an OTP to the email address below."
      footer={
        <p className="text-xs text-dusk/70">
          Already have the OTP?{" "}
          <Link
            className="font-semibold text-sea"
            to={
              email
                ? `/reset-password?email=${encodeURIComponent(email)}`
                : "/reset-password"
            }
          >
            Continue with reset password.
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <TextInput
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <StatusMessage type={status.type} message={status.message} />
        <PrimaryButton type="submit" loading={loading}>
          Send OTP
        </PrimaryButton>
      </form>
    </AuthShell>
  );
};

export default ForgotPassword;
