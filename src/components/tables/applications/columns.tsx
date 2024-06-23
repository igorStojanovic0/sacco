import { Application } from "@/types"
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "./DataTableColumnHeader";

export const columns: ColumnDef<Application>[] = [
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
        accessorKey: "loanStatus",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Loan Status" />
        )
    },
    // {
    //     accessorKey: "email",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Email" />
    //     )
    // },
    {
        accessorKey: "amountRequested",
        header: () => <div className="text-right">Amount Requested</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amountRequested"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "RWF",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "monthlySalary",
        header: () => <div className="text-right">Monthly Salary</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("monthlySalary"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "RWF",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "amountToPayPerMonth",
        header: () => <div className="text-right">Payment per month</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amountToPayPerMonth"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "RWF",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "repaymentReriod",
        header: "Repayment Period (months)",
    },
    {
        accessorKey: "bankAccountNumber",
        header: "Bank Account Number",
    },
    {
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
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(application._id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View teacher</DropdownMenuItem>
                        <DropdownMenuItem>
                            <a href={`/account/application/${application._id}`}>View payment details</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];
