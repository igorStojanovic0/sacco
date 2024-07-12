"use client"
import { useGetProfileData, useUpdateUserAccount } from "@/api/auth";
import UserProfileForm from "@/components/forms/UserProfileForm";
// import { Store } from "@/context/user";
// import { useContext } from "react";

const Profile = () => {
  // const userContext = useContext(Store);
  const { updateAccount, isLoading } = useUpdateUserAccount();
  const { currentUser } = useGetProfileData();
  
  if (currentUser) {
    return (
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 p-5 md:p-0">
          <h2 className='text-2xl font-bold'>Profile</h2>
          <UserProfileForm 
            currentUser={currentUser}
            onSave={updateAccount}
            isLoading={isLoading}
          />
        </div>
      </section>
    )
  }
}

export default Profile