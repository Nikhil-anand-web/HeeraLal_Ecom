"use client";
import getShipingCharges from '@/app/actions/getShipingCharges';

import debounce from '@/lib/debounce';

import axios from 'axios';

import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const ContactInfoForm = ({ userHaveAddress, setShipingCharges, order,userPinCode }) => {

    const [isMounted, setisMounted] = useState(false);
    const [city, setCity] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [wantToUseDefault, setWantToUseDefault] = useState(false)
    

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
        debounce(async (pinCode,wantToUseDefault,userHaveAddress,userPinCode) => {
            if (pinCode ||(wantToUseDefault  && userHaveAddress) ) {
                try {
                    const response = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);
                    var shiping =null
                    if (wantToUseDefault  && userHaveAddress) {
                        shiping = await getShipingCharges(userPinCode,order.id)
                        console.log(shiping)

                        
                    }else{
                        shiping =await getShipingCharges(pinCode,order.id)

                    }
                   
                    setShipingCharges(shiping.charges)

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
                setShipingCharges(null)
                setCity([]); // Clear the city list if the pinCode is empty
            }
        }, 500),
        []
    );

    useEffect(() => {
        fetchResults(pinCode,wantToUseDefault,userHaveAddress,userPinCode);
    }, [pinCode, fetchResults,userPinCode,wantToUseDefault]);

    const onSubmit = async (e) => {

        e.wantToUseDefault = wantToUseDefault
        e.orderId = order.orderId
        e.customer = order.customerId



        try {
            setIsLoading(true)
            const response = await fetch('/api/v1/paytm/initiateTransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(e),
            });

            const data = await response.json();
            console.log(data)
            if ( !data || (!data?.success && (!data?.params?.CHECKSUMHASH || data?.params?.CHECKSUMHASH===''))) {
                throw{
                    success:false,
                    message:data

                }
                
            }


            const form = document.createElement('form');
            form.method = 'POST';
            form.action = data.url;

            for (const key in data.params) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data.params[key];
                form.appendChild(input);
            }
            console.log(form)
            document.body.appendChild(form);
            form.submit();

        } catch (error) {
            console.log(error)
            console.log('Error updating details:', error);
            toast.warning(error.message.message||"something went wrong")
        } finally {
            setIsLoading(false);
        }
    };

    if (!isMounted) {
        return null;
    }
    return (
        <div>

            {userHaveAddress && <div style={{margin:"50px"}}><input style={{width:"25px",height:"25px"}} value={wantToUseDefault} name='addressMode' onChange={(e) => setWantToUseDefault((pre) => !pre)} className="form-check-input" type="checkbox" id={"addressMode"} /> <label htmlFor='addressMode'>use profile address</label></div>}
            <form onSubmit={handleSubmit(onSubmit)}>

                {(!wantToUseDefault || !userHaveAddress) && <><div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input {...register("firstName")} type="text" className="form-control" id="firstName" placeholder="First Name" />
                    {errors.firstName && <span>This field is required</span>}
                </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input {...register("lastName")} type="text" className="form-control" id="lastName" placeholder="Last Name" />
                        {errors.lastName && <span>This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input {...register("mobile")} type="text" className="form-control" id="mobile" placeholder="Mobile" />
                        {errors.mobile && <span>This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="pinCode">Pincode</label>
                        <input {...register("pinCode")} type="text" className="form-control" id="pinCode" placeholder="Pincode" />
                        {errors.pinCode && <span>This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input {...register("address", { required: pinCode ? true : false })} type="text" className="form-control" id="address" placeholder="Address" />
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
                                    <option disabled value={0}>Select a valid city</option>
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
                        <input disabled {...register("state")} type="text" className="form-control" id="state" placeholder="State" />
                    </div></>}
                    

                <button type="submit" className="btn me-2 btn-gradient-primary" disabled={isLoading}>
                    {isLoading ? "Redirecting..." : "Procide To Payment"}
                </button>
            </form>
        </div>
    )
}

export default ContactInfoForm
