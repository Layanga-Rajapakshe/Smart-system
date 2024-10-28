import React from 'react'
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/company");
  }
  
  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}

export default Home
