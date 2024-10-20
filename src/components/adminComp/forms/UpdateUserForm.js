"use client"
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import CheckBox from './formComponent/CheckBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import camelCaseToNormal from '@/lib/camelCaseToNormal';

const UpdateUserForm = ({ permissions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        control,

        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {


        try {
            setIsLoading(true)

            const res = await axios.post('/api/v1/updateUser', data)
            console.log(res)
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

                    <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group" >
                            <label htmlFor="identifire">Identifire</label>
                            <input {...register("identifire", { required: true })} type="text" className="form-control" id="identifire" placeholder="Identifire" />
                            {errors.identifire && <span>This field is required</span>}
                        </div>
                        <div className="form-group" >
                            <label htmlFor="fullName">Name</label>
                            <input {...register("fullName")} type="text" className="form-control" id="fullName" placeholder="Name" />
                            {errors.fullName && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input {...register("email")} type="email" className="form-control" id="email" placeholder="Email" />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="userName">User Name</label>
                            <input {...register("userName")} className="form-control" id="userName" placeholder="Email" />
                            {errors.userName && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input {...register("password")} type="password" className="form-control" id="password" placeholder="Password" />
                            {errors.password && <span>This field is required</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleSelectGender">Gender</label>
                            <Controller

                                name="gender"
                                control={control}


                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="exampleSelectGender">
                                        <option disabled value={0}>select a valid state</option>


                                        <option value="2">Female</option>
                                        <option value="1">Male</option>



                                    </select>
                                )}
                            />
                        </div>

                        {permissions.map((permis, index) => {
                            return <CheckBox errors={errors} key={index} control={control} id={permis.COLUMN_NAME ==="complementaryContentManagment"?"complementaryContentManagement":permis.COLUMN_NAME}>

                                {camelCaseToNormal(permis.COLUMN_NAME ==="complementaryContentManagment"?"complementaryContentManagement":permis.COLUMN_NAME)}
                            </CheckBox>

                        })}






                        {isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserForm
