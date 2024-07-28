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
import { MenuItem, Select, Switch } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import Cookies from "js-cookie";
import { MoreHorizontal } from "lucide-react";
import { toast } from 'sonner';
import { DataTableColumnHeader } from "./DataTableColumnHeader";

type UpdateUserStatusTypes = {
    is_active: boolean;
    userId?: string
}

interface UpdateUserRoleTypes {
    user_id?: string;
    group_id?: string;
    role_name: string;
}

const updateUserStatus = async (data: UpdateUserStatusTypes) => {

    const accessToken = Cookies.get('access-token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/updateUserStatus`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }
    toast.success("User status changed!");
}

const onUpdateUserRole = async (data: UpdateUserRoleTypes) => {
    const accessToken = Cookies.get('access-token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/updateUserRole`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }
    toast.success("User Role changed!");
}

export const adminColumns: ColumnDef<User>[] = [

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
        cell: ({ row }) => {
            const user = row.original

            return (
                <>
                    <Select
                        defaultValue={user?.role_name}
                        sx={{
                            width: 150,
                            height: 40,
                        }}
                        disabled={user?.role_name === 'SaccoManager' ? true : false}
                        onChange={(e: any) => {
                            // onUpdateUserRole({
                            //     user_id: user?.user_id,
                            //     group_id: user?.group_id,
                            //     role_name: e?.target?.value
                            // })
                        }}
                    >
                        <MenuItem value="SaccoManager" disabled>SaccoManager</MenuItem>
                        <MenuItem value="SaccoAdmin">SaccoAdmin</MenuItem>
                        <MenuItem value="SaccoUser">SaccoUser</MenuItem>
                    </Select>
                </>
            )
        }
    },
    {
        header: 'Approved',
        cell: ({ row }) => {
            const user = row.original
            console.log("user", user);
            
            return (
                <>
                    <Switch defaultChecked={Boolean(user?.approved)}
                        disabled={user?.role_name === 'SaccoManager' ? true : false} 
                        onChange={(e: any) => {
                        // updateUserStatus({
                        //     is_active: e?.target?.checked,
                        //     userId: user?.user_id as string
                        // })
                    }} />
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
