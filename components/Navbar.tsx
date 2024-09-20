import React, { useCallback, useState } from 'react'
import NavbarItem from './NavbarItem'
import {BsChevronDown} from "react-icons/bs";
import MobileMenu from './MobileMenu';


export default function Navbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

  return (
    <nav className='w-full fixed z-40'>
        <div className='px-10 md:px-10 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90'>
            <img className="h-12 lg:h-20" src='/images/logo.png'/>

            <div className='flex flex-row ml-8 gap-7 lg:flex md:flex sm:hidden'>
                <NavbarItem label="Home"/>
                <NavbarItem label="Series"/>
                <NavbarItem label="Films"/>
                <NavbarItem label="New & Popular"/>
                <NavbarItem label="My List"/>
                <NavbarItem label="Browse by languages"/>
            
            </div>             

            <div onClick={toggleMobileMenu} className='flex flex-row items-center gap-2 ml-8 cursor-pointer relative lg:hidden md:hidden '>
                <p className='text-white text-sm'>Browse</p>
                <BsChevronDown className="text-white"/>
                <MobileMenu visible={showMobileMenu}/>
            </div>


        </div>

    </nav>
  )
}
