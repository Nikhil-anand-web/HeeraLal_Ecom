"use client"
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import CheckBox from './formComponent/CheckBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import camelCaseToNormal from '@/lib/camelCaseToNormal';

const AddUserForm = ({ permissions }) => {

    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        control,

        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        try {
            setIsLoading(true)

            const res = await axios.post('/api/v1/createUser', data)

            if (res.data.success) {
                toast.success(res.data.message)

            }




        } catch (error) {
            console.log(error)

            toast.warning(error.response.data.message)

        } finally {
            setIsLoading(false)
        }




    }



    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Basic form elements</h4>
                    <p className="card-description"> Basic form elements </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group" >
                            <label htmlFor="exampleInputName1">Name</label>
                            <input {...register("fullName", { required: true })} type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                            {errors.fullName && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail3">Email address</label>
                            <input {...register("email", { required: true })} type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail3">User Name</label>
                            <input {...register("userName", { required: true })} className="form-control" id="exampleInputEmail3" placeholder="Email" />
                            {errors.userName && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword4">Password</label>
                            <input {...register("password", { required: true })} type="password" className="form-control" id="exampleInputPassword4" placeholder="Password" />
                            {errors.password && <span>This field is required</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleSelectGender">Gender</label>
                            <Controller

                                name="gender"
                                control={control}
                                rules={{ required: 'Category is required' }}

                                render={({ field }) => (
                                    <select defaultValue={1} className="form-select" {...field} id="exampleSelectGender">


                                        <option value="2">Female</option>
                                        <option value="1">Male</option>



                                    </select>
                                )}
                            />
                        </div>

                        {permissions.map((permis, index) => {
                           return <CheckBox errors={errors} key={index} control={control} id={permis.COLUMN_NAME}>
                            
                                {camelCaseToNormal(permis.COLUMN_NAME)}
                            </CheckBox>

                        })}








                        {isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>}

                    </form>
                </div>
            </div>
        </div>

    )
}

export default AddUserForm
