"use client";

import { createAUser } from "@/app/actions/createAUser";
import EmailTemplate from "@/components/global/EmailTemplate";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const rtr = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true


    const formData = new FormData(e.target);

    try {
      const resObj = await createAUser(formData);
      console.log(resObj);
      if (!resObj.success) {
        throw resObj;
      }
      const pass = formData.get('password')
      const email = formData.get('email')
      const res = await signIn("credentials", {
        redirect: false,
        identifire: email,
        password: pass
      })


      rtr.push('/')

      toast.success(resObj.message);
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.warning(error.message);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <section className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h1 className="text-center mb-3">Register Now</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="firstName" className="mb-2">
                  First Name<span>*</span>
                </label>
                <input name="firstName" required type="text" className="form-control" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="lastName" className="mb-2">
                  Last Name<span>*</span>
                </label>
                <input name="lastName" required type="text" className="form-control" />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email" className="mb-2">
                  Email <span>*</span>
                </label>
                <input name="email" required type="email" className="form-control" />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="mobile" className="mb-2">
                  Phone Number <span>*</span>
                </label>
                <input name="mobile" required type="text" className="form-control" />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="password" className="mb-2">
                  Password <span>*</span>
                </label>
                <input name="password" required type="password" className="form-control" />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="cnfPassword" className="mb-2">
                  Confirm Password <span>*</span>
                </label>
                <input name="cnfPassword" required type="password" className="form-control" />
              </div>

              <div className="formbutton text-center mt-4">
                <button type="submit" className="btn" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Page;
