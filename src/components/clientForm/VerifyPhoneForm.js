"use client";


import resetUserCrediential from "@/app/actions/resetUserCrediential";
import sendOtpPhone from "@/app/actions/sendOtpPhone";


import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VerifyPhoneForm = ({email ,isphoneVerified}) => {
     console.log(isphoneVerified)
    const [isLoading, setIsLoading] = useState(false);
    const [stedy, setstedy] = useState(false);
    const [counter, setCounter] = useState(30); // Set initial timer value (e.g., 30 seconds)
    const [isButtonDisabledResend, setIsButtonDisabledResend] = useState(true);
    const decodedEmail = decodeURIComponent(email);
    const rtr = useRouter()
    if (isphoneVerified) {
        rtr.push('/')
        return null
        
       }
 
    useEffect((()=>{
        const fetch = async()=>{
            try {
                const resObj =  await  sendOtpPhone(decodedEmail);
                 if (resObj.redirect) {
                    rtr.push('/')
                    return
                    
                 }
                
    
                toast.success("otp has been sent");
            } catch (error) {
                console.error(error);
                toast.warning(error.message);
            } finally {
                setIsLoading(false);
            }}
        fetch()
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
            const resObj = sendOtpPhone(decodedEmail);


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
                        <h1 className="text-center mb-3">Verify your phone</h1>
                        <div className="form-group mb-3">
                                <label htmlFor="username" className="mb-2">
                                    Otp 
                                </label>
                                <input name="otpMobile"  type="text" className="form-control" />
                            </div>
                        
                        <button type="submit" className="btn" disabled={isLoading}>
                                    {isLoading ? "Submitting..." : "Submit"}
                                </button>
                        <button style={{marginLeft:"15px"}} onClick={handleResendOTP} disabled={isButtonDisabledResend || isLoading} className="btn" >
                                    {isLoading || isButtonDisabledResend ? `${counter}` : "Resend"}
                                </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default VerifyPhoneForm;
