"use client"
import { useGetSaccoUserList } from '@/api/sacco';
import { adminColumns } from '@/components/sacco/component/users/admin_columns';
import { columns } from '@/components/sacco/component/users/columns';
import UsersTable from '@/components/sacco/component/users/pages';
import { useMyContext } from '@/context/MyContext';
import { useParams } from 'next/navigation';
import { useEffect } from "react";
const ApprovePage = () => {
    
    const { memberList, setMemberList, setMsgInputState, loggedUser } = useMyContext()
    const params = useParams()
    const { saccoUserList } = useGetSaccoUserList(params?.saccoId as string)
    
    useEffect(() => {
        setMemberList(saccoUserList)
    },[saccoUserList])

    useEffect(() => {
        setMsgInputState(false)
    },[])
    
    return (
        <>
        
        <UsersTable columns={loggedUser?.role_name !== 'SaccoUser' ? adminColumns : columns} data={memberList} />
        </>
    )
}

export default ApprovePage