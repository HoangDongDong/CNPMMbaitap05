import { Form, Input, Button, Container, Card, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { registerApi } from "../util/api";
import "./register.css";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      const { name, email, password } = values;
      const result = await registerApi(name, email, password);

      notification.success({
        message: "Registration Successful",
        description: "You have successfully registered. Please log in.",
        duration: 2,
      });

      form.resetFields();
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        duration: 3,
      });
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <h2>Register</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <p>
          Already have an account?{" "}
          <a onClick={() => navigate("/login")}>Login here</a>
        </p>
      </Card>
    </div>
  );
};

export default Register;
