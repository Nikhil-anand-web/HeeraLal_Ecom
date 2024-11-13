"use client"
import changeUserPassword from '@/app/actions/changeUserPassword';
import React, { useState } from 'react'
import { toast } from 'react-toastify';


const page = () => {
    const [isLoading,setIsLoading] = useState()
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 


        const formData = new FormData(e.target);

        try {
            const resObj = await changeUserPassword(formData);
            console.log(resObj);
            if (!resObj.success) {
                throw resObj;
            }
            

            toast.success(resObj.message);
        } catch (error) {
            console.error(error);
            toast.warning(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div class="col-md-9 ps-5 border-start">


            <div class="dashboard-status">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <h5>Change Password </h5>
                        </div>
                        <div class="row">



                            <form onSubmit={onSubmit}>


                                <div class="form-group mb-2">
                                    <label for="username" class="mb-2">Current Password <span>*</span></label>
                                    <input name='password' type="password" class="form-control" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="username" class="mb-2">New Password <span>*</span></label>
                                    <input name='newPassword' type="password" class="form-control" />
                                </div>

                                <div class="form-group mb-2">
                                    <label for="username" class="mb-2">Comfirm Password <span>*</span></label>
                                    <input name='newPasswordCnf' type="password" class="form-control" />
                                </div>

                                <div class="formbutton text-center mt-4">
                                    <button class="btn">Update</button>
                                </div>

                            </form>
                        </div>






                    </div>


                </div>
            </div>




        </div>
    )
}

export default page
