"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../../../../images/logo1.png'
import { signIn } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Spinner from '@/components/global/Spinner'

const Page = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const onSubmit = async (data) => {
    console.log(data.identifire)
    try {
      setIsLoading(true)
      const res = await signIn("credentials", {
        redirect: false,
        identifire: data.identifire,
        password: data.password,

      });
      console.log("SignIn Response:", res);

      if (res?.error) {
        console.log(errors)
        toast.error("Wrong username or password");
      } else if (res?.status) {
        console.log(res)
        toast.success(`welcome! `);



        router.replace("/wah-control-center");

      }

    } catch (error) {
      console.log(error)


    } finally {
      setIsLoading(false)
    }



  }
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div style={{ borderRadius: "21px" }} className="auth-form-light text-left p-5">
                <div className="brand-logo" style={{ display: "flex", justifyContent: "center" }}>
                  <Image width={150} src={logo} alt="logo" />
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
                  <div className="form-group">
                    <input style={{ borderRadius: "21px" }} placeholder='email/username' {...register("identifire", { required: true })} className="form-control form-control-lg" id="exampleInputEmail1" />
                    {errors.identifire && <span>This field is required</span>}
                  </div>
                  <div className="form-group">
                    <input style={{ borderRadius: "21px" }} placeholder='.........................' type="password" className="form-control form-control-lg" id="exampleInputPassword1" {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                  </div>
                  <button style={{ borderRadius: "18px" }} type='submit' className="mt-3 d-grid border-none btn btn-block  exampleRequiredbtn-lg font-weight-medium  py-24 ">
                    SIGN-IN
                  </button>





                </form>
                {isLoading && <Spinner />}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Page
