import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Response } from "@/fakes/responses";

type Props = {
    data: Response[];
}
export default function ResponsesTable({ data }: Props) {
    return (
      <div className="mx-auto p-3 rounded-md w-full bg-white">
        <h2 className="text-base font-bold">Responses</h2>
        <DataTable columns={columns} data={data} />
      </div>
    )
  }