import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import {Button} from "@nextui-org/react";

const Sidebar_Item = ({ icon, title, isActive, href}) => {
    const handleClick = () => {
        Navigate(href);
    }

  return (
    <div>
      <Link to={href} className="max-w-full">
        <Button startContent={icon} color={isActive ? 'primary' : 'default'} variant={isActive ? 'ghost' : 'light'} onClick={handleClick}>
            {title}
        </Button>
      </Link>
    </div>
  )
}

export default Sidebar_Item
