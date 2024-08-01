"use client"
import { UserSection } from '@/components/group/components/UserSection';
import { useMyContext } from '@/context/MyContext';
import '@/styles/globals.css';
import '@/styles/styles.css';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

export default function SaccoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const params = useParams()
    const { setSaccoCategory, groupList } = useMyContext()
    let group = groupList?.find((group) => group?.group_id.toString() === params.groupId)

    return (
        <>
            <div className='flex w-60 flex-col bg-[#d4d6f3] justify-between'>
                <div>
                    <div className='flex h-12 items-center px-3 font-title text-white shadow-md'>
                        <Link href='/'><img src={`/logo.png`} width={150} height={20} alt="logo" /></Link>
                    </div>
                    <Link href={`/Groups/${group?.group_id}/welcome/1`}>
                        <div className='flex text-gray-700 gap-3 text-2xl font-bold justify-start items-center text-center bg-blue-300 p-3'>
                            <Image className='rounded-lg' width={40} height={40} src={(group?.group_avatar === 'default' || !group?.group_avatar) ? '/servers/mirage.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${group.group_avatar}`} alt='group' />
                            <span>{group?.group_name}</span>
                        </div>
                    </Link>
                    <div onClick={() => {
                        setSaccoCategory(1);
                        router.push(`/${params?.groupId}/Sacco`)
                        }} className='p-3 font-medium text-black cursor-pointer hover:bg-blue-200'>
                        <p className='text-black'>All Sacco</p>
                    </div>
                    <div onClick={() => {
                        setSaccoCategory(2);
                        router.push(`/${params?.groupId}/Sacco`)
                    }} className='p-3 font-medium text-black cursor-pointer hover:bg-blue-200'>
                        <p className='text-black'>Joined Sacco</p>
                    </div>
                    <div onClick={() => {
                        setSaccoCategory(3)
                        router.push(`/${params?.groupId}/Sacco`)
                    }} className='p-3 font-medium text-black cursor-pointer hover:bg-blue-200'>
                        <p className='text-black'>Applied Sacco</p>
                    </div>
                    <div onClick={() => {
                        setSaccoCategory(4);
                        router.push(`/${params?.groupId}/Sacco/formSacco/`)
                    }} className='p-3 font-medium text-black cursor-pointer hover:bg-blue-200'>
                        <p className='text-black'>Form Sacco</p>
                    </div>
                </div>
                <div className="">
                    <UserSection />
                </div>
            </div>
            {children}
        </>
    );
}
