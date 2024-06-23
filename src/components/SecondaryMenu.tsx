import { Mail, Phone } from "lucide-react"
import Link from "next/link"
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineX } from "react-icons/ai"
const SecondaryMenu = () => {
  return (
    <div className="bg-blue-600 text-white hidden md:block py-4">
        <div className="container flex justify-end py-1 flex-wrap gap-7">
          <p className="text-sm">Contact or connect to us:</p>
          <div className="flex gap-3 text-sm">
            <Link href={"mailto:webadmin@summitcl.com"} className="flex gap-3 items-center">
              <Mail className="text-sm"/> webadmin@summitcl.com
            </Link>
            <span className="flex gap-3 items-center">
              <Phone /> +256 782610333
            </span>
          </div>
          <div className="flex gap-3 text-xl">
            <Link href={'/'}><AiOutlineInstagram /></Link>
            <Link href={'/'}><AiOutlineFacebook /></Link>
            <Link href={'/'}><AiOutlineX /></Link>
          </div>
        </div>
      </div>
  )
}

export default SecondaryMenu