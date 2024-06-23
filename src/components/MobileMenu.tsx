import Cookies from "js-cookie";
import Link from "next/link";

type Props = {
    handleClose: () => void
}

const MobileMenu = ({ handleClose }: Props) => {
    return (
        <>
            {/* Mobile Menu  */}
            <div className="md:hidden container fixed left-0 top-12 w-full bg-blue-500 text-white">
                <span className="flex flex-col gap-5 py-10">
                    <a href={'/'} onClick={handleClose} className="text-white">Home</a>
                    <a href={'#process'} onClick={handleClose} className="text-white">Process</a>
                    <a href={'#benefits'} onClick={handleClose} className="text-white">Benefits</a>
                    <Link href={'/apply'} onClick={handleClose} className=" text-white">Get Started</Link>

                    {Cookies.get('access-token')
                        ?
                        <>
                            <a href={'/account'} onClick={handleClose} className="text-white">Profile</a>
                            <a href={'/account/applications'} onClick={handleClose} className="text-white">Applications</a>
                        </>
                        :
                        <Link href={'/signin'} onClick={handleClose} className="text-white py-2 hover:bg-blue-500 focus:bg-blue-500">Sign In</Link>
                    }
                </span>
            </div>
        </>
    )
}

export default MobileMenu