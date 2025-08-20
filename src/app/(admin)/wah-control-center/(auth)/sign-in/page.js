"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import logo from '../../../../../images/logo1.png'
import { signIn } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Spinner from '@/components/global/Spinner'
import senOtp2fa from '@/app/actions/senOtp2fa'

const Page = () => {
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false); // New state for disabling the button
  const [otpButtonTimer, setOtpButtonTimer] = useState(60); // New state to track timer (60 seconds)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()
  const router = useRouter()
  useEffect(() => {
    let timer;
    if (isOtpButtonDisabled) {
      timer = setInterval(() => {
        setOtpButtonTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsOtpButtonDisabled(false);
            setOtpButtonTimer(60); 
          }
          return prev - 1;
        });
      }, 1000); // Decrement timer every second
    }
    return () => clearInterval(timer); 
  }, [isOtpButtonDisabled]);

  const onSubmit = async (data, event) => {
    event.preventDefault()

    try {
      setIsLoading(true)
      const res = await signIn("credentials", {
        redirect: false,
        identifire: data.identifire,
        password: data.password,
        otp: data.otp,
      });
      console.log("SignIn Response:", res);

      if (res?.error) {
        toast.error(res.error);
      } else if (res?.status) {
        toast.success(`welcome!`);
        router.replace("/wah-control-center");
      }

    } catch (error) {
      console.log(error)

    } finally {
      setIsLoading(false)
    }
  }

  const sendOtp = async () => {
    const identifire = getValues("identifire");
    try {
      setIsLoading(true)
      const res = await senOtp2fa(identifire);
      if (!res.success) {
        throw res;
      }
      setIsOtpSent(true);
      toast.success(res.message);

      // Disable the OTP button for 60 seconds
      setIsOtpButtonDisabled(true);
    } catch (error) {
      toast.warning(error.message)
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
                  {isOtpSent && <div className="form-group">
                    <input style={{ borderRadius: "21px" }} placeholder='password' type="password" className="form-control form-control-lg" id="exampleInputPassword1" {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                  </div>}

                  {isOtpSent &&
                    <div className="form-group">
                      <input style={{ borderRadius: "21px" }} placeholder='otp' type="text" className="form-control form-control-lg" id="otp" {...register("otp", { required: false })} />
                      {errors.otp && <span>This field is required</span>}
                    </div>}
                  {isOtpSent && <button style={{ borderRadius: "18px" }} type='submit' className="mt-3 d-grid border-none btn btn-block  exampleRequiredbtn-lg font-weight-medium  py-24 ">
                    SIGN-IN
                  </button>}

                </form>

                {/* Disable the OTP button if it's been sent and the timer is active */}
                <button
                  onClick={sendOtp}
                  disabled={isOtpButtonDisabled}
                  style={{ borderRadius: "18px" }}
                  className="mt-3 d-grid border-none btn btn-block  exampleRequiredbtn-lg font-weight-medium  py-24 "
                >
                  {isOtpButtonDisabled ? `Resend OTP in ${otpButtonTimer}s` : !isOtpSent?"Send OTP":"Resend OTP"}
                </button>

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
