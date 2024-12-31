import React, { useState } from 'react';
import { Button, Input, Image, Link, Checkbox } from '@nextui-org/react';
import image1 from '../../assets/images/loginpage_image.png';
import { useLoginMutation } from '../../redux/api/authApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Password from './Password';
import image2 from '../../assets/images/companyLogo.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
      toast.success("Login Success");
    } catch (err) {
      toast.error(err.message || "Login Failed");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            isBlurred
            className="w-full h-full object-cover"
            src="https://nextui.org/gradients/docs-right.png"
            alt="Login page image"
          />
        </div>

        <div className="relative z-10 text-center text-[25px] font-bold mb-6">
          Welcome Back !!!
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4 mb-4">
          <Input
            variant="bordered"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            variant="bordered"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex flex-row justify-between items-center">
            <Checkbox>Remember Me</Checkbox>
            <Link href="#" color="primary">Forgot Password?</Link>
          </div>

          <Button type="submit" variant="flat" color="primary" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
        <Password />
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center p-6">
        <Image
          isBlurred
          className="w-full h-full object-cover"
          src={image1}
          alt="Login page image"
        />
      </div>
    </div>
  );
};

export default Login;
