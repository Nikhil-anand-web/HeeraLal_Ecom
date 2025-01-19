"use client"
import submitQueryForm from '@/app/actions/submitQueryForm'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const GetInTouchForm =  () => {
    const [isLoading, setIsLoading] =useState(false)
    const [name ,setName] = useState('')
    const [message , setMessage] = useState('')
    const [email,setEmail] =useState('')
    const [mobile,setMobile] =useState('')
    const [fullAddress,setFullAddress] =useState('')
    const clk = async(e)=>{
        e.preventDefault()
       const obj = {
        name,email,message,mobile,fullAddress
       }

        try {
            setIsLoading(true)


            const res =  await submitQueryForm(obj)
            if (!res.success) {
                throw res
            }
            toast.success(res.message)
            
        } catch (error) {
            console.log(error)
            toast.warning(error.message)
            
        }finally{
            setIsLoading(false)
        }
    }

    
    return (
        <div>
            <form onSubmit={clk}>
                <div className="form-group">
                    <input value ={name} onChange={(e)=> setName(e.target.value)} type="text" className="form-control" placeholder="Name" />
                </div>
                <div className="form-group">
                    <input value = {email} onChange={(e)=> setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" />
                </div> 
                <div className="form-group">
                    <input value = {mobile} onChange={(e)=> setMobile(e.target.value)} type="text" className="form-control" placeholder="mobile" />
                </div> 

                <div className="form-group">
                    <textarea value={message} onChange={(e)=> setMessage(e.target.value)} className="form-control" placeholder="Message"></textarea>
                </div>
                <div className="form-group">
                    <textarea value={fullAddress} onChange={(e)=> setFullAddress(e.target.value)} className="form-control" placeholder="fullAddress"></textarea>
                </div>
                <div className="formbuttton">
                    <button disabled={isLoading} type="submit" className="btn">{isLoading?"Processing":"Submit"}</button>
                </div>


            </form>

        </div>
    )
}

export default GetInTouchForm
