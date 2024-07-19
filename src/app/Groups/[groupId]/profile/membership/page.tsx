"use client"
import { useGetGroupUserList } from '@/api/auth';
import { adminColumns } from '@/components/tables/users/admin_columns';
import { columns } from '@/components/tables/users/columns';
import UsersTable from '@/components/tables/users/pages';
import { useMyContext } from '@/context/MyContext';
import { useParams } from 'next/navigation';
import { useEffect } from "react";
const MemberShipPage = () => {
    
    const { memberList, setMemberList, setMsgInputState, loggedUser } = useMyContext()
    const params = useParams()
    const { groupUserList } = useGetGroupUserList(params?.groupId as string)
    
    useEffect(() => {
        setMemberList(groupUserList)
    },[groupUserList])

    useEffect(() => {
        setMsgInputState(false)
    },[])
    
    return (
        <>
        
        <UsersTable columns={loggedUser?.role_name !== 'GroupUser' ? adminColumns : columns} data={memberList} />
        </>
    )
}

export default MemberShipPage