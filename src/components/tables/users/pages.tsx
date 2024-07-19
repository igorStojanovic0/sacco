import { User } from "@/types";
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from "./data-table";

type Props = {
    data: User[];
    columns: ColumnDef<User>[];
}
export default function UsersTable({ columns, data }: Props) {
    return (
      <div className="mx-auto py-10 w-full">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }