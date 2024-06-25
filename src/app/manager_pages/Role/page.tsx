"use client"
import { useAddRole } from "@/api/role";
import RoleForm from "@/components/forms/RoleForm";

const Role = () => {
  const { addRole, isLoading, isSuccess } = useAddRole();


  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-bold text-xl">Register new Role</h1>
      </div>
      <RoleForm onAddRole={addRole} isLoading={isLoading} />
    </div>
  )
}

export default Role