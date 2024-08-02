import { useGetProfileData } from "@/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { iconTextGenerator } from "@/lib/iconTextGenerator";
import { User } from "@/types";
import Cookies from "js-cookie";
import { File, LucideCircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import LogoVPN from "../../../../../public/logo.png";
import ButtonOutline from "../misc/ButtonOutline.";


const Header = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState(false);

  const [userInfo, setUserInfo] = useState<User>();
  const { currentUser } = useGetProfileData();

  useEffect(() => {
    if (currentUser) {
      setUserInfo(currentUser)
    }
  }, [currentUser])


  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "fixed top-0 w-full  z-30 bg-white transition-all " +
          (scrollActive ? " shadow-md pt-0" : " pt-4")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Image src={LogoVPN} width={150} height={40} alt="" />
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-[#4F5665]  items-center">
            <LinkScroll
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("home");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "home"
                  ? " text-[rgb(50,86,166)] animation-active "
                  : " text-[#4F5665] hover:text-[rgb(50,86,166)] a")
              }
            >
              Home
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="feature"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("feature");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "feature"
                  ? " text-[rgb(50,86,166)] animation-active "
                  : " text-[#4F5665] hover:text-[rgb(50,86,166)] ")
              }
            >
              Process
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "about"
                  ? " text-[rgb(50,86,166)] animation-active "
                  : " text-[#4F5665] hover:text-[rgb(50,86,166)]")
              }
            >
              Benefits
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="testimoni"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("testimoni");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "testimoni"
                  ? " text-[rgb(50,86,166)] animation-active "
                  : " text-[#4F5665] hover:text-[rgb(50,86,166)] ")
              }
            >
              Testimonial
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="testimoni"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("testimoni");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "testimoni"
                  ? " text-[rgb(50,86,166)] animation-active "
                  : " text-[#4F5665] hover:text-[rgb(50,86,166)] ")
              }
            >
              Contact Us
            </LinkScroll>
            {userInfo?._id && (
              <Link href={'/Groups'}>Group</Link>
            )}
          </ul>

          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">

            <div className="hidden md:block">
              {userInfo?._id
                ?
                <Popover>
                  <PopoverTrigger className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/assets/avatar.svg" className="bg-black" />
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
                <>
                  <Link href="/auth/SignIn">
                    <span className="text-[#0B132A] mx-2 sm:mx-4 capitalize tracking-wide hover:text-[rgb(50,86,166)] transition-all">
                      Sign In
                    </span>
                  </Link>
                  <Link href={'/auth/SignUp'}><ButtonOutline>Sign Up</ButtonOutline></Link>
                </>
              }
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white sm:px-3">
          <ul className="flex w-full justify-between items-center text-[#4F5665]">
            <LinkScroll
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("home");
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "home"
                  ? "  border-[rgb(50,86,166)] text-[rgb(50,86,166)]"
                  : " border-transparent")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Home
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="feature"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("feature");
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "feature"
                  ? "  border-[rgb(50,86,166)] text-[rgb(50,86,166)]"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Feature
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "about"
                  ? "  border-[rgb(50,86,166)] text-[rgb(50,86,166)]"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="testimoni"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("testimoni");
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "testimoni"
                  ? "  border-[rgb(50,86,166)] text-[rgb(50,86,166)]"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Testimonial
            </LinkScroll>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
