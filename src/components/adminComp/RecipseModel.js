"use client"

import deleteRecipe from '@/app/actions/deleteRecipe'
import toggleRecipeStatus from '@/app/actions/toggleRecipeStatus'
import updateRecipe from '@/app/actions/updateRecipe'
import Link from 'next/link'

import React, { useState } from 'react'
import { toast } from 'react-toastify'

const RecipseModel = ({ recipe ,setRefetchComp}) => {
    
   
    const [isLoading,setIsLoading]=useState(false)
    const onDelete = async () => {
        try {
            
            
            const res = await deleteRecipe(recipe.id)
            if (!res.success) {
                throw res


            }
            toast.success(res.message)
            setRefetchComp((e)=>!e)
        } catch (error) {
            console.log(error)

            toast.warning(error.message)

        }
    }
    const ontogglerecipeStatus = async () => {
        try {
            const res = await toggleRecipeStatus(recipe.id)
            if (!res.success) {
                throw res

            }
            setRefetchComp((e)=>!e)
            toast.success(res.message)

        } catch (error) {
            console.log(error)

            toast.warning(error.message)

        }

    }
    const onSubmit= async(e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.set('id',recipe.id)
        try {
            setIsLoading(true)
            const res = await updateRecipe(formData)
            if (!res.success) {
                throw res
            }
            setRefetchComp((e)=>!e)
            toast.success(res.message)

        } catch (error) {
            console.log(error)

            toast.warning(error.message)

        }finally{
            setIsLoading(false)
        }

    }

    return (
        <div className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
            <div className="row g-0">



                <div style={{ display: "flex" }}>

                    <div className="card-body py-2 px-3">
                        <h6 className="card-title mb-1"> recipe Name:- {recipe.name}</h6>
                        
                        <h6 className="card-title mb-1"> createdBy:- {recipe.createdBy.userName}</h6>
                        <p className="card-text mb-1">video Link:-<a href={recipe.videoLink} target="_blank" rel="noopener noreferrer">{recipe.videoLink}</a></p>
                   


                    </div>

                    <form onSubmit={onSubmit} style={{ margin: "27px" }}>
                        <div className="form-group" >

                            <input name='videoLink' type='text' className="form-control" id="videoLink" placeholder="videoLink" />

                        </div>
                        <div className="form-group" >

                            <input name='name' type='name' className="form-control" id="name" placeholder="name" />

                        </div>

                        {isLoading ? (
                            <button type="button" className="btn me-2 btn-gradient-primary" disabled>
                                Submitting...
                            </button>
                        ) : (
                            <button type="submit" className="btn me-2 btn-gradient-primary">
                                Submit
                            </button>
                        )}

                    </form>

                </div>


                <button onClick={onDelete} type="button" style={{
                    margin: "10px",
                    background: "red",
                    border: "none",
                    borderRadius: "inherit",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "8px 15px"
                }}>Delete</button>


                {(recipe.status === false ?
                    <button onClick={ontogglerecipeStatus} type="button" style={{
                        margin: "10px",
                        background: "green",
                        border: "none",
                        borderRadius: "inherit",
                        color: "#fff",
                        fontSize: "14px",
                        padding: "8px 15px"
                    }}>Activate</button>
                    :

                    <button onClick={ontogglerecipeStatus} type="button" style={{
                        margin: "10px",
                        background: "yellow",
                        border: "none",
                        borderRadius: "inherit",
                        color: "black",
                        fontSize: "14px",
                        padding: "8px 15px"
                    }}>Deactivate</button>)

                }


            </div>








        </div>
    )
}

export default RecipseModel
