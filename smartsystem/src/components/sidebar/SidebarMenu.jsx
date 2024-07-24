import React from 'react';

const SidebarMenu = ({ title, children }) => {
  return (
    <div className="sidebar-menu">
      <h3 className="text-sm font-normal text-black mb-2 text-start px-2">{title}</h3>
      <div className="flex gap-2 flex-col w-full px-2">
        {children}
      </div>
    </div>
  );
};

export default SidebarMenu;