import { Button, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };
  const dispatch = useAppDispatch();

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (event: FieldValues) => {
    const toastId = toast.loading("Logging in");
    console.log(event);

    try {
      const userInfo = {
        id: event.id,
        password: event.password,
      };

      const res = await login(userInfo).unwrap();
      console.log(error);

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success("Login successful!", { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
    } catch (err: any) {
      toast.error("Login failed! Error: " + err.error, {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type={"text"} name={"id"} label="Id:" />

        <PHInput type={"text"} name={"password"} label="Password" />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
