import { User } from "@/types"
import { columns } from "./columns"
import { DataTable } from "./data-table"

type Props = {
    data: User[];
}
export default function UsersTable({ data }: Props) {
    return (
      <div className="mx-auto p-4 w-full bg-white rounded-md">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }