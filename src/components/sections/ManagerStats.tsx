import StatCard from "../StatCard"

const stats = [
    {
        title: "Loans",
        number: 45,
        icon: "FileText"
    },
    {
        title: "Teachers",
        number: 40,
        icon: "UsersIcon"
    },
    {
        title: "Pending Loans",
        number: 10,
        icon: "FileClock"
    }
]

const ManagerStats = () => {
    
    return (
        <div className="flex w-full justify-between flex-wrap">
            {stats.map((stat, index) => (
                <StatCard
                    key={index} 
                    title={stat.title} 
                    number={stat.number} 
                    icon={stat.icon}
                />
            ))}
        </div>
    )
}

export default ManagerStats;