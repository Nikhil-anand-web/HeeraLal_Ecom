"use client";

import { createAUser } from "@/app/actions/createAUser";
import resetUserCrediential from "@/app/actions/resetUserCrediential";
import sendOtps from "@/app/actions/sendOtps";
import EmailTemplate from "@/components/global/EmailTemplate";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [stedy, setstedy] = useState(false);
    const [counter, setCounter] = useState(30); // Set initial timer value (e.g., 30 seconds)
    const [isButtonDisabledResend, setIsButtonDisabledResend] = useState(true);
    const decodedEmail = decodeURIComponent(props.params.email);
    const rtr = useRouter()
 
    useEffect((()=>{
        
            try {
                const resObj =   sendOtps(decodedEmail);
                 console.log("k")
                
    
                toast.success("otp has been sent");
            } catch (error) {
                console.error(error);
                toast.warning(error.message);
            } finally {
                setIsLoading(false);
            }
        
    }),[stedy])

  
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true


        const formData = new FormData(e.target);

        try {
            const resObj = await resetUserCrediential(formData,decodedEmail);
            console.log(resObj);
            if (!resObj.success) {
                throw resObj;
            }
            rtr.push('/sign-in')

            toast.success(resObj.message);
        } catch (error) {
            console.error(error);
            toast.warning(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer); // Clear timeout on unmount or re-render
        } else {
            setIsButtonDisabledResend(false); // Enable button when timer reaches 0
        }
    }, [counter]);

    const handleResendOTP = async () => {
        // Logic to resend OTP goes here
        if (counter > 0) {
            return;

        }
        try {
            const resObj = sendOtps(decodedEmail);


            toast.success("otp has been sent");
        } catch (error) {
            console.error(error);
            toast.warning(error.message);
        } finally {
            setIsLoading(false);
        }

        // Reset the timer and disable the button again
        setCounter(30);
        setIsButtonDisabledResend(true);
    };


    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h1 className="text-center mb-3">Reset</h1>
                        <form onSubmit={onSubmit} >
                            <h3>Otp has been sent to your phone number and email address</h3>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="mb-2">
                                    Otp email
                                </label>
                                <input name="otpEmail"  type="text" className="form-control" />
                            </div>
                            <p>OR</p>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="mb-2">
                                    Otp Phone
                                </label>
                                <input name="otpMobile"  type="text" className="form-control" />
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="username" className="mb-2">
                                    New Password <span>*</span>
                                </label>
                                <input name="newPassword" required type="text" className="form-control" />
                            </div>
                            <p>The corresponding contact will be verified</p>



                            <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }} className="formbutton text-center  mt-4">
                                <button type="submit" className="btn" disabled={isLoading}>
                                    {isLoading ? "Submitting..." : "Submit"}
                                </button>
                                
                            </div>

                        </form>
                        <button style={{position:"relative",top:"-30px"}} onClick={handleResendOTP} disabled={isButtonDisabledResend || isLoading} className="btn" >
                                    {isLoading || isButtonDisabledResend ? `${counter}` : "Resend"}
                                </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Page;
