"use client"
import deleteCombo from '@/app/actions/deleteCombo'
import toggleComboStatus from '@/app/actions/toggleComboStatus'
import updateCombo from '@/app/actions/updateCombo'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ComboModel = ({ combo ,setRefetchComp }) => {
    const rtr = useRouter()
    console.log(combo)
    const [isLoading,setIsLoading]=useState(false)
    const onDelete = async () => {
        try {
            
            const res = await deleteCombo(combo.id)
            if (!res.success) {
                throw res


            }
            setRefetchComp((e)=>!e);
            toast.success(res.message)
        } catch (error) {
            console.log(error)

            toast.warning(error.message)

        }
    }
    const ontoggleComboStatus = async () => {
        try {
            const res = await toggleComboStatus(combo.id)
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
    const onSubmit= async(e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.set('id',combo.id)
        try {
            setIsLoading(true)
            const res = await updateCombo(formData)
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
                        <h6 className="card-title mb-1"> Combo Name:- {combo.name}</h6>
                        <p className="card-text mb-1"><small className="text-muted">Discount  :- {combo.discountInPercent}%</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Varients Slug :- {combo.productVarients.map((vari, i) => `${vari.slug},`)}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Last UpdatedBy  :- {combo.createdBy.userName}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Quantity :- {combo.qty}</small></p>


                    </div>

                    <form onSubmit={onSubmit} style={{ margin: "27px" }}>
                        <div className="form-group" >

                            <input name='discountInPercent' type='text' className="form-control" id="val" placeholder="Discount In Percent" />

                        </div>
                        <div className="form-group" >

                            <input name='qty' type='number' className="form-control" id="dep" placeholder="Quantity(not append)" />

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


                {(combo.status === false ?
                    <button onClick={ontoggleComboStatus} type="button" style={{
                        margin: "10px",
                        background: "green",
                        border: "none",
                        borderRadius: "inherit",
                        color: "#fff",
                        fontSize: "14px",
                        padding: "8px 15px"
                    }}>Activate</button>
                    :

                    <button onClick={ontoggleComboStatus} type="button" style={{
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

export default ComboModel
