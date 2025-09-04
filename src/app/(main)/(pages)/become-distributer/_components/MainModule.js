"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import createDealershipEnquery from "@/app/actions/createDealershipEnquery";

const DealerApplicationForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  if (!isMounted) return null;

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      setIsLoading(true);
      const res = await createDealershipEnquery(data)

      if (!res.success) {
        throw res
        
       
      }
      toast.success(res.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-body text-start">
          <h3 className="card-title  mb-4 text-center">
            Dealership Application Form
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
            {/* Desired Area */}
            <h5 className="mt-3 mb-2 text-secondary fw-bold">
              Desired Area For Dealership
            </h5>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                {...register("state", { required: true })}
                type="text"
                className="form-control"
                placeholder="Enter State"
              />
              {errors.state && <small className="text-danger">Required</small>}
            </div>
            <div className="col-md-4">
              <label className="form-label">District</label>
              <input
                {...register("district", { required: true })}
                type="text"
                className="form-control"
                placeholder="Enter District"
              />
              {errors.district && (
                <small className="text-danger">Required</small>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Local Area</label>
              <input
                {...register("localArea", { required: true })}
                type="text"
                className="form-control"
                placeholder="Enter Local Area"
              />
              {errors.localArea && (
                <small className="text-danger">Required</small>
              )}
            </div>

            {/* Personal Information */}
            <h5 className="mt-4 mb-2 text-secondary fw-bold">
              Personal Information
            </h5>
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                {...register("firstName", { required: true })}
                type="text"
                className="form-control"
                placeholder="First Name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                {...register("lastName", { required: true })}
                type="text"
                className="form-control"
                placeholder="Last Name"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Age</label>
              <input
                {...register("age", { required: true })}
                type="number"
                className="form-control"
                placeholder="Age"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Qualification</label>
              <input
                {...register("qualification")}
                type="text"
                className="form-control"
                placeholder="Qualification"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Mobile No</label>
              <input
                {...register("mobile", { required: true })}
                type="text"
                className="form-control"
                placeholder="Mobile Number"
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>

            {/* Professional Information */}
            <h5 className="mt-4 mb-2 text-secondary fw-bold">
              Professional Information
            </h5>
            <div className="col-md-6">
              <label className="form-label">Name of the Firm</label>
              <input
                {...register("firmName")}
                type="text"
                className="form-control"
                placeholder="Firm Name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Full Address of the Firm</label>
              <input
                {...register("firmAddress")}
                type="text"
                className="form-control"
                placeholder="Full Address"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                {...register("city")}
                type="text"
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Pincode</label>
              <input
                {...register("pincode")}
                type="text"
                className="form-control"
                placeholder="Pincode"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Telephone No</label>
              <input
                {...register("telephone")}
                type="text"
                className="form-control"
                placeholder="Telephone Number"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business Type</label>
              <input
                {...register("businessType")}
                type="text"
                className="form-control"
                placeholder="Trading, Manufacturing, etc."
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Annual Sales</label>
              <input
                {...register("annualSales")}
                type="text"
                className="form-control"
                placeholder="Annual Sales"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Capacity to Invest</label>
              <input
                {...register("investment")}
                type="text"
                className="form-control"
                placeholder="50,000 - 200,000"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Existing Manpower/Salesman</label>
              <select {...register("hasManpower")} className="form-select">
                <option value="">Select</option>
                <option value= {true} >Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">
                Why interested in becoming a Dealer?
              </label>
              <textarea
                {...register("reason")}
                className="form-control"
                placeholder="Write here..."
                rows="3"
              />
            </div>

            {/* Submit */}
            <div className="col-12 text-center mt-4">
              {isLoading ? (
                <button className="btn btn-secondary" disabled>
                  Submitting...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 fw-bold"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DealerApplicationForm;
