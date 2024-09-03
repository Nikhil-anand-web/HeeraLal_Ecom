"use client";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  const session= useSession();

console.log(session)
 
  return (
    <div>
      {session&&session?.data?.status===0?<>
      <h1>Your Account is Deactivated! Contact The Admin </h1>
      <button onClick={() => signOut()}>
        Sign-Out
      </button>
      </>:<div>
        your account is activated
        <Link href={'/wah-control-center'}> home</Link>
        </div>}
      
    </div>
   
  );
};

export default Page;
