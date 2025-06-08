"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@heroui/button';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext } from 'react'

function DashboardHeader() {
  const {userDetail,setUSerDetail}=useContext(UserDetailContext);
  return (
    <div className='p-7 bg-[#4a5c99] text-white flex justify-between items-center'>
        <h2 className='font-bold text-3xl'>My Stories</h2>
        <div className='flex gap-3 items-center'>
            <Image src={'/coin.png'} alt='coin' width={50} height={50}/>
            <span className='text-2xl'>{userDetail?.credit} Credit Left</span>
            <Link href={'/buy-credits'}>
              <Button className='bg-blue-400'>Buy More Credits</Button>
            </Link>
        </div>
    </div>
  )
}

export default DashboardHeader