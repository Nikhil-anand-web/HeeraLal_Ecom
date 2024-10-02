import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import VerifyPhoneForm from '@/components/clientForm/VerifyPhoneForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
    const user = await getServerSession(authOptions);

    // Check if the user's mobile number is verified
    if (user?.mobileVerified) {
        // Redirect to the homepage if the mobile is verified
        redirect('/cart');
    }
    if (!user.mobile) {
        redirect('/account/profile');
        
    }
    // Render the VerifyPhoneForm if mobile is not verified
    return (
        <>
            <VerifyPhoneForm email={user?.email} isphoneVerified={user?.mobileVerified} />
        </>
    );
}

export default Page;
