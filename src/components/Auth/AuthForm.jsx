

import { useState } from 'react';
import { motion } from "framer-motion";

import Login from './login';
import Register from './Register';
import HelloCat from '../../assets/helloCat.png'
import Image from 'next/image';

export default function AuthForm() {
  const [isLogin, setIsLogin]= useState(true);

  function handleIsLogin(){
    setIsLogin( prevIsLogin => !prevIsLogin)
  }
  return (
      <div className='relative text-[#6B4F4F]'>
        <div className='flex bg-[#FFD3B5] p-5 sm:p-10 rounded-lg shadow-lg relative z-10'>
          {isLogin && <Login selectIsLogin={handleIsLogin}/>}
          {!isLogin && <Register selectIsLogin={handleIsLogin}/>}
        </div>
        <motion.div 
          key={isLogin}
          initial={{y: 0}}
          animate={{y: -170}}
          transition={{duration:1 }}
          className='w-full flex justify-center absolute top-10 left-0 '>
            <Image src={HelloCat} alt='Hello cat' className='w-52' />
        </motion.div>
      </div>
  );
}
