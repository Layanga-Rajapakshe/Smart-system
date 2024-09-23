import React, { useState } from 'react'
import { Input} from '@nextui-org/react';

const SuperviseeData = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  return (
    <div className='py-2'>
            <Input
              variant='bordered'
              label='Email'
              type='email'
              value={email}
              className='mb-2'
            />
            <Input
              variant='bordered'
              label='Password'
              type='password'
              value={password}
              className='mb-2'
            />
    </div>
  )
}

export default SuperviseeData
