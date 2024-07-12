import DashboardTopBar from "@/components/DashboardTopBar";
import ManagerDashBoardSideMenuBar from "@/components/ManagerDashBoardSideMenuBar";

export default function ManagerDashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
    {/* <Header /> */}
    <div className="flex min-h-screen w-full ">
      <ManagerDashBoardSideMenuBar />
      <div className="flex flex-col w-full bg-slate-100 overflow-y-scroll">
        <DashboardTopBar />
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
    </>
  )
}
