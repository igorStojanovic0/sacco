import { Mail, Phone } from "lucide-react"
import Link from "next/link"
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineX } from "react-icons/ai"

const Footer = () => {
  return (
    <div className="py-6 bg-[#013a6f] mt-20">
      <div className="px-2 md:container mx-auto flex justify-between items-center flex-wrap gap-4">
        <Link href={'/'} className="text-3xl font-bold tracking-tight text-white">Twezimbe</Link>
        <div className="flex gap-3 text-xl text-white">
            <Link href={'/'}><AiOutlineInstagram /></Link>
            <Link href={'/'}><AiOutlineFacebook /></Link>
            <Link href={'/'}><AiOutlineX /></Link>
      </div>
        <Link className="text-white flex" href={'mailto:webadmin@summitcl.com'}>
        <Mail className="text-sm"/>webadmin@summitcl.com
        </Link>
        <Link className="text-white flex" href={'mailto:webadmin@summitcl.com'}>
        <Phone className="text-sm"/>Phone: +256 782610333
        </Link>
        <p className="text-white">&copy; Copyrights Reserved - Twezimbe 2024</p>
      </div>
      
    </div>
  )
}

export default Footer