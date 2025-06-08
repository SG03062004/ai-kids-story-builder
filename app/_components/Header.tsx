'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { Button } from '@heroui/button'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Header() {
    const {user,isSignedIn}=useUser();
    const MenuList=[
        {
            name:'Home',
            path:'/'
        },
        {
            name:'Create Story',
            path:'/create-story'
        },
        {
            name:'Explore Stories',
            path:'/explore'
        },
        {
            name:'Contact Us',
            path:'/contact'
        }
    ]
    const [isMenuOpen,setIsMenuOpen]=useState(false);
  return (
    <Navbar className='flex items-center justify-between w-full' maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle aria-label={isMenuOpen?"Close menu":"Open menu"} className='sm:hidden'/>
            <NavbarBrand>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
                <h2 className='font-bold text-2xl text-primary ml-3'>Kidso Story</h2>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden sm:flex'>
            {MenuList.map((item,index)=>(
                <NavbarItem key={index} className='text-xl text-primary font-medium hover:underline mx-2'>
                    <Link href={item.path}>{item.name}</Link>
                </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
                <Button className='bg-gradient-to-tr from-purple-800 to-pink-600 text-white shadow-lg rounded-2xl'>
                    {isSignedIn?'Dashboard':'Get Started'}
                </Button>
            </Link>
            <UserButton/>
        </NavbarContent>
        <NavbarMenu>
            {MenuList.map((item,index)=>(
                <NavbarMenuItem>
                    <Link href={item.path}>{item.name}</Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header