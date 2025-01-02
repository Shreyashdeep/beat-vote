"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Play, Users } from "lucide-react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar(){
    const session=useSession();
    
    return(
        <div className='flex justify-between px-20 pt-4'>
          <div className='text-lg font-bold flex flex-col justify-center text-white'>
            BeatVote
          </div>
                {session.data?.user && <Button className=" py-6 md:py-4 lg:py-12 xl:py-6 bg-gradient-to-b from-gray-900 " onClick={() => signOut()}>Logout</Button>}
                {!session.data?.user && <Button className=" py-6 md:py-4 lg:py-12 xl:py-6 bg-gradient-to-b from-gray-900 " onClick={() => signIn()}>SignIn</Button>}
        </div>

    );
}