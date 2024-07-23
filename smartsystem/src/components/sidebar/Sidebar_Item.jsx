import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@nextui-org/react";

const Sidebar_Item = ({ icon, title, isActive, href }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(href);
    };

    return (
        <Link to={href} className="w-full block py-2">
            <Button 
                startContent={icon} 
                color={isActive ? 'primary' : 'default'} 
                variant={isActive ? 'ghost' : 'light'} 
                onClick={handleClick}
                className="w-full justify-start align-middle"
            >
                {title}
            </Button>
        </Link>
    );
};

export default Sidebar_Item;