"use client"
import { useMyContext } from "@/context/MyContext"


const SaccoTopBar = () => {
const { saccoTopBar } = useMyContext()

  return (
    <div className="w-full justify-between items-center p-5 flex-nowrap"> 
        <h2 className="inline font-bold text-blue-950">Dashboard <span className="text-gray-500 font-normal">/{saccoTopBar}</span></h2>
        {/* <button className="bg-black text-white px-3 py-2 rounded-lg hover:bg-slate-600">Logout</button> */}
        {/* <div>
        </div> */}
    </div>
  )
}

export default SaccoTopBar