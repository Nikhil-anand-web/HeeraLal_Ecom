"use client"
import applyRefral from '@/app/actions/applyRefral';
import Spinner from '@/components/global/Spinner';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';


const page =  ({params}) => {
    const refringId = params.referingUserId;
    const rtr = useRouter()

    console.log(params)
    
    useEffect(()=>{
        const apply = async()=>{
            try {
                const res =  await applyRefral(refringId)
                if (!res.success) {
                    throw res
                    
                }
                rtr.replace('/')
                toast.success(res.message)

            
                
                
            } catch (error) {
                console.log(error)
                rtr.replace('/')
                toast.warning(error.message)
                
            }

        }
        apply()
    })
    return (
       <Spinner/>
    )
}

export default page
