import { useGetProfileData } from "@/api/auth";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { iconTextGenerator } from "@/lib/iconTextGenerator";
import { User } from "@/types";
import Cookies from "js-cookie";
import { File, LucideCircleUser } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const PrimaryMenu = () => {
    const [userInfo, setUserInfo] = useState<User>();
    const { currentUser } = useGetProfileData();

    useEffect(() => {
        if (currentUser) {
            setUserInfo(currentUser)
        }
    }, [currentUser])

    return (
        <>
            {/* Desktop menu  */}
            <div className="hidden md:block">
                <span className="flex gap-5">
                    <a href={'/'} className="text-[#2f578b]">Home</a>
                    <a href={'/'} className="text-[#2f578b]">About Us</a>
                    <a href={'/'} className="text-[#2f578b]">Features</a>
                    <a href={'/'} className="text-[#2f578b]">Book Demo</a>
                    <a href={'/#process'} className="text-[#2f578b]">Process</a>
                    <a href={'/#benefits'} className="text-[#2f578b]">Group</a>
                    <a href={'/apply'} className=" text-[#2f578b]">Get Started</a>
                </span>
            </div>

            <div className="hidden md:block">
                {userInfo?._id
                    ?
                    <Popover>
                        <PopoverTrigger className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src="/assets/avatar.svg" className="bg-black"/>
                                <AvatarFallback>{iconTextGenerator(userInfo.surName, userInfo.givenName)}</AvatarFallback>
                            </Avatar>
                            <p className="text-[#2f578b]">{userInfo.surName}</p>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-2 bg-[#2f578b]">
                            <Link href={'/public_pages/Profile'} className="flex items-center justify-between px-3 py-1 rounded-sm text-white hover:bg-blue-700">
                                <span>Profile</span>
                                <LucideCircleUser />
                            </Link>
                            <Link href={'/account/applications'} className="flex items-center justify-between px-3 py-1 rounded-sm text-white hover:bg-blue-700">
                                <span>Applications</span>
                                <File />
                            </Link>
                            <Button variant={'secondary'} className="text-white" size={'sm'} onClick={() => {
                                Cookies.remove('access-token');
                                window.location.reload();
                                // setUser(false);
                            }}>Sign out</Button>
                        </PopoverContent>
                    </Popover>
                    :
                    <Link href={'/public_pages/SignIn'} className="hidden md:block text-blue-950 px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 font-bold">Sign In</Link>
                }
            </div>
        </>
    )
}

export default PrimaryMenu