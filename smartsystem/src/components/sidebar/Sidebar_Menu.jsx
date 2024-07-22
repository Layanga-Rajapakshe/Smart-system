import React from 'react'

const Sidebar_Menu = ({title,children}) => {
  return (
    <div>
        <div className="flex gap-2 flex-col">
            <span className="text-xs font-normal ">{title}</span>
            {children}
        </div>
    </div>
  )
}

export default Sidebar_Menu
