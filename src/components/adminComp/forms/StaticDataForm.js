"use client"
import updateStaticData from '@/app/actions/updateStaticData'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const StaticDataForm = ({ statD }) => {
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onsub = async (e) => {
        e.preventDefault()
        const obj = { key, value }

        try {
            setIsLoading(true)
            const res = await updateStaticData(obj)
            if (!res.success) {
                throw res
            }
            toast.success(res.message)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)

        } finally {
            setIsLoading(false)
        }
    }




    return (
        <div className="col-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">
                    <form onSubmit={onsub}>
                        <label htmlFor="key">Key</label>

                        <select required defaultValue={0} onChange={(e) => setKey(e.target.value)} className="form-select" id="key">

                            <option disabled value={0}>select a valid key</option>


                            {
                                statD.map((obj, index) => <option key={index} value={obj.key}>{obj.key}</option>)
                            }



                        </select>
                        {(key && key != '') && <> <label htmlFor="key">Value</label>
                            <textarea required type='text' className="form-control" value={value} onChange={(e) => setValue(e.target.value)} /></>}
                        {isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>}


                    </form>

                </div>
            </div>
        </div>
    )
}

export default StaticDataForm
