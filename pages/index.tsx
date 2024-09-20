import React from 'react'
import {getSession} from "next-auth/react";
import Navbar from "@/components/Navbar";
import "./globals.css";

//ERROR:email basıyor, name bassın.
//ERROR: github giriş her zaman girmiyor, googe da öyle.
//kayıt olmuş olan kulancı giremiyor

import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext){
    const session = await getSession(context);

    if (!session){ //hesaba girilmemişse
        return{
            redirect: {
                destination: '/auth', //hesaba girmeden siteye ulaşamaz 
                permanent: false,
            }
        }
    }

    return{
        props: {}
    }
}




export default function Home() {

    return (
        <>
        <Navbar/>
        </>
  )
}
