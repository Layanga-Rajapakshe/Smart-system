import React, { useState, useEffect } from 'react';
import { Button, Input, Image, Link, Checkbox } from '@nextui-org/react';
import image1 from '../../assets/images/loginpage_image.png';
import { useLoginMutation } from '../../redux/api/authApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  // const { search } = useLocation();
  // const sp = new URLSearchParams(search);
  // const redirect = sp.get("redirect") || "/company";

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/company");
      toast.success("Login Success");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex-col flex items-center justify-center p-6">
        <div className="md:hidden absolute left-0 right-0 bottom-0 top-0 z-0">
          <Image
            isBlurred
            className="w-full h-screen/2 fill-inherit"
            src="https://nextui.org/gradients/docs-right.png"
            alt="Login page image"
          />
        </div>

        <div className="text-center text-[25px] font-bold mb-6">
          Welcome Back !!!
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-4 mb-4">
          <Input
            variant="bordered"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            variant="bordered"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-row justify-between">
            <Checkbox>Remember Me</Checkbox>
            <Link href="#">Forgot Password?</Link>
          </div>

          <Button type="submit" variant="flat" color="primary">
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center p-6">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            isBlurred
            className="w-full h-full object-fill"
            src={image1}
            alt="Login page image"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
