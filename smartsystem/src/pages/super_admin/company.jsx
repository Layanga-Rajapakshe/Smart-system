import React from 'react'
import {Button} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import CompanyList from './CompanyList';

const Company = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 rounded-lg lg:col-span-2">
          <div className="flex flex-col">
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>Company List</h1>
            <Button color="primary" variant='flat' endContent={<IoAdd />}>
              New Company
            </Button>
          </div>
          <div className='py-2'                                                                         ><CompanyList /></div>
          </div>
        </div>
        <div className="h-32 rounded-lg bg-gray-200"></div>
      </div>
    </div>
  )
}

export default Company
