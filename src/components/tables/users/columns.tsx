import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";
import { Switch } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

export const columns: ColumnDef<User>[] = [

    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: 'Avatar',
        accessorKey: 'photograph',
        cell: info => (
            <>
                <Avatar className="overflow-visible !w-7 !h-7">

                    {/* {friend?.is_active && ( */}
                    <div className="absolute top-5 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#d4d6f3]" />
                    {/* )} */}

                    <AvatarImage
                        src={(info.getValue() === 'default' || !info.getValue()) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${info.getValue()}`}

                        className="rounded-full object-cover"
                    />
                </Avatar>
            </>
        )
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        )
    },
    {
        accessorKey: "surName",
        header: "First Name",
    },
    {
        accessorKey: "givenName",
        header: "Last Name",
    },
    {
        accessorKey: 'otherNames',
        header: 'Other Name'
    },
    {
        accessorKey: 'gender',
        header: 'Sex'
    },
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: "role_name",
        header: "Role",
    },
    {
        header: 'Status',
        cell: ({ row }) => {
            const user = row.original

            return (
                 <>
                    <Switch defaultChecked={user?.is_active} disabled/>
                 </>
            )
        }
    },
    {
        header: 'Action',
        id: "actions",
        cell: ({ row }) => {
            const application = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#9da3ff]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(application._id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View user</DropdownMenuItem>
                        <DropdownMenuItem>
                            <a href={`/account/application/${application._id}`}>View payment details</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];
