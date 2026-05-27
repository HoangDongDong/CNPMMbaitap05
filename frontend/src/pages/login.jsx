import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PrimaryButton from "../components/PrimaryButton";
import StatusMessage from "../components/StatusMessage";
import TextInput from "../components/TextInput";
import { loginApi } from "../util/api";

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

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
      const result = await loginApi(formValues.username, formValues.password);
      if (result?.data?.token) {
        localStorage.setItem("token", result.data.token);
      }
      if (result?.data?.user) {
        localStorage.setItem("user", JSON.stringify(result.data.user));
      }
      setStatus({
        type: "success",
        message: result.message || "Login successful.",
      });
      setFormValues({ username: "", password: "" });
      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Login failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Login"
      subtitle="Nhap tai khoan va mat khau de dang nhap."
      footer={
        <p className="text-xs text-dusk/70">
          Quen mat khau?{" "}
          <Link className="font-semibold text-sea" to="/forgot-password">
            Lay lai mat khau.
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <TextInput
          label="Username"
          name="username"
          type="text"
          placeholder="your-username"
          autoComplete="username"
          value={formValues.username}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <StatusMessage type={status.type} message={status.message} />
        <PrimaryButton type="submit" loading={loading}>
          Login
        </PrimaryButton>
      </form>
    </AuthShell>
  );
};

export default Login;
