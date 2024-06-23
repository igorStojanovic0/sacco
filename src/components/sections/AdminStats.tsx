import StatCard from "@/components/StatCard";

const stats = [
    {
        title: "Managers",
        number: 3,
        icon: "UsersIcon"
    },
    {
        title: "Admins",
        number: 2,
        icon: "UserCog"
    },
    {
        title: "Teachers",
        number: 45,
        icon: "PersonStanding"
    }
]

const AdminStats = () => {
    
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

export default AdminStats