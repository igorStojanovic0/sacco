import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { Application } from "@/types";

type Props = {
    command: "Approve" | "Request updates to" | "Reject";
    loanDetails: Application;
};

const LoanStatusUpdateSheet = ({ command, loanDetails }: Props) => {
    return (
        <Sheet>
            <SheetTrigger>
                {command === 'Approve' && <Button type="button" variant={'default'}>Approve</Button>}
                {command === 'Request updates to' && <Button type="button" variant={'outline'}>Request update(s)</Button>}
                {command === 'Reject' && <Button type="button" variant={'destructive'}>Reject</Button>}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you sure you want to {command.toLocaleLowerCase()} this loan?</SheetTitle>
                    <SheetDescription>
                        This action confirms that you have diligently reviewed the loan details and are satisfied with the information provided. 
                        <br />
                        <br />
                        The loan will be updated and the applicant will be notified accordingly.
                    </SheetDescription>
                    <br />
                    <Button>Confirm</Button>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default LoanStatusUpdateSheet