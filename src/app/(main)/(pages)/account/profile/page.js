"use client";
import updateUserDetails from '@/app/actions/updateUserDetails';
import debounce from '@/lib/debounce';
import objectToFormData from '@/lib/objectToFormData';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Page = () => {
    const [isMounted, setisMounted] = useState(false);
    const [city, setCity] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const ses =  useSession()
    const rtr = useRouter()
    console.log( ses.data)
    if (ses.data) {
        
        var {firstName,lastName,pinCode:prepin,mobile,address,city:preCity,state} = ses.data
    }
    useEffect(() => {
        setisMounted(true);
    }, []);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const pinCode = watch('pinCode');
    
    const fetchResults = useCallback(
        debounce(async (pinCode) => {
            if (pinCode) {
                try {
                    const response = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);

                    if (response.data[0].PostOffice) {
                        setValue("state", response.data[0].PostOffice[0].State);
                        const cityList = response.data[0].PostOffice.map((po) => po.Block);
                        const uniqueCities = [...new Set(cityList)];
                        setCity([...uniqueCities]);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                setCity([]); // Clear the city list if the pinCode is empty
            }
        }, 500),
        []
    );

    useEffect(() => {
        fetchResults(pinCode);
    }, [pinCode, fetchResults]);

    const onSubmit = async (data) => {
        const formData = objectToFormData(data);
       

        try {
            setIsLoading(true);
            const res = await updateUserDetails(formData);
            if (!res.success) {
                throw res
                
            }else{
                if (res.redirect) {
                    rtr.push(res.redirect)
                }
                toast.success(res.message)
            }

        } catch (error) {
            console.log('Error updating details:', error);
            toast.warning(error.message)
        } finally {
            setIsLoading(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="col-md-9 ps-5 border-start">
            <div className="dashboard-status">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Enter the value you want to update</h5>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input {...register("firstName")} type="text" className="form-control" id="firstName" defaultValue={firstName?firstName:"please enter a value"}  />
                                {errors.firstName && <span>This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input {...register("lastName")} type="text" className="form-control" id="lastName"  defaultValue={lastName?lastName:"please enter lastname"} />
                                {errors.lastName && <span>This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile Number</label>
                                <input {...register("mobile")} type="text" className="form-control" id="mobile" defaultValue={mobile?mobile:"please enter mobile number"} />
                                {errors.mobile && <span>This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="pinCode">Pincode</label>
                                <input {...register("pinCode")} type="text" className="form-control" id="pinCode" defaultValue={prepin?prepin:""} />
                                {errors.pinCode && <span>This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input {...register("address", { required: pinCode ? true : false })} type="text" className="form-control" id="address" placeholder={prepin?prepin:"please enter address"}/>
                                {errors.address && <span>This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="identifireSlug">City</label>
                                <Controller
                                    name="city"
                                    control={control}
                                    rules={{ required: pinCode ? 'City is required' : false }}
                                    render={({ field }) => (
                                        <select defaultValue={0} {...field} className="form-select" id="identifireSlug">
                                            <option disabled value={0}>Select a valid city{preCity===null?"":` -current${preCity}`}</option>
                                            {city.map((cat, index) => (
                                                <option key={index} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.city && <span>{errors.city.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input disabled {...register("state")} type="text" className="form-control" id="state" placeholder={state?state:"please enter pincode"} />
                            </div>

                            <button type="submit" className="btn me-2 btn-gradient-primary" disabled={isLoading}>
                                {isLoading ? "Submitting" : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
