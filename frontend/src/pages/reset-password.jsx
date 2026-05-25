import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PrimaryButton from "../components/PrimaryButton";
import StatusMessage from "../components/StatusMessage";
import TextInput from "../components/TextInput";
import { resetPasswordApi } from "../util/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [formValues, setFormValues] = useState({
    email: emailParam,
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (emailParam && !formValues.email) {
      setFormValues((prev) => ({
        ...prev,
        email: emailParam,
      }));
    }
  }, [emailParam, formValues.email]);

  const handleChange = (event) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await resetPasswordApi(
        formValues.email,
        formValues.otp,
        formValues.newPassword,
        formValues.confirmPassword,
      );
      setStatus({
        type: "success",
        message: result.message || "Password reset successfully.",
      });
      setFormValues({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to reset password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Reset password"
      subtitle="Enter the OTP you received and set a new password."
      footer={
        <p className="text-xs text-dusk/70">
          OTPs are valid for 10 minutes. Need a new one?{" "}
          <Link className="font-semibold text-sea" to="/forgot-password">
            Request OTP.
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
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <TextInput
          label="OTP"
          name="otp"
          type="text"
          placeholder="6-digit code"
          autoComplete="one-time-code"
          value={formValues.otp}
          onChange={handleChange}
          required
        />
        <TextInput
          label="New password"
          name="newPassword"
          type="password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          value={formValues.newPassword}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat the new password"
          autoComplete="new-password"
          value={formValues.confirmPassword}
          onChange={handleChange}
          required
        />
        <StatusMessage type={status.type} message={status.message} />
        <PrimaryButton type="submit" loading={loading}>
          Reset password
        </PrimaryButton>
      </form>
    </AuthShell>
  );
};

export default ResetPassword;
