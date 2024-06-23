import { FileText, UsersIcon, FileClock } from "lucide-react"

type Props = {
    title: string,
    number: number,
    icon?: string

}

const StatCard = ({ title, number, icon }: Props) => {
    return (
        <article className="rounded-lg border border-gray-100 bg-white p-6 w-full md:w-[31%]">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-medium text-gray-900">{number}</p>
                </div>

                <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                    {icon==='FileText' && <FileText />}
                    {icon==='UsersIcon' && <UsersIcon />} 
                    {icon==='FileClock' && <FileClock />}
                </span>
            </div>

            <div className="mt-1 flex gap-1 text-green-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                </svg>

                <p className="flex gap-2 text-xs">
                    <span className="font-medium"> 67.81% </span>

                    <span className="text-gray-500"> Since last week </span>
                </p>
            </div>
        </article>
    )
}

export default StatCard