import React from 'react'
import {Button} from "@heroui/react";
import {useNavigate} from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  }
  
  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}

export default Home
