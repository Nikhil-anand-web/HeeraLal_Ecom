"use client"
import updateStaticData from '@/app/actions/updateStaticData'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import RichTextEditor from '../RichTextEditor'
import getEditorNeedKeysStaticData from '@/lib/getEditorNeedKeysStaticData'

const StaticDataForm = ({ statD }) => {
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [editorValue, setEditorValue] = useState('');
    const onsub = async (e) => {
        e.preventDefault()
        const obj = { key, value }
        if (!value || value ==='') {
            toast.warning("value needed")
            return
            
        }

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
    const handleEditorChange = (content) => {
        setEditorValue(content);
        setValue(content); // Manually set the value for description
    };





    return (
        <div className="col-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">
                    <form onSubmit={onsub}>
                        <label htmlFor="key">Key</label>

                        <select required defaultValue={0} onChange={(e) => {
                            setValue('')
                            setEditorValue('')
                            setKey(e.target.value)}} className="form-select" id="key">

                            <option disabled value={0}>select a valid key</option>


                            {
                                statD.map((obj, index) => <option key={index} value={obj.key}>{obj.key}</option>)
                            }



                        </select>
                        {(key && key != '') && <> <label htmlFor="key">Value</label>
                           { !getEditorNeedKeysStaticData().includes(key)?<textarea required type='text' className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />:
                            <RichTextEditor value={editorValue} onChange={handleEditorChange} />}
                                
                                
                                </>}
                        {isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>}


                    </form>

                </div>
            </div>
        </div>
    )
}

export default StaticDataForm
