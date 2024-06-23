import { Application } from "@/types"
import { columns } from "./columns"
import { DataTable } from "./data-table"

type Props = {
    data: Application[];
}
export default function UserApplicationPage({ data }: Props) {
    return (
      <div className="mx-auto p-4 pt-0 w-full bg-white">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }