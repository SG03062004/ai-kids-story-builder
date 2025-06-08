import React from 'react'
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@heroui/navbar";
import Image from 'next/image';
import { Button } from '@heroui/button';
import Link from 'next/link';

function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10 h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h2 className='text-[70px] text-primary font-extrabold py-10'>Craft Magical Stories for kids in Minutes</h2>
                <p className='text-2xl text-primary font-light'>Create fun and personalised stories that bring your child's adventures to life and spark their passion for reading. It only takes a few secinds!</p>
                <Link href={'/create-story'}>
                    <Button size='lg' className='mt-5 font-bold text-2xl p-8 bg-gradient-to-tr from-purple-800 to-pink-600 text-white shadow-lg rounded-2xl'>Create Story</Button>
                </Link>
            </div>
            <div>
                <Image src={'/hero.png'} alt='hero' width={700} height={400}/>
            </div>
        </div>
    </div>
  )
}

export default Hero