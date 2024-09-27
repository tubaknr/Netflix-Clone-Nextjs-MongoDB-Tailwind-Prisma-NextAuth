import React from 'react'
import useCurrentUser from '@/hooks/useCurrentUser';
import {getSession, signOut} from "next-auth/react";
import "./globals.css";
import {useRouter} from "next/navigation";
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext){
    const session = await getSession(context);

    if (!session){
        return{
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return{
        props: {}
    }
}

export default function Profiles() {

    const router = useRouter();
    const { data: user } = useCurrentUser();
  
    return (
    <div className='flex items-center h-screen text-white bg-black justify-center'>
        <div className='flex flex-col'>
            <h1 className='text-3xl md:text-6xl text-white text-center'>
                Who is watching?
            </h1>
            <div className='flex items-center justify-center gap-8 mt-20'>
                <div onClick={() => router.push('/')}>
                    <div className='group flex-row w-44 mx-auto'>
                        <div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                            <img src='/images/default_user.jpg' alt='default user'/>
                        </div>
                        <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                            {user?.expires}
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
  )
}
