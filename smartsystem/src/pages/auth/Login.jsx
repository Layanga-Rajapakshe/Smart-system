import React, { useState, useEffect } from 'react';
import { Button, Input, Image, Link, Checkbox, Card, CardBody } from '@nextui-org/react';
import { useLoginMutation } from '../../redux/api/authApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Password from './Password';
import image2 from '../../assets/images/companyLogo.png';
import image1 from '../../assets/images/loginpage.jpeg';
import { createApi } from "unsplash-js";  

// Array of interesting facts - you can move this to a separate API endpoint
const facts = [
  "The first computer programmer was a woman named Ada Lovelace",
  "The first computer mouse was made of wood",
  "The first website is still online today at info.cern.ch",
  "The first computer virus was created in 1983",
  "The term 'bug' in computer programming came from an actual moth",
  "The first computer game was created in 1962",
  "JavaScript was created in just 10 days",
  "The first domain name ever registered was Symbolics.com",
  "The first email was sent in 1971",
  "The QWERTY keyboard layout was designed to slow down typing"
];

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: 'U4mVpQ-eEGWhorkq7zou7HgumiSJGcZoqRj6Qxi7LOg',
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [fact, setFact] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Get random background image from Unsplash
    const fetchRandomImage = async () => {
      try {
        api.photos.getRandom({ query: "cinematic", orientation: "landscape" })
        .then(result => {
          setBackgroundImage(result.response.urls.regular);
          console.log(result);
        });
      } catch (error) {
        // Fallback image if API fails
        console.log(error);
        setBackgroundImage(image1);
      }
    };

    // Get random fact
    const getRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setFact(facts[randomIndex]);
    };

    fetchRandomImage();
    getRandomFact();
  }, []);

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
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl p-8 mx-4 flex gap-8 items-center justify-center">
        {/* Login Form */}
        <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-md bg-white/50 shadow-lg border border-white/70">
          <div className="text-center">
            <Image
              src={image2}
              alt="Company Logo"
              className="mx-auto mb-4 h-12 w-auto"
            />
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome Back!</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </div>

        {/* Did You Know Card */}
        <div className="hidden lg:block w-80">
          <Card className="backdrop-blur-md bg-white/50 border border-white/70">
            <CardBody>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Did You Know?</h3>
              <p className="text-gray-700">{fact}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;