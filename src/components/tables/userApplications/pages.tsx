import { Application } from "@/types"
import { columns } from "./columns"
import { DataTable } from "./data-table"

type Props = {
    data: Application[];
}
export default function UserApplicationPage({ data }: Props) {
    return (
      <div className="mx-auto py-10 w-full">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }