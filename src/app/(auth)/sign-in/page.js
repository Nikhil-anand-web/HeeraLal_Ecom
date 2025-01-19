"use client"
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import sendOtps from '@/app/actions/sendOtps'
import Spinner from '@/components/global/Spinner'


const page = () => {
    const router = useRouter()
    const [identifire, setIdentifire] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const fd = new FormData(e.target)
            const res = await signIn("credentials", {
                redirect: false,
                identifire: fd.get('identifire'),
                password: fd.get('password')
            })
            console.log("SignIn Response:", res);

            if (!res.ok) {
                // console.log(errors,"juihuh")
                toast.error("Wrong username or password");
            } else if (res?.ok) {
                console.log(res)
                toast.success(`welcome!`);

                

                router.back();
            }

        } catch (error) {
            console.log(error)

        } finally {
            setIsLoading(false)
        }


    }
    const onForgot = async () => {
        if (!identifire) {
            toast.warning("please enter email")
            return

        }
        router.push(`/forgot-password/${identifire}`)


    }

    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h1 className="text-center mb-3">Login</h1>
                        <form onSubmit={onSubmit} className="mb-3">
                            <div className="form-group mb-3">
                                <label htmlFor="identifire" className="mb-2">Email address <span>*</span></label>
                                <input onChange={(e) => { setIdentifire(e.target.value) }} value={identifire} name='identifire' type="text" className="form-control" />
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="username" className="mb-2">Password <span>*</span></label>
                                <input name='password' type="password" className="form-control" />
                            </div>
                            <div className="formbutton text-center mt-4">
                                <button className="btn">Submit</button>
                                <div className="container mt-5">
                                    <button onClick={async (e) => {
                                        e.preventDefault()
                                        await signIn('google')
                                        toast.success("welcome")
                                       
                                       


                                    }} style={{ backgroundColor: "#0d6efd" }} className="btn btn-outline-primary btn-block">
                                        <i className="fab fa-google mr-2"></i> Sign in with Google
                                    </button>
                                </div>
                            </div>



                        </form>
                        {isLoading && <Spinner />}

                        Not a member? <Link href="/sign-up" className="text-success">Register Now</Link> <br />

                        <Link href={`/forgot-password/${identifire}`} className="text-success">Forgot Password</Link>


                    </div>
                </div>
            </div>

        </section>
    )
}

export default page
